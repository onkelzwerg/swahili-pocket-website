# Swahili Pocket — Website

Marketing- und Landingpage für die **Swahili Pocket** PWA. Bewirbt die App,
erklärt Funktionen und Installation und verlinkt zur App.

- **App:** https://app.swahili-pocket.de
- **Website:** https://swahili-pocket.de

## Tech-Stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router/Query)
- Vite, TypeScript, Tailwind CSS 4
- Build-Target: **Cloudflare Workers** (`@cloudflare/vite-plugin`, Wrangler)

## Lokale Entwicklung

```sh
npm install
npm run dev      # Dev-Server
npm run build    # Produktions-Build
npm run lint     # ESLint + Prettier
```

## Inhalt

- `src/routes/index.tsx` — Startseite (Hero, Funktionen, Installation, FAQ)
- `src/routes/impressum.tsx` — Impressum (Pflichtangaben nach § 5 DDG)
- `src/content/datenschutz.md` — Datenschutzerklärung
- `src/data/apps/` — App-Metadaten (Name, Tagline, Funktionsliste)

## Datenschutz-Hinweis

Die Website selbst setzt keine Tracking-Cookies und bindet außer Google Fonts
keine externen Dienste ein. Gehostet über Cloudflare.
