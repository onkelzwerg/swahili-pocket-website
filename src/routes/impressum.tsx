import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Swahili Pocket" },
      { name: "description", content: "Impressum von Swahili Pocket." },
      { property: "og:title", content: "Impressum — Swahili Pocket" },
      { property: "og:description", content: "Impressum von Swahili Pocket." },
      { property: "og:url", content: "/impressum" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-5xl tracking-tight">Impressum</h1>
      <div className="mt-8 space-y-6 text-foreground/90">
        <div>
          <h2 className="font-display text-xl">Angaben gemäß § 5 DDG</h2>
          <p className="mt-3">
            Timo Barske<br />
            Josef-Obenhin-Str. 4<br />
            80634 München<br />
            Deutschland
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl">Kontakt</h2>
          <p className="mt-3">
            Telefon:{" "}
            <a href="tel:+4915779619995" className="underline underline-offset-4">
              +49 1577 9619995
            </a>
            <br />
            E-Mail:{" "}
            <a href="mailto:info@swahili-pocket.de" className="underline underline-offset-4">
              info@swahili-pocket.de
            </a>
          </p>
        </div>
      </div>
    </section>
  ),
});