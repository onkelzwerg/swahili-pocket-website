// Bausteine der Startseite. Farben und Radien kommen aus den Tokens in
// src/styles.css — dieselben Werte wie in der App (siehe ds-bundle/README.md).

import type { ReactNode } from "react";
import { PhoneFrame } from "./PhoneFrame";
import type { FeatureSection } from "@/data/apps/swahili-pocket";

/** Der Signatur-Verlauf der App: Terrakotta → Ocker. */
export const BRAND_GRADIENT =
  "linear-gradient(135deg, oklch(0.58 0.17 38) 0%, oklch(0.72 0.15 70) 100%)";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-widest text-primary">{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}

export function Pill({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "onDark";
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
    outline: "border border-border bg-card text-foreground hover:bg-accent",
    onDark: "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  }[variant];

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}

/** Ein Feature-Block: Text und Screenshot, abwechselnd links und rechts. */
export function FeatureBlock({ section, flip }: { section: FeatureSection; flip: boolean }) {
  return (
    <div id={section.id} className="grid scroll-mt-24 items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={flip ? "md:order-2" : undefined}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <dl className="mt-8 space-y-5">
          {section.points.map((p) => (
            <div key={p.title} className="border-l-2 border-primary/30 pl-4">
              <dt className="font-display text-lg">{p.title}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{p.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className={flip ? "md:order-1" : undefined}>
        <PhoneFrame screenshot={section.screenshot} alt={section.caption} />
        <figcaption className="mt-4 text-center text-xs text-muted-foreground">
          {section.caption}
        </figcaption>
      </figure>
    </div>
  );
}
