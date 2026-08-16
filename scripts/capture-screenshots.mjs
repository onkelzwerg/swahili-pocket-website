// Echte App-Screenshots für die Website aufnehmen.
//
// Startet ein headless Chrome, spielt den Demo-Lernstand aus demo-state.mjs in
// die IndexedDB der laufenden App, fährt die Screens ab und schreibt sie nach
// src/assets/screenshots/. Kein npm-Paket nötig: das Chrome DevTools Protocol
// läuft über die WebSocket-Implementierung von Node 22.
//
//   npm run screenshots                    # App muss auf :8080 laufen
//   APP_URL=http://localhost:8081 npm run screenshots
//   npm run screenshots -- home dialog     # nur einzelne Shots
//
// Der Dev-Server der App wird NICHT gestartet — im App-Repo `npm run dev`.

import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMO_STATE_SCRIPT, settingsScript } from "./demo-state.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "src/assets/screenshots");
const PROFILE_DIR = resolve(ROOT, ".cache/screenshot-profile");
const APP_URL = process.env.APP_URL ?? "http://localhost:8080";
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- CDP-Minimalclient -----------------------------------------------------

class Cdp {
  #ws;
  #id = 0;
  #pending = new Map();

  static async attach(wsUrl) {
    const cdp = new Cdp();
    cdp.#ws = new WebSocket(wsUrl);
    cdp.#ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      const entry = cdp.#pending.get(msg.id);
      if (!entry) return;
      cdp.#pending.delete(msg.id);
      msg.error ? entry.reject(new Error(msg.error.message)) : entry.resolve(msg.result);
    });
    await new Promise((res, rej) => {
      cdp.#ws.addEventListener("open", res, { once: true });
      cdp.#ws.addEventListener("error", () => rej(new Error("CDP-Verbindung fehlgeschlagen")), {
        once: true,
      });
    });
    return cdp;
  }

  send(method, params = {}) {
    const id = ++this.#id;
    this.#ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject }));
  }

  /** JS in der Seite auswerten; wirft, wenn die Seite einen Fehler wirft. */
  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description ?? "Fehler in der Seite");
    }
    return res.result.value;
  }

  close() {
    this.#ws.close();
  }
}

// --- Hilfen in der Seite ---------------------------------------------------

/** Ersten Button/Link mit passendem Text klicken. */
const clickText = (text, tag = "button") =>
  `(() => { const el = [...document.querySelectorAll(${JSON.stringify(tag)})]
     .find(e => e.textContent.trim().includes(${JSON.stringify(text)}));
   if (!el) return false; el.click(); return true; })()`;

// innerText liefert CSS-transformierten Text — Eyebrows stehen dort in
// Großbuchstaben. Deshalb wird ohne Rücksicht auf Groß-/Kleinschreibung gesucht.
const hasText = (text) =>
  `document.body.innerText.toLowerCase().includes(${JSON.stringify(text.toLowerCase())})`;

/** Auf eine Bedingung in der Seite warten. */
async function waitFor(cdp, expression, { timeout = 8000, label = expression } = {}) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await cdp.eval(expression)) return true;
    await sleep(150);
  }
  throw new Error(`Timeout beim Warten auf: ${label}`);
}

async function goto(cdp, path, { wait = 900 } = {}) {
  await cdp.send("Page.navigate", { url: APP_URL + path });
  await cdp.send("Page.reload", { ignoreCache: false }).catch(() => {});
  await sleep(wait);
}

async function shot(cdp, name) {
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  await writeFile(resolve(OUT_DIR, `${name}.png`), Buffer.from(data, "base64"));
  console.log(`  ✓ ${name}.png`);
}

// --- Die Aufnahmen ---------------------------------------------------------

