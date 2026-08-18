import { createFileRoute } from "@tanstack/react-router";
import app from "@/data/apps/swahili-pocket";
import { changelog, currentVersion } from "@/data/apps/changelog";
import { BRAND_GRADIENT, Eyebrow, Pill } from "@/components/site/sections";

const title = `Was ist neu — ${app.name}`;
const description = `Alle Versionen von ${app.name} auf einen Blick. Zuletzt: ${currentVersion.version} — ${currentVersion.title}.`;

/** 2026-08-13 → 13. August 2026 */
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Route = createFileRoute("/neu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${app.siteUrl}/neu` },
    ],
    links: [{ rel: "canonical", href: `${app.siteUrl}/neu` }],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  const [latest, ...rest] = changelog;

  return (
    <>
      <section className="text-white" style={{ backgroundImage: BRAND_GRADIENT }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Mabadiliko · Was ist neu
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Jede Version, in Klartext.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Was sich in {app.name} geändert hat, beschrieben in dem, was du davon merkst.
          </p>
          <div className="mt-8">
            <Pill href={app.appUrl} variant="onDark">
              App öffnen
            </Pill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Die aktuelle Version bekommt eine eigene Karte — auf sie zeigen die Links. */}
        <article className="rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Aktuell
            </span>
            <span className="font-display text-2xl tabular-nums">{latest.version}</span>
            <time dateTime={latest.date} className="text-sm text-muted-foreground">
              {formatDate(latest.date)}
            </time>
          </div>
          <h2 className="mt-4 font-display text-3xl tracking-tight">{latest.title}</h2>
          <ul className="mt-6 space-y-3">
            {latest.changes.map((change) => (
              <li key={change} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-12">
          <Eyebrow>Davor</Eyebrow>
          <ol className="mt-6 space-y-8">
            {rest.map((entry) => (
              <li key={entry.version} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-xl tabular-nums">{entry.version}</span>
                  <time dateTime={entry.date} className="text-xs text-muted-foreground">
                    {formatDate(entry.date)}
                  </time>
                </div>
                <h3 className="mt-2 font-display text-xl">{entry.title}</h3>
                <ul className="mt-4 space-y-2">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-border" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
