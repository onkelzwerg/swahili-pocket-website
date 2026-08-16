// Einzige Datenquelle der Website. Startseite und /neu ziehen jede Zahl von
// hier — nichts steht hartkodiert im JSX.
//
// Stand: App-Version 0.7.0. Die Zahlen stammen aus dem App-Repo:
//   1.268 Kernwörter   swahili-pocket/public/vocab-pool.json
//   20 Geschichten     swahili-pocket/public/stories/
//   23 Dialoge         swahili-pocket/public/dialogues/   (15 ohne Themenpakete sichtbar)
//   6 Pakete, 56 Wörter swahili-pocket/public/vocab-packs/index.json
//   17 Meilensteine    swahili-pocket/src/lib/milestones.ts
// Nach jedem App-Release gegenprüfen.

export type FaqItem = { q: string; a: string };
export type HowStep = { n: string; title: string; description: string };
export type Usp = { emoji: string; title: string; description: string };
export type LearningStep = {
  eyebrow: string;
  title: string;
  description: string;
};
export type FeatureSection = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  points: { title: string; description: string }[];
  /** Schlüssel in src/assets/screenshots/<key>.png */
  screenshot: string;
  caption: string;
};

const swahiliPocket = {
  slug: `swahili-pocket`,
  name: `Swahili Pocket`,
  language: `Swahili`,
  flag: `🇹🇿`,
  version: `0.7.0`,
  tagline: `Swahili lernen. Pole pole.`,
  subline: `Karteikarten, 1.268 Vokabeln, Geschichten zum Lesen und Dialoge zum Mitreden — kostenlos, offline, ohne Konto.`,
  description: `Swahili Pocket ist eine kostenlose, werbefreie PWA für Deutschsprachige, die tansanisches Kiswahili sanifu lernen — mit vier Übungsarten, 1.268 kuratierten Vokabeln, 20 Geschichten und 23 Dialogen zum Mitspielen. Alles offline, ohne Konto, ohne Tracking.`,
  appUrl: `https://app.swahili-pocket.de`,
  siteUrl: `https://swahili-pocket.de`,
  repoUrl: `https://github.com/onkelzwerg/swahili-pocket`,
  accent: `primary` as const,
  motto: {
    swahili: `Pole pole ndio mwendo.`,
    german: `Langsam, langsam ist der Weg.`,
  },
  stats: [
    { value: `1.268`, label: `kuratierte Vokabeln` },
    { value: `20`, label: `Geschichten` },
    { value: `23`, label: `Dialoge zum Mitreden` },
    { value: `0 €`, label: `für immer` },
  ],
  usps: [
    {
      emoji: `🔒`,
      title: `Deine Daten gehören dir`,
      description: `Kein Konto, keine Cloud, kein Tracking. Alle Lerndaten bleiben in deinem Browser — und die App funktioniert komplett offline, samt Sprachaufnahmen.`,
    },
    {
      emoji: `⌨️`,
      title: `Abrufen statt wiedererkennen`,
      description: `Eine Runde mischt vier Übungsarten: Karte, Tippen, Hören und Lückensatz. Wer tippt, muss das Wort wirklich können — Tippfehler werden dabei verziehen, nicht bestraft.`,
    },
    {
      emoji: `🔓`,
      title: `Inhalte, die sich öffnen`,
      description: `Geschichten und Dialoge schalten sich frei, sobald du 95 % ihrer Wörter kennst. Bei gesperrten steht, wie viele noch fehlen — und ein Tipp bringt dich direkt zu genau diesen Wörtern.`,
    },
  ] as Usp[],
  /** Die Kernschleife der App — der rote Faden der Startseite. */
  learningPath: [
    {
      eyebrow: `Erstens`,
      title: `Wörter ziehen`,
      description: `Aus 1.268 kuratierten Vokabeln ziehst du dir Karten — per Slider, nach Thema oder als Freitext („Küche", „Reisen", „M-Wa-Klasse").`,
    },
    {
      eyebrow: `Zweitens`,
      title: `Festigen`,
      description: `Vier Übungsarten, vier Antwortstufen, zwei Lernmethoden. Jede Antwort bestimmt, wann die Karte wiederkommt — nach Leitner oder adaptiv nach FSRS.`,
    },
    {
      eyebrow: `Drittens`,
      title: `Lesen`,
      description: `Bei 95 % bekannten Wörtern öffnet sich eine Geschichte. Jedes Wort im Text ist antippbar und erklärt sich selbst.`,
    },
    {
      eyebrow: `Viertens`,
      title: `Mitreden`,
      description: `In 23 Dialogen übernimmst du eine Rolle und wählst, was du sagst. 85 Stellen, an denen es auf dich ankommt.`,
    },
  ] as LearningStep[],
  featureSections: [
    {
      id: `ueben`,
      eyebrow: `Kujifunza · Üben`,
      title: `Vier Übungsarten statt Kartenraten`,
      lead: `Eine Runde mischt die Formate durch — jede Karte wird neu ausgewürfelt. Das ist anstrengender als Umdrehen und Nicken, und genau das ist der Punkt.`,
      points: [
        {
          title: `Karte, Tippen, Hören, Lückensatz`,
          description: `Abschaltbar unter Einstellungen › Übungsarten. „Tippen" ist auf 40 % der Runde gedeckelt, damit eine Runde nicht zur Tipparbeit wird.`,
        },
        {
          title: `Tippfehler zählen nicht als Fehler`,
          description: `Ein fehlendes Apostroph (ngombe für ng'ombe) oder zwei vertauschte Buchstaben werden erkannt und nur korrigiert. Kanntest du eine andere richtige Übersetzung? „Meine Antwort war auch richtig" wertet sie als gewusst.`,
        },
        {
          title: `Grammatik-Gym`,
          description: `Verbformen aus Bausteinen zusammensetzen und Ngeli-Kongruenz üben — mit Aufgaben aus deinem eigenen Wortschatz.`,
        },
      ],
      screenshot: `tippen`,
      caption: `Tippfehler-Toleranz: pwnai wird als pwani gewertet.`,
    },
    {
      id: `wiederholen`,
      eyebrow: `Kurudia · Wiederholen`,
      title: `Vier Antwortstufen — und die Karte weiß, wann sie wiederkommt`,
      lead: `Statt richtig oder falsch: Nochmal, Schwer, Gut, Einfach. Unter jeder Stufe steht, wann du die Karte wiedersiehst.`,
      points: [
        {
          title: `Zwei Lernmethoden, umschaltbar`,
          description: `Leitner mit fünf Boxen oder adaptiv nach FSRS, das die Abstände an jede einzelne Karte anpasst. Der Wechsel behält deinen Fortschritt — beide Zustände laufen immer mit.`,
        },
        {
          title: `Gemeistert heißt lange Abstände, nicht nie wieder`,
          description: `Box-5-Karten kommen nach 90 Tagen zurück. Und wenn genug Wörter über zwei Monate liegen, meldet sich von selbst der Langzeit-Check und sagt dir ehrlich, was noch sitzt.`,
        },
        {
          title: `Level, das Können zählt`,
          description: `Das Sprachlevel von A1.1 bis C2 zählt gefestigte Wörter: solche, die du nach mindestens einer Woche Pause noch konntest.`,
        },
      ],
      screenshot: `antwortstufen`,
      caption: `Nochmal · Schwer · Gut · Einfach — mit dem nächsten Abstand.`,
    },
    {
      id: `lesen`,
      eyebrow: `Hadithi · Geschichten`,
      title: `20 Geschichten, die auf dich warten`,
      lead: `Kurze Texte auf Swahili, zu jedem Wort ein Glossar — antippen genügt. Freigeschaltet wird, was du zu mindestens 95 % verstehst.`,
      points: [
        {
          title: `Die gesperrte Kachel nennt eine Zahl`,
          description: `„Noch 2 Wörter bis zur Freischaltung" — und ein Tipp öffnet die Kartenauswahl mit genau diesen Wörtern. Kein „irgendwann mehr lernen", sondern zwei Wörter bis zur nächsten Geschichte.`,
        },
        {
          title: `Zwei Stufen`,
          description: `Zehn Geschichten auf der ersten, zehn auf der zweiten Stufe — aufgebaut auf dem Wortschatz, den du schon hast.`,
        },
        {
          title: `Antippen statt nachschlagen`,
          description: `Jedes Wort im Text ist eine eigene Schaltfläche mit Übersetzung — und lässt sich von dort direkt als Lernkarte übernehmen.`,
        },
      ],
      screenshot: `geschichten`,
      caption: `Offen, fast offen, gesperrt — mit dem Weg zu den fehlenden Wörtern.`,
    },
    {
      id: `sprechen`,
      eyebrow: `Mazungumzo · Dialoge`,
      title: `23 Dialoge, in denen du antwortest`,
      lead: `Begrüßung, Markt, Restaurant, Taxi, Arzt, Bewerbung — als Chat zum Lesen und zum Mitspielen. Du übernimmst die Rolle, in der du im Leben stündest.`,
      points: [
        {
          title: `85 Entscheidungspunkte`,
          description: `An jedem Zug deiner Rolle wählst du, was du sagst. Die falschen Antworten sind plausibel falsch — falsche Zeit, falsche Person, falsche Klasse — und ein Satz sagt dir, woran es lag.`,
        },
        {
          title: `Echte Stimmen`,
          description: `Wörter, Beispielsätze, Dialoge und Geschichten sind mit echten Stimmen aufgenommen — keine Roboterstimme des Browsers, und offline verfügbar.`,
        },
        {
          title: `Auch hier: jedes Wort antippbar`,
          description: `Dieselbe Glossar-Funktion wie in den Geschichten. Und dieselbe 95-%-Schwelle entscheidet, welcher Dialog offen ist.`,
        },
      ],
      screenshot: `dialog`,
      caption: `„ya jioni" ist der Abendgruß — die Rückmeldung erklärt den Fehler.`,
    },
    {
      id: `wortschatz`,
      eyebrow: `Msamiati · Wortschatz`,
      title: `1.268 Wörter im Kern, sechs Pakete obendrauf`,
      lead: `Jede Vokabel bringt Wortart, Ngeli-Klasse und Beispielsätze mit. Durchsuchbar, filterbar, mit einem Klick als Lernkarte übernommen.`,
      points: [
        {
          title: `Themenpakete zum Zuschalten`,
          description: `Arbeit, Geld & Behörden, Umwelt, Politik, Gesundheit, Schule — 56 zusätzliche Wörter in sechs Paketen. Eingeschaltet stehen sie im Pool und machen die Inhalte sichtbar, die sie brauchen.`,
        },
        {
          title: `Gezieltes Kartenziehen`,
          description: `Anzahl per Slider, Bereich als Freitext oder Themen-Chip — die App findet passende, noch ungelernte Vokabeln.`,
        },
        {
          title: `Eigene Vokabeln`,
          description: `Ergänze eigene Wörter mit Wortart, Ngeli-Klasse und deinen eigenen Beispielsätzen.`,
        },
      ],
      screenshot: `lexikon`,
      caption: `Msamiati — durchsuchbar, nach Wortart und Ngeli filterbar.`,
    },
    {
      id: `dranbleiben`,
      eyebrow: `Kuendelea · Dranbleiben`,
      title: `Ein Wochenziel, das du selbst setzt`,
      lead: `Kein Gamification-Geschrei — ein Ring von Montag bis Sonntag, ein Tagesziel, das du wählst, und Meilensteine, die an Können hängen.`,
      points: [
        {
          title: `Streak mit Joker`,
          description: `Ein verpasster Tag verbraucht automatisch einen Joker statt deine Serie zu beenden. Nach längeren Pausen begrüßt dich eine freundliche Rückkehr-Runde.`,
        },
        {
          title: `17 Meilensteine`,
          description: `Erreicht, wenn du etwas kannst — nicht, wenn du oft genug da warst. „350 gefestigt", „Zehn Dialoge offen", „Fehlerfrei getippt".`,
        },
        {
          title: `Ziele nach deinem Maß`,
          description: `Tagesziel 5, 10 oder 20 Karten. Wochenziel 3 bis 7 Tage. Beides jederzeit umstellbar.`,
        },
      ],
      screenshot: `meilensteine`,
      caption: `12 von 17 — Meilensteine hängen an Können, nicht an Klicks.`,
    },
  ] as FeatureSection[],
  /** Sechs zuschaltbare Wortschatzpakete (public/vocab-packs/index.json). */
  packs: [
    { emoji: `💼`, title: `Arbeit & Bewerbung`, words: 17 },
    { emoji: `🏦`, title: `Geld & Behörden`, words: 11 },
    { emoji: `🌍`, title: `Umwelt & Landwirtschaft`, words: 13 },
    { emoji: `🗳️`, title: `Politik & Gesellschaft`, words: 11 },
    { emoji: `🩺`, title: `Gesundheit vertieft`, words: 2 },
    { emoji: `🎓`, title: `Schule & Bildung`, words: 2 },
  ],
  /** Galerie unter den Feature-Blöcken. */
  gallery: [
    { screenshot: `home`, label: `Start`, caption: `Fällige Karten, Streak, Wochenziel` },
    { screenshot: `karte`, label: `Lernkarte`, caption: `Vorne Swahili, tippen zum Umdrehen` },
    { screenshot: `geschichte`, label: `Geschichte`, caption: `Jedes Wort antippbar` },
    { screenshot: `dialog-lesen`, label: `Dialog`, caption: `Chat mit Übersetzung und Ton` },
    {
      screenshot: `bibliothek`,
      label: `Bibliothek`,
      caption: `Geschichten, Dialoge, Themenpakete`,
    },
    { screenshot: `ngeli`, label: `Ngeli`, caption: `Alle acht Nomenklassen im Detail` },
    { screenshot: `gym`, label: `Grammatik-Gym`, caption: `Verbformen aus Bausteinen` },
  ],
  howItWorks: [
    {
      n: `1`,
      title: `Vokabeln ziehen`,
      description: `Wähle ein Thema oder lass die App passende Karten aus dem Pool von 1.268 Vokabeln ziehen.`,
    },
    {
      n: `2`,
      title: `Täglich üben`,
      description: `Karte, Tippen, Hören, Lückensatz — vier Formate, vier Antwortstufen. Vizuri sana!`,
    },
    {
      n: `3`,
      title: `Lesen und mitreden`,
      description: `Ab 95 % bekannter Wörter öffnen sich Geschichten und Dialoge. Genau dafür lernst du.`,
    },
  ] as HowStep[],
  faq: [
    {
      q: `Ist die App wirklich kostenlos?`,
      a: `Ja. Swahili Pocket ist komplett kostenlos, werbefrei und ohne In-App-Käufe. Es gibt kein Premium, keine Testphase, keine versteckten Kosten.`,
    },
    {
      q: `Brauche ich Internet?`,
      a: `Nur einmal — beim ersten Laden. Danach funktioniert die App komplett offline, inklusive der Sprachaufnahmen. Als PWA installiert läuft sie wie eine native App auf deinem Gerät.`,
    },
    {
      q: `Was passiert mit meinen Daten?`,
      a: `Gar nichts. Alle Lerndaten (Karten, Fortschritt, XP, Meilensteine) liegen ausschließlich in der lokalen Browser-Datenbank deines Geräts. Kein Konto, kein Server, kein Tracking. Ein JSON-Backup kannst du jederzeit exportieren und auf einem anderen Gerät importieren.`,
    },
    {
      q: `Was unterscheidet die App von einer Karteikarten-App?`,
      a: `Die Karten sind Mittel, nicht Zweck. Was du lernst, schaltet Geschichten und Dialoge frei — ab 95 % bekannter Wörter. Dazu kommen vier Übungsarten statt bloßem Umdrehen und ein Grammatik-Gym für Verbformen und Ngeli-Kongruenz.`,
    },
    {
      q: `Woher kommen die Stimmen?`,
      a: `Aus vorproduzierten Aufnahmen, die mit der App ausgeliefert werden — nicht aus der Sprachausgabe des Browsers. Die spricht Swahili zu unzuverlässig aus, um darauf eine Hörübung zu bauen. Deshalb liegen die Aufnahmen als Dateien bei und funktionieren offline.`,
    },
    {
      q: `Was sind Themenpakete?`,
      a: `Sechs Wortschatzpakete — Arbeit, Geld & Behörden, Umwelt, Politik, Gesundheit, Schule — mit zusammen 56 Wörtern, die du einzeln zuschaltest. Eingeschaltet stehen ihre Wörter zur Auswahl und machen die Dialoge sichtbar, die sie brauchen. Der Kernwortschatz bleibt davon unberührt.`,
    },
    {
      q: `Muss ich Grammatik büffeln?`,
      a: `Nein. Die Ngeli-Referenz ist zum Nachschlagen da und in jede Karte integriert. Wer mag, übt im Grammatik-Gym Verbformen und Klassenkongruenz — mit Aufgaben aus dem eigenen Wortschatz.`,
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
  boxes: [
    `Wiederholung nach 1 Tag`,
    `Wiederholung nach 2 Tagen`,
    `Wiederholung nach 4 Tagen`,
    `Wiederholung nach 7 Tagen`,
    `Gemeistert — Wiederholung nach 90 Tagen`,
  ],
  navigation: [`Home`, `Lernen`, `Wörter`, `Bibliothek`, `Mehr`],
  privacyPoints: [
    `Kein Konto, keine Registrierung, kein Passwort`,
    `Kein Tracking in der App, keine Third-Party-Skripte`,
    `Sprachaufnahmen liegen lokal — auch Hören funktioniert offline`,
    `JSON-Backup zum Exportieren und auf ein anderes Gerät importieren`,
    `Open Source — Code auf GitHub einsehbar`,
  ],
};

export default swahiliPocket;
