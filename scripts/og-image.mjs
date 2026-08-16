// scripts/og-template.html zu public/og-image.png rendern (1200×630).
//
//   npm run og-image
//
// Nach jeder Änderung an der Vorlage oder am Screenshot darin neu laufen lassen.
// Nutzt dasselbe headless Chrome wie capture-screenshots.mjs — ohne npm-Paket.

import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = pathToFileURL(resolve(ROOT, "scripts/og-template.html")).href;
const OUT = resolve(ROOT, "public/og-image.png");
const PROFILE_DIR = resolve(ROOT, ".cache/og-profile");
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9334;
const SIZE = { width: 1200, height: 630, deviceScaleFactor: 1 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await rm(PROFILE_DIR, { recursive: true, force: true });
await mkdir(PROFILE_DIR, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    `--window-size=${SIZE.width},${SIZE.height}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    // Die Vorlage lädt Schriften und den Screenshot über file:// aus dem Repo.
    "--allow-file-access-from-files",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let ws;
try {
  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    const list = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      .then((r) => r.json())
      .catch(() => []);
    target = list.find((t) => t.type === "page");
  }
  if (!target) throw new Error("Chrome hat keinen Debug-Port geöffnet.");

  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", () => rej(new Error("CDP-Verbindung fehlgeschlagen")), {
      once: true,
    });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    const entry = pending.get(msg.id);
    if (!entry) return;
    pending.delete(msg.id);
    msg.error ? entry.reject(new Error(msg.error.message)) : entry.resolve(msg.result);
  });
  const send = (method, params = {}) => {
    const messageId = ++id;
    ws.send(JSON.stringify({ id: messageId, method, params }));
    return new Promise((resolve, reject) => pending.set(messageId, { resolve, reject }));
  };

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { ...SIZE, mobile: false });
  await send("Page.navigate", { url: TEMPLATE });
  await sleep(1500); // Schriften und Bild

  const { data } = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(OUT, Buffer.from(data, "base64"));
  console.log(`og-image.png geschrieben (${SIZE.width}×${SIZE.height})`);
} finally {
  ws?.close();
  chrome.kill();
}
