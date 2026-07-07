export type FaqItem = { q: string; a: string };
export type HowStep = { n: string; title: string; description: string };
export type Usp = { emoji: string; title: string; description: string };

const swahiliPocket = {
  slug: `swahili-pocket`,
  name: `Swahili Pocket`,
  language: `Swahili`,
  flag: `🇹🇿`,
  tagline: `Swahili lernen. Pole pole.`,
  subline: `Karteikarten, 1.000+ Vokabeln und Grammatik — kostenlos, offline, ohne Konto.`,
  description: `Swahili Pocket ist eine kostenlose, werbefreie PWA für Deutschsprachige, die tansanisches Kiswahili sanifu lernen möchten — mit Leitner-Karteikarten, über 1.000 kuratierten Vokabeln, Ngeli-Grammatik-Referenz und alltagsnahen Dialogen.`,
  appUrl: `https://app.swahili-pocket.de`,
  repoUrl: `https://github.com/onkelzwerg/swahili-pocket`,
  accent: `primary` as const,
  motto: {
    swahili: `Pole pole ndio mwendo.`,
    german: `Langsam, langsam ist der Weg.`,
  },
  stats: [
    { value: `1.000+`, label: `kuratierte Vokabeln` },
    { value: `13`, label: `Alltags-Dialoge` },
    { value: `8`, label: `Ngeli-Klassen` },
    { value: `0 €`, label: `für immer` },
  ],
  usps: [
    {
      emoji: `🔒`,
      title: `Deine Daten gehören dir`,
      description: `Kein Konto, keine Cloud, kein Tracking. Alle Lerndaten bleiben in deinem Browser — funktioniert komplett offline.`,
    },
    {
      emoji: `📚`,
      title: `1.000+ echte Vokabeln`,
      description: `Kuratierte Wortliste mit Beispielsätzen, Wortart und Ngeli-Klasse — nicht bloß eine Wortliste, sondern Sprache im Kontext.`,
    },
    {
      emoji: `🧠`,
      title: `Spaced Repetition, das funktioniert`,
      description: `Leitner-System mit 5 Boxen (1/2/4/7/30 Tage) und CEFR-orientierten Levels von A1.1 bis C2.`,
    },
  ] as Usp[],
  features: [
    {
      emoji: `🎴`,
      title: `Karteikarten mit Spaced Repetition`,
      description: `5 Boxen mit Intervallen von 1, 2, 4, 7 und 30 Tagen. Karten swipen (rechts = gewusst, links = nochmal) oder mit Buttons bewerten. Antippen zum Umdrehen: vorne Swahili, hinten Deutsch mit bis zu zwei Beispielsätzen.`,
    },
    {
      emoji: `🔎`,
      title: `Msamiati — 1.000+ Vokabeln`,
      description: `Der komplette Wortschatz ist durchsuchbar und nach Wortart oder Ngeli-Klasse filterbar. Jede Vokabel bringt Beispielsätze mit. Ein Klick, und sie wird zur Lernkarte.`,
    },
    {
      emoji: `🎯`,
      title: `Gezieltes Kartenziehen`,
      description: `Wähle per Slider 5–20 Karten und beschreibe den Bereich als Freitext (Küche, Reisen, M-Wa-Klasse) oder wähle einen Themen-Chip — die App findet passende, noch ungelernte Vokabeln.`,
    },
    {
      emoji: `✍️`,
      title: `Eigene Vokabeln anlegen`,
      description: `Ergänze dein Vokabular um eigene Wörter — mit Wortart, Ngeli-Klasse und deinen eigenen Beispielsätzen.`,
    },
    {
      emoji: `🧩`,
      title: `Ngeli — Grammatik endlich verständlich`,
      description: `Alle Swahili-Nomenklassen (M-Wa, M-Mi, Ki-Vi, N, Ji-Ma, U, Pa-Ku-Mu, Ku) mit Präfix-Tabellen, Demonstrativa und Beispielen — in jede Karte integriert.`,
    },
    {
      emoji: `💬`,
      title: `13 Dialoge aus dem Alltag`,
      description: `Begrüßung, Markt, Restaurant, Taxi, Hotel, Notfall und mehr — als Chat-Ansicht mit Vorlesefunktion.`,
    },
    {
      emoji: `🔊`,
      title: `Vorlesefunktion (TTS)`,
      description: `Jedes Wort, jeder Beispielsatz und ganze Dialoge lassen sich per Lautsprecher-Button anhören — direkt über die Sprachausgabe deines Browsers.`,
    },
    {
      emoji: `🔥`,
      title: `Streak, XP und CEFR-Level`,
      description: `Tages-Streak, Erfahrungspunkte und ein Fortschritts-Level von A1.1 bis C2 — orientiert am Europäischen Referenzrahmen.`,
    },
    {
      emoji: `☀️`,
      title: `Spruch des Tages`,
      description: `30 Swahili-Sprichwörter (Methali) und Kanga-Weisheiten mit deutscher Übersetzung — jeden Tag ein neuer Impuls.`,
    },
  ],
  howItWorks: [
    {
      n: `1`,
      title: `Vokabeln ziehen`,
      description: `Wähle ein Thema oder lass die App passende Karten aus dem Pool von 1.000+ Vokabeln ziehen.`,
    },
    {
      n: `2`,
      title: `Täglich üben`,
      description: `Swipe dich durch deine Karten. Vizuri sana! — richtige Antworten wandern in höhere Boxen und kommen seltener.`,
    },
    {
      n: `3`,
      title: `Level aufsteigen`,
      description: `Sammle XP, halte deinen Streak und arbeite dich Schritt für Schritt von A1.1 bis C2 hoch.`,
    },
  ] as HowStep[],
  faq: [
    {
      q: `Ist die App wirklich kostenlos?`,
      a: `Ja. Swahili Pocket ist komplett kostenlos, werbefrei und ohne In-App-Käufe. Es gibt kein Premium, keine Testphase, keine versteckten Kosten.`,
    },
    {
      q: `Brauche ich Internet?`,
      a: `Nur einmal — beim ersten Laden. Danach funktioniert die App komplett offline. Als PWA installiert läuft sie wie eine native App auf deinem Gerät.`,
    },
    {
      q: `Was passiert mit meinen Daten?`,
      a: `Gar nichts. Alle Lerndaten (Karten, Fortschritt, XP) liegen ausschließlich in der lokalen Browser-Datenbank deines Geräts. Kein Konto, kein Server, kein Tracking. Ein JSON-Backup kannst du jederzeit exportieren und importieren.`,
    },
    {
      q: `Wie installiere ich die PWA?`,
      a: `Auf dem iPhone: In Safari öffnen, dann Teilen-Symbol und „Zum Home-Bildschirm". Auf Android: In Chrome öffnen, Menü ⋮ und „App installieren". Danach hast du Swahili Pocket wie eine App auf dem Startbildschirm.`,
    },
    {
      q: `Für welches Swahili ist die App?`,
      a: `Für tansanisches Kiswahili sanifu — die Standardvariante, die in Tansania, Kenia und weiten Teilen Ostafrikas verstanden wird.`,
    },
  ] as FaqItem[],
  boxIntervals: [`1 Tag`, `2 Tage`, `4 Tage`, `7 Tage`, `30 Tage`],
  navigation: [`Home`, `Lexikon`, `Üben`, `Dialoge`, `Ngeli`, `Mehr`],
  cardPreviews: [
    { front: `Karibu!`, back: `Willkommen!` },
    { front: `Asante sana`, back: `Vielen Dank` },
    { front: `Pole pole`, back: `Langsam, langsam` },
    { front: `Habari yako?`, back: `Wie geht es dir?` },
  ],
};

export default swahiliPocket;