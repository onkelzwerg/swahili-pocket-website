// Auflösung der App-Screenshots. Die Dateien entstehen mit
// `npm run screenshots` (siehe scripts/capture-screenshots.mjs) und liegen in
// src/assets/screenshots/. Über den Glob bekommt Vite sie in den Build, mit
// Hash im Dateinamen und langem Cache.

const SCREENSHOTS = import.meta.glob<string>("../assets/screenshots/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

/** Screenshot-Datei zu einem Schlüssel wie "home" auflösen. */
export function screenshotUrl(key: string): string | undefined {
  const match = Object.entries(SCREENSHOTS).find(([path]) => path.endsWith(`/${key}.png`));
  return match?.[1];
}