const SHOTS = [
  {
    name: "home",
    async run(cdp) {
      await goto(cdp, "/");
      await waitFor(cdp, hasText("Wochenziel") + " || " + hasText("WOCHENZIEL"));
      await sleep(600); // Zahlen-Animation
    },
  },
  {
    name: "karte",
    async run(cdp) {
      await cdp.eval(settingsScript({ typed: false, audio: false, cloze: false }));
      await goto(cdp, "/review");
      await waitFor(cdp, hasText("Antippen zum Umdrehen") + " || " + hasText("Umdrehen"));
      await sleep(400);
    },
  },
  {
    name: "antwortstufen",
    async run(cdp) {
      await cdp.eval(settingsScript({ typed: false, audio: false, cloze: false }));
      await goto(cdp, "/review");
      await waitFor(cdp, hasText("Umdrehen"));
      await cdp.eval(`document.querySelector('.flip-card, [class*="flip"]')?.click()
        || [...document.querySelectorAll('div')].find(d => d.textContent.includes('Antippen zum Umdrehen'))?.click()`);
      await waitFor(cdp, hasText("Nochmal") + " && " + hasText("Einfach"), {
        label: "Antwortstufen",
      });
      await sleep(500);
    },
  },
  {
    name: "tippen",
    async run(cdp) {
      await cdp.eval(settingsScript({ typed: true, audio: false, cloze: false }));
      // Der Modus wird pro Karte gewürfelt — notfalls neu laden, bis Tippen dran ist.
      for (let i = 0; i < 12; i++) {
        await goto(cdp, "/review", { wait: 700 });
        if (await cdp.eval(`!!document.querySelector('input[type="text"], form input')`)) break;
      }
      // Die richtige Antwort mit zwei vertauschten Buchstaben tippen — das zeigt
      // die Tippfehler-Toleranz statt eines schlichten Fehlers.
      const typed = await cdp.eval(`(async () => {
        const prompt = (document.querySelector('h2')?.textContent || '').trim();
        const pool = await fetch('/vocab-pool.json').then(r => r.json());
        const hit = pool.find(p => p.german.trim() === prompt);
        const word = hit ? hit.swahili : prompt;
        const i = Math.max(1, Math.floor(word.length / 2));
        const typo = word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2);
        const input = document.querySelector('form input');
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
          .set.call(input, typo);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return { word, typo };
      })()`);
      console.log(`    ${typed.word} als „${typed.typo}" getippt`);
      await cdp.eval(clickText("Prüfen"));
      await waitFor(cdp, hasText("Fast"), { label: "Tippfehler-Rückmeldung", timeout: 4000 });
      await sleep(500);
    },
  },
  {
    name: "geschichten",
    async run(cdp) {
      await goto(cdp, "/stories");
      await waitFor(cdp, hasText("Freischaltung"), { label: "gesperrte Geschichte" });
      // So weit scrollen, dass über der gesperrten Geschichte noch eine offene
      // steht — der Kontrast ist die Aussage des Bildes.
      await cdp.eval(`(() => {
        const el = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.includes('bis zur Freischaltung'));
        if (!el) return false;
        const card = el.closest('div[class*="rounded"]') ?? el;
        window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 300, behavior: 'instant' });
        return true; })()`);
      await sleep(500);
    },
  },
  {
    name: "geschichte",
    async run(cdp) {
      await goto(cdp, "/stories/markt-1-01");
      await waitFor(cdp, hasText("Tippe ein Wort an"));
      await sleep(300);
    },
  },
  {
    name: "bibliothek",
    async run(cdp) {
      await goto(cdp, "/library");
      await waitFor(cdp, hasText("Themenpakete"));
      await sleep(300);
    },
  },
  {
    name: "dialog-lesen",
    async run(cdp) {
      await goto(cdp, "/dialogues/market");
      await waitFor(cdp, hasText("Mitspielen"));
      await sleep(300);
    },
  },
  {
    name: "dialog",
    async run(cdp) {
      await goto(cdp, "/dialogues/market");
      await waitFor(cdp, hasText("Mitspielen"));
      await cdp.eval(clickText("Mitspielen"));
      await waitFor(cdp, hasText("Du bist dran"));
      await cdp.eval(clickText("Habari ya jioni"));
      await waitFor(cdp, hasText("Nicht ganz"), { label: "Rückmeldung" });
      await sleep(400);
    },
  },
  {
    name: "lexikon",
    async run(cdp) {
      await goto(cdp, "/lexicon");
      await waitFor(cdp, hasText("Vokabeln im Pool"));
      await sleep(300);
    },
  },
  {
    name: "ngeli",
    async run(cdp) {
      await goto(cdp, "/classes");
      await waitFor(cdp, hasText("Demonstrativa") + " || " + hasText("DEMONSTRATIVA"));
      await sleep(300);
    },
  },
  {
    name: "gym",
    async run(cdp) {
      await goto(cdp, "/trainer");
      await waitFor(cdp, hasText("Grammatik-Gym"));
      await sleep(900); // Einblend-Animation der Aufgabe
    },
  },
  {
    name: "meilensteine",
    async run(cdp) {
      await goto(cdp, "/account");
      await waitFor(cdp, hasText("Meilensteine"));
      await cdp.eval(`(() => {
        const el = [...document.querySelectorAll('h2, h3')].find(e => e.textContent.includes('Meilenstein'));
        el?.scrollIntoView({ block: 'start' }); return true; })()`);
      await sleep(500);
    },
  },
];

// --- Ablauf ----------------------------------------------------------------

async function main() {
  const res = await fetch(APP_URL, { redirect: "manual" }).catch(() => null);
  if (!res) {
    console.error(
      `Keine App unter ${APP_URL}. Im App-Repo \`npm run dev\` starten (oder APP_URL setzen).`,
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  await rm(PROFILE_DIR, { recursive: true, force: true });
  await mkdir(PROFILE_DIR, { recursive: true });

  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${PROFILE_DIR}`,
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-features=Translate,MediaRouter",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let cdp;
  try {
    // Auf den Debug-Port warten und die erste Seite übernehmen.
    let target = null;
    for (let i = 0; i < 60 && !target; i++) {
      await sleep(250);
      const list = await fetch(`http://127.0.0.1:${PORT}/json/list`)
        .then((r) => r.json())
        .catch(() => []);
      target = list.find((t) => t.type === "page");
    }
    if (!target) throw new Error("Chrome hat keinen Debug-Port geöffnet.");

    cdp = await Cdp.attach(target.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", { ...VIEWPORT, mobile: true });

    console.log(`Demo-Lernstand in ${APP_URL} schreiben …`);
    await goto(cdp, "/", { wait: 1200 });
    const seeded = await cdp.eval(DEMO_STATE_SCRIPT);
    console.log(`  ${seeded.cards} Karten angelegt`);

    const shots = only.length ? SHOTS.filter((s) => only.includes(s.name)) : SHOTS;
    if (!shots.length) throw new Error(`Keine Aufnahme passt zu: ${only.join(", ")}`);

    for (const s of shots) {
      try {
        await s.run(cdp);
        await shot(cdp, s.name);
      } catch (err) {
        console.error(`  ✗ ${s.name}: ${err.message}`);
        process.exitCode = 1;
      }
    }
  } finally {
    cdp?.close();
    chrome.kill();
  }
}

await main();
