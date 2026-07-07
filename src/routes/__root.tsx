import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="font-display text-7xl text-primary">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Seite nicht gefunden</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Zur Startseite
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Swahili Pocket — Swahili lernen. Pole pole." },
      {
        name: "description",
        content:
          "Swahili Pocket — kostenlose, werbefreie PWA für Deutschsprachige. Karteikarten, 1.000+ Vokabeln, Ngeli-Grammatik und Dialoge. Offline, ohne Konto.",
      },
      { property: "og:title", content: "Swahili Pocket" },
      {
        property: "og:description",
        content:
          "Swahili lernen mit Karteikarten — kostenlos, offline, ohne Konto.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Swahili Pocket" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}

function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="group flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            S
          </span>
          <span className="font-display text-2xl tracking-tight">
            Swahili Pocket
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="/#funktionen" className="hidden text-foreground/80 hover:text-primary sm:inline">
            Funktionen
          </a>
          <a href="/#installieren" className="hidden text-foreground/80 hover:text-primary sm:inline">
            Installieren
          </a>
          <a href="/#faq" className="hidden text-foreground/80 hover:text-primary sm:inline">
            FAQ
          </a>
          <a
            href="https://app.swahili-pocket.de"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            App öffnen
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-cream/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Swahili Pocket</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="https://app.swahili-pocket.de"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            App öffnen
          </a>
          <a
            href="https://github.com/onkelzwerg/swahili-pocket"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            GitHub
          </a>
          <Link to="/impressum" className="hover:text-primary">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:text-primary">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
