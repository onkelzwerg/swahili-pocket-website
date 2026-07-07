import { createFileRoute } from "@tanstack/react-router";
import app from "@/data/apps/swahili-pocket";
import heroImage from "@/assets/swahili-pocket-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${app.name} — ${app.tagline}` },
      { name: "description", content: app.description },
      { property: "og:title", content: `${app.name} — ${app.tagline}` },
      { property: "og:description", content: app.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: app.name,
          description: app.description,
          url: app.appUrl,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web, iOS, Android",
          inLanguage: "de",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
          featureList: [
            "Karteikarten mit Leitner-Spaced-Repetition",
            "1.000+ kuratierte Vokabeln mit Beispielsätzen",
            "Ngeli-Grammatik-Referenz",
            "13 Alltags-Dialoge mit Vorlesefunktion",
            "100 % offline, ohne Konto",
          ],
        }),
      },
    ],
  }),
  component: SwahiliPocketPage,
});

function SwahiliPocketPage() {
  return (
    <>
      {/* HERO — Terrakotta → Ocker gradient */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #c2522a 0%, #d9a441 100%)",
        }}
      >
        <div className="absolute inset-0 -z-0 opacity-30 mix-blend-overlay">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-forest/40 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                {app.flag} tansanisches Kiswahili sanifu
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                Kostenlos · werbefrei
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                100 % offline
              </span>
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Swahili lernen.
              <br />
              <span className="italic">Pole pole.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">
              {app.subline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={app.appUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90"
              >
                App öffnen
              </a>
              <a
                href="#installieren"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Zum Homescreen hinzufügen
              </a>
            </div>
            <p className="mt-4 text-xs text-white/80">
              kostenlos · ohne Anmeldung · funktioniert offline
            </p>
          </div>

          {/* Phone mockup — realistic iPhone proportions ~9:19.5 */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-black/30 blur-2xl" />
            <div className="relative aspect-[9/19.5] rounded-[2.75rem] border-[10px] border-black/85 bg-cream p-3 shadow-2xl">
              {/* Notch / Dynamic Island */}
              <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/85" />
              <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream pt-8">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 text-[10px] font-semibold text-foreground/70">
                  <span>9:41</span>
                  <span>● ● ●</span>
                </div>
                {/* App content */}
                <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 pb-3 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    <span>Msamiati</span>
                    <span>🔥 12</span>
                  </div>
                  <div
                    className="flex flex-1 flex-col justify-center rounded-[1.25rem] p-5 text-white shadow-lg"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #c2522a 0%, #d9a441 100%)",
                    }}
                  >
                    <p className="text-[9px] uppercase tracking-widest text-white/80">
                      Karte 3 / 12
                    </p>
                    <p className="mt-4 font-display text-3xl leading-tight">
                      Karibu!
                    </p>
                    <p className="mt-2 text-[10px] text-white/80">
                      Antippen zum Umdrehen
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-full bg-forest px-2 py-1.5 text-center text-[10px] font-semibold text-forest-foreground">
                      Gewusst
                    </div>
                    <div className="rounded-full border border-border bg-card px-2 py-1.5 text-center text-[10px] font-semibold text-foreground">
                      Nochmal
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-2.5">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
                      Spruch des Tages
                    </p>
                    <p className="mt-0.5 font-display text-[13px] leading-snug text-foreground">
                      {app.motto.swahili}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {app.motto.german}
                    </p>
                  </div>
                  {/* Home indicator */}
                  <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-foreground/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/20 bg-black/10 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-6 text-center md:grid-cols-4">
            {app.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl sm:text-3xl">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {app.usps.map((u) => (
            <div
              key={u.title}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="text-3xl">{u.emoji}</div>
              <h3 className="mt-4 font-display text-2xl">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {u.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="funktionen" className="bg-cream/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Msamiati · Wortschatz
          </span>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Alles, was du zum Lernen brauchst.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Keine Fantasie-Features — nur das, was in {app.name} tatsächlich
            drin ist.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <div className="text-2xl">{f.emoji}</div>
                <h3 className="mt-3 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2 rounded-full border border-border bg-card p-2 text-sm">
            <span className="px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              In der App
            </span>
            {app.navigation.map((n) => (
              <span
                key={n}
                className="rounded-full bg-cream px-3 py-1 font-medium"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* App-Screenshots (stilisierte Mock-UIs) */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Ein Blick in die App
          </span>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Lernkarte, Lexikon, Ngeli, Dialoge.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Stilisierte Vorschau der wichtigsten Screens — genau so aufgebaut
            wie in {app.name}.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <MockPhone label="Lernkarte">
              <MockEyebrow left="Msamiati" right="🔥 12" />
              <div
                className="flex flex-1 flex-col justify-center rounded-[1.25rem] p-4 text-white shadow-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #c2522a 0%, #d9a441 100%)",
                }}
              >
                <p className="text-[9px] uppercase tracking-widest text-white/80">
                  Karte 3 / 12
                </p>
                <p className="mt-3 font-display text-2xl leading-tight">
                  Asante sana
                </p>
                <p className="mt-1.5 text-[10px] text-white/80">
                  Antippen zum Umdrehen
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-full bg-forest px-2 py-1.5 text-center text-[10px] font-semibold text-forest-foreground">
                  Gewusst
                </div>
                <div className="rounded-full border border-border bg-card px-2 py-1.5 text-center text-[10px] font-semibold text-foreground">
                  Nochmal
                </div>
              </div>
            </MockPhone>

            <MockPhone label="Msamiati · Lexikon">
              <MockEyebrow left="Msamiati" right="1.032" />
              <div className="rounded-full border border-border bg-card px-3 py-2 text-[10px] text-muted-foreground">
                🔎 Suche · z. B. „Reisen"
              </div>
              {[
                { sw: "karibu", de: "willkommen", ngeli: "—" },
                { sw: "chakula", de: "Essen", ngeli: "Ki-Vi" },
                { sw: "safari", de: "Reise", ngeli: "N" },
                { sw: "rafiki", de: "Freund", ngeli: "M-Wa" },
                { sw: "nyumba", de: "Haus", ngeli: "N" },
              ].map((v) => (
                <div
                  key={v.sw}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
                >
                  <div>
                    <p className="font-display text-[13px] leading-tight text-foreground">
                      {v.sw}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{v.de}</p>
                  </div>
                  <span className="rounded-full bg-cream px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-primary">
                    {v.ngeli}
                  </span>
                </div>
              ))}
            </MockPhone>

            <MockPhone label="Ngeli · Grammatik">
              <MockEyebrow left="Ngeli" right="8" />
              <div className="rounded-xl border border-border bg-card p-3">
                <p className="font-display text-[13px] text-foreground">
                  M-Wa-Klasse
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Menschen
                </p>
                <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[10px]">
                  <div className="rounded bg-cream py-1 font-semibold">Sg.</div>
                  <div className="col-span-2 rounded bg-primary/10 py-1 text-primary">
                    m-
                  </div>
                  <div className="rounded bg-cream py-1 font-semibold">Pl.</div>
                  <div className="col-span-2 rounded bg-primary/10 py-1 text-primary">
                    wa-
                  </div>
                </div>
              </div>
              {["M-Mi", "Ki-Vi", "N", "Ji-Ma", "U"].map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-1.5 text-[10px]"
                >
                  <span className="font-display text-[12px]">{c}</span>
                  <span className="text-muted-foreground">→</span>
                </div>
              ))}
            </MockPhone>

            <MockPhone label="Dialoge">
              <MockEyebrow left="Sokoni · Markt" right="🔊" />
              <div className="flex flex-col gap-1.5">
                <ChatBubble side="left">Habari za asubuhi!</ChatBubble>
                <ChatBubble side="right">Nzuri sana, asante.</ChatBubble>
                <ChatBubble side="left">Nataka nyanya, tafadhali.</ChatBubble>
                <ChatBubble side="right">Kilo moja?</ChatBubble>
                <ChatBubble side="left">Ndio, asante.</ChatBubble>
              </div>
            </MockPhone>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Stilisierte Vorschauen — echte App-Screenshots folgen.
          </p>
        </div>
      </section>

      {/* So funktioniert's + Leitner-Boxen */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              So funktioniert's
            </span>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              In drei Schritten zum Ziel.
            </h2>
            <ol className="mt-6 space-y-5">
              {app.howItWorks.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm text-muted-foreground">
              <span className="font-display text-base text-foreground">
                Hakuna kazi leo!
              </span>{" "}
              — „Heute keine Arbeit!" So begrüßt dich die App, wenn du deine
              Karten für heute geschafft hast.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Leitner-Box
            </p>
            <p className="mt-2 text-muted-foreground">
              5 Boxen, wachsende Intervalle. Wer sitzt, kommt in die nächste
              Box — wer wackelt, zurück auf Box 1.
            </p>
            <div className="mt-6 grid gap-3">
              {app.boxIntervals.map((interval, i) => (
                <div
                  key={interval}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  style={{ marginLeft: `${i * 12}px` }}
                >
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-lg"
                    style={{
                      backgroundColor: `color-mix(in oklab, var(--primary) ${
                        20 + i * 15
                      }%, var(--card))`,
                      color: i > 1 ? "white" : "var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-base">Box {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      Wiederholung alle {interval}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy — dark forest block */}
      <section className="text-white" style={{ backgroundColor: "#2d5a3d" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Backup · Privat
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              Kein Konto. Kein Server.
              <br />
              Deine Daten bleiben bei dir.
            </h2>
          </div>
          <div>
            <p className="text-lg text-white/90">
              Swahili Pocket speichert alles — Karten, Fortschritt, XP, Streak
              — in der lokalen Datenbank deines Browsers. Nichts geht in eine
              Cloud, nichts wird getrackt, es gibt keinen Login.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              {[
                "Kein Konto, keine Registrierung, kein Passwort",
                "Kein Analytics, kein Tracking, keine Third-Party-Skripte",
                "JSON-Backup zum Exportieren und auf ein anderes Gerät importieren",
                "Open Source — Code auf GitHub einsehbar",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-ochre" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Spruch des Tages */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl border border-forest/30 bg-forest/10 p-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-forest">
            Methali · Spruch des Tages
          </span>
          <p className="mt-4 font-display text-3xl italic text-foreground sm:text-4xl">
            „{app.motto.swahili}"
          </p>
          <p className="mt-3 text-muted-foreground">{app.motto.german}</p>
        </div>
      </section>

      {/* PWA Install */}
      <section id="installieren" className="bg-cream/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Zum Homescreen hinzufügen
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {app.name} ist eine Progressive Web App. Du installierst sie
            direkt aus dem Browser — kein App Store, kein Konto, keine
            Updates.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍎</span>
                <h3 className="font-display text-2xl">iOS (iPhone & iPad)</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Bitte in Safari öffnen.
              </p>
              <ol className="mt-5 space-y-3 text-sm">
                <Step n="1">
                  Öffne {app.name} in <strong>Safari</strong>.
                </Step>
                <Step n="2">
                  Tippe unten auf das <strong>Teilen-Symbol</strong> (Quadrat
                  mit Pfeil nach oben).
                </Step>
                <Step n="3">
                  Wähle <strong>„Zum Home-Bildschirm"</strong>.
                </Step>
                <Step n="4">
                  Bestätige oben rechts mit <strong>„Hinzufügen"</strong>.
                </Step>
              </ol>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <h3 className="font-display text-2xl">Android</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Am besten mit Chrome.
              </p>
              <ol className="mt-5 space-y-3 text-sm">
                <Step n="1">
                  Öffne {app.name} in <strong>Chrome</strong>.
                </Step>
                <Step n="2">
                  Tippe oben rechts auf das <strong>Menü ⋮</strong>.
                </Step>
                <Step n="3">
                  Wähle <strong>„App installieren"</strong> oder{" "}
                  <strong>„Zum Startbildschirm hinzufügen"</strong>.
                </Step>
                <Step n="4">
                  Bestätige mit <strong>„Installieren"</strong>.
                </Step>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          FAQ
        </span>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Häufige Fragen.
        </h2>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card">
          {app.faq.map((item) => (
            <details
              key={item.q}
              className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg">
                {item.q}
                <span className="text-primary transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #c2522a 0%, #d9a441 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Karibu — jetzt loslegen.
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Kostenlos, werbefrei, ohne Konto. Vizuri sana!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={app.appUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90"
            >
              App öffnen
            </a>
            <a
              href={app.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Code auf GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {n}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  );
}

function MockPhone({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="relative aspect-[9/19.5] rounded-[2rem] border-[8px] border-black/85 bg-cream p-2 shadow-xl">
        <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/85" />
        <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-cream pt-6">
          <div className="flex items-center justify-between px-3 text-[9px] font-semibold text-foreground/70">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-2.5 pb-2 pt-1.5">
            {children}
          </div>
          <div className="mx-auto mb-1 h-0.5 w-12 rounded-full bg-foreground/30" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function MockEyebrow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function ChatBubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div
      className={`max-w-[85%] rounded-2xl px-2.5 py-1.5 text-[10px] leading-snug ${
        isRight
          ? "self-end bg-primary text-primary-foreground"
          : "self-start border border-border bg-card text-foreground"
      }`}
    >
      {children}
    </div>
  );
}