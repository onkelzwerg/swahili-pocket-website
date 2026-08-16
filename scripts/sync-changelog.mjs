// Den Changelog der App in die Website spiegeln.
//
//   npm run sync:changelog
//   APP_REPO=../anderer-pfad npm run sync:changelog
//
// Die App pflegt ihre Versionshinweise in src/lib/changelog.ts, geschrieben in
// Nutzersprache. Sie hier abzutippen hieße, zwei Fassungen zu pflegen — nach dem
// zweiten Release stünde auf der Website etwas anderes als in der App. Dieses
// Skript kopiert den Datenteil und schreibt ihn als eigenständiges Modul.
//
// Bewusst eine Kopie im Repo statt eines Imports über die Verzeichnisgrenze:
// die Website wird für sich gebaut und deployt und darf das App-Repo zur
// Bauzeit nicht brauchen.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const APP_REPO = resolve(ROOT, process.env.APP_REPO ?? "../swahili-pocket");
const SOURCE = resolve(APP_REPO, "src/lib/changelog.ts");
const TARGET = resolve(ROOT, "src/data/apps/changelog.ts");

const source = await readFile(SOURCE, "utf8").catch(() => {
  console.error(`Changelog der App nicht gefunden: ${SOURCE}`);
  console.error("APP_REPO setzen, wenn das App-Repo woanders liegt.");
  process.exit(1);
});

// Vom Array-Literal bis zur schließenden Klammer — der Rest der Datei sind
// Typen und ein Export, die hier neu geschrieben werden.
const start = source.indexOf("export const changelog");
// Nach dem Gleichheitszeichen suchen, nicht davor — sonst trifft die Klammer
// die Typannotation `ChangelogEntry[]`.
const assign = source.indexOf("=", start);
const open = source.indexOf("[", assign);
const close = source.indexOf("\n];", open);
if (start === -1 || assign === -1 || open === -1 || close === -1) {
  console.error(
    `Unerwarteter Aufbau von ${SOURCE} — export const changelog: … [ … ]; nicht gefunden.`,
  );
  process.exit(1);
}
const entries = source.slice(open, close + 2).trimEnd();

const versions = [...entries.matchAll(/version: "([^"]+)"/g)].map((m) => m[1]);
if (!versions.length) {
  console.error("Keine Versionen im Changelog gefunden — Abbruch, damit nichts Leeres entsteht.");
  process.exit(1);
}

const out = `// ERZEUGT — nicht von Hand ändern.
// Quelle: ${relative(ROOT, SOURCE)} (App-Repo)
// Neu erzeugen mit: npm run sync:changelog

export type ChangelogEntry = {
  version: string;
  /** ISO YYYY-MM-DD */
  date: string;
  title: string;
  changes: string[];
};

export const changelog: ChangelogEntry[] = ${entries};

export const currentVersion = changelog[0];
`;

await writeFile(TARGET, out, "utf8");
console.log(
  `${versions.length} Versionen übernommen (aktuell ${versions[0]}) → ${relative(ROOT, TARGET)}`,
);
