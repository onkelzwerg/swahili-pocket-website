import { createFileRoute, Link } from "@tanstack/react-router";
import app from "@/data/apps/swahili-pocket";
import { currentVersion } from "@/data/apps/changelog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PhoneFrame } from "@/components/site/PhoneFrame";
import {
  BRAND_GRADIENT,
  Eyebrow,
  FeatureBlock,
  Pill,
  SectionHeading,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${app.name} — ${app.tagline}` },
      { name: "description", content: app.description },
      { property: "og:title", content: `${app.name} — ${app.tagline}` },
      { property: "og:description", content: app.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: app.siteUrl },
    ],
    links: [{ rel: "canonical", href: app.siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: app.name,
            description: app.description,
            url: app.appUrl,
            softwareVersion: app.version,
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web, iOS, Android",
            inLanguage: "de",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            featureList: [
              "Vier Übungsarten: Karte, Tippen, Hören, Lückensatz",
              "Vier Antwortstufen, Leitner oder adaptives FSRS",
              "1.268 kuratierte Vokabeln mit Beispielsätzen",
              "20 Geschichten mit Glossar, freigeschaltet ab 95 % bekannter Wörter",
              "23 Dialoge zum Mitspielen mit 85 Entscheidungspunkten",
              "Ngeli-Grammatik-Referenz und Grammatik-Gym",
              "Vorlesefunktion mit echten Stimmen, offline verfügbar",
              "100 % offline, ohne Konto",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: app.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]),
      },
    ],
  }),
  component: SwahiliPocketPage,
});

function SwahiliPocketPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden text-white"
        style={{ backgroundImage: BRAND_GRADIENT }}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
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
            <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">{app.subline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={app.appUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90"
              >
                App öffnen
              </a>
              <Pill href="#installieren" variant="onDark">
                Zum Homescreen hinzufügen
              </Pill>
            </div>
            <p className="mt-4 text-xs text-white/80">
              kostenlos · ohne Anmeldung · funktioniert offline
            </p>
          </div>

          <PhoneFrame
            screenshot="home"
            alt={`Startbildschirm von ${app.name} mit fälligen Karten, Streak und Wochenziel`}
            priority
          />
        </div>

        {/* Zahlen */}
        <div className="relative border-t border-white/20 bg-black/10 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-6 text-center md:grid-cols-4">
            {app.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl tabular-nums sm:text-3xl">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {app.usps.map((u) => (
            <div key={u.title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="text-3xl">{u.emoji}</div>
              <h2 className="mt-4 font-display text-2xl">{u.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{u.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Die Kernschleife */}
      <section id="so-laeufts" className="scroll-mt-24 border-y border-border/70 bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Der Weg durch die App"
            title="Vokabeln sind das Mittel. Lesen und Mitreden sind das Ziel."
            lead="Alles hängt an einer Zahl: 95 %. Sobald du so viel eines Textes kennst, öffnet er sich. Und wenn nicht, sagt dir die App auf das Wort genau, was noch fehlt."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {app.learningPath.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-3xl border border-border bg-card p-6"
              >
                <span className="font-display text-5xl text-primary/20 tabular-nums">{i + 1}</span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  {step.eyebrow}
                </p>
                <h3 className="mt-1 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-2xl border border-forest/30 bg-forest/10 px-5 py-4 text-sm">
            <span className="font-display text-base">Hakuna kazi leo!</span>{" "}
            <span className="text-muted-foreground">
              — „Heute keine Arbeit!" So begrüßt dich die App, wenn du deine Karten für heute
              geschafft hast.
            </span>
          </p>
        </div>
      </section>

      {/* Feature-Blöcke */}
      <section id="funktionen" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl space-y-24 px-6">
          {app.featureSections.map((section, i) => (
            <FeatureBlock key={section.id} section={section} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Themenpakete */}
      <section className="border-y border-border/70 bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Vifurushi · Themenpakete"
            title="Sechs Pakete, die du einzeln zuschaltest."
            lead="Zusätzlicher Wortschatz für einzelne Themen. Eingeschaltet stehen die Wörter im Pool zur Auswahl — und die Dialoge, die sie brauchen, werden sichtbar."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {app.packs.map((p) => (
              <li
                key={p.title}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4"
              >
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="font-display text-lg">{p.title}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">{p.words} Wörter</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Ein Blick in die App" title="Echte Screens, keine Montage." />
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <ul className="mx-auto flex w-max gap-8 px-6">
            {app.gallery.map((g) => (
              <li key={g.screenshot} className="w-[220px] shrink-0">
                <PhoneFrame
                  screenshot={g.screenshot}
                  alt={`${g.label}: ${g.caption}`}
                  className="max-w-[220px]"
                />
                <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {g.label}
                </p>
                <p className="mt-1 text-center text-xs text-muted-foreground">{g.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* So funktioniert's + Boxen */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow="So funktioniert's" title="In drei Schritten zum Ziel." />
            <ol className="mt-8 space-y-5">
              {app.howItWorks.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Leitner-Box — oder adaptiv
            </p>
            <p className="mt-2 text-muted-foreground">
              Fünf Boxen mit wachsenden Abständen: Wer sitzt, kommt eine Box weiter — wer wackelt,
              zurück auf Box 1. Wem das zu starr ist, schaltet auf FSRS um, das die Abstände an jede
              einzelne Karte anpasst. Der Fortschritt bleibt beim Wechsel erhalten.
            </p>
            <div className="mt-6 grid gap-3">
              {app.boxes.map((note, i) => (
                <div
                  key={note}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  style={{ marginLeft: `${i * 12}px` }}
                >
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-lg"
                    style={{
                      backgroundColor: `color-mix(in oklab, var(--primary) ${
                        20 + i * 15
                      }%, var(--card))`,
                      color: i > 1 ? "var(--primary-foreground)" : "var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-base">Box {i + 1}</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privatsphäre */}
      <section className="bg-forest text-forest-foreground">
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
            <p className="text-lg opacity-90">
              Swahili Pocket speichert alles — Karten, Fortschritt, XP, Streak, Meilensteine — in
              der lokalen Datenbank deines Browsers. Nichts geht in eine Cloud, nichts wird
              getrackt, es gibt keinen Login.
            </p>
            <ul className="mt-6 space-y-3 text-sm opacity-90">
              {app.privacyPoints.map((line) => (
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
          <p className="mt-4 font-display text-3xl italic sm:text-4xl">„{app.motto.swahili}"</p>
          <p className="mt-3 text-muted-foreground">{app.motto.german}</p>
        </div>
      </section>

      {/* PWA-Installation */}
      <section id="installieren" className="scroll-mt-24 border-y border-border/70 bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Zum Homescreen hinzufügen
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {app.name} ist eine Progressive Web App. Du installierst sie direkt aus dem Browser —
            kein App Store, kein Konto, keine Updates.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍎</span>
                <h3 className="font-display text-2xl">iOS (iPhone & iPad)</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Bitte in Safari öffnen.</p>
              <ol className="mt-5 space-y-3 text-sm">
                <Step n="1">
                  Öffne {app.name} in <strong>Safari</strong>.
                </Step>
                <Step n="2">
                  Tippe unten auf das <strong>Teilen-Symbol</strong> (Quadrat mit Pfeil nach oben).
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
              <p className="mt-2 text-sm text-muted-foreground">Am besten mit Chrome.</p>
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
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Häufige Fragen.</h2>
        <Accordion
          type="single"
          collapsible
          className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card px-6"
        >
          {app.faq.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-0">
              <AccordionTrigger className="font-display text-lg hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Abschluss */}
      <section className="text-white" style={{ backgroundImage: BRAND_GRADIENT }}>
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
            <Pill href={app.repoUrl} variant="onDark">
              Code auf GitHub
            </Pill>
          </div>
          <p className="mt-8 text-sm text-white/80">
            Zuletzt erschienen:{" "}
            <Link to="/neu" className="font-semibold underline underline-offset-4">
              Version {currentVersion.version} — {currentVersion.title}
            </Link>
          </p>
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
