import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import datenschutzMd from "@/content/datenschutz.md?raw";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — Swahili Pocket" },
      { name: "description", content: "Datenschutzerklärung von Swahili Pocket." },
      { property: "og:title", content: "Datenschutz — Swahili Pocket" },
      {
        property: "og:description",
        content: "Datenschutzerklärung von Swahili Pocket.",
      },
      { property: "og:url", content: "/datenschutz" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <article
        className="
          text-foreground/90 leading-relaxed
          [&_h1]:font-display [&_h1]:text-5xl [&_h1]:tracking-tight [&_h1]:mb-8
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:my-4
          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:my-1
          [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-primary
          [&_strong]:font-semibold
          [&_hr]:my-8 [&_hr]:border-border
        "
      >
        <ReactMarkdown>{datenschutzMd}</ReactMarkdown>
      </article>
    </section>
  ),
});