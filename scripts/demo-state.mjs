// Demo-Lernstand für die Screenshots der Website.
//
// Wird von capture-screenshots.mjs als String in die laufende App injiziert und
// schreibt direkt in die IndexedDB von idb-keyval (DB `keyval-store`, Store
// `keyval`) — dieselben Schlüssel, die die App selbst benutzt.
//
// Der Stand ist so gewählt, dass die Screens die Kernschleife zeigen:
// genug gefestigte Wörter, damit Geschichten und Dialoge offen sind, und
// zugleich eine gesperrte Geschichte, der nur noch zwei Wörter fehlen.
//
// Nichts davon landet im Repo der App — die Daten leben nur im Chrome-Profil
// unter .cache/, das capture-screenshots.mjs anlegt.

export const DEMO_STATE_SCRIPT = /* js */ `(async () => {
  const DAY = 86400000, now = Date.now();
  const isoDay = (ts) => { const d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };

  const [pool, storyIdx, dlgIdx] = await Promise.all([
    fetch('/vocab-pool.json').then(r => r.json()),
    fetch('/stories/index.json').then(r => r.json()),
    fetch('/dialogues/index.json').then(r => r.json()),
  ]);
  const poolByWord = new Map(pool.map(p => [p.swahili.trim().toLowerCase(), p]));

  // Bekannter Wortschatz = Lemmata der Inhalte, die offen sein sollen.
  const openStories = storyIdx.stories.filter(s => s.band === 1).slice(0, 8);
  const openDialogues = dlgIdx.dialogues.filter(d => !(d.requiresPacks || []).length).slice(0, 12);
  const known = new Set();
  for (const s of openStories) for (const l of s.lemmas) if (poolByWord.has(l)) known.add(l);
  for (const d of openDialogues) for (const l of d.lemmas) if (poolByWord.has(l)) known.add(l);

  // Karten in Arbeit: Wörter aus Band-2-Geschichten, noch in Box 1/2.
  const learning = new Set();
  for (const s of storyIdx.stories.filter(s => s.band === 2).slice(0, 3))
    for (const l of s.lemmas) if (poolByWord.has(l) && !known.has(l) && learning.size < 46) learning.add(l);

  const mkCard = (word, i, isKnown) => {
    const p = poolByWord.get(word);
    const box = isKnown ? [3,4,4,5,5][i % 5] : [1,1,2][i % 3];
    const created = now - (isKnown ? 40 + (i % 50) : 2 + (i % 6)) * DAY;
    const last = now - (isKnown ? 3 + (i % 20) : (i % 3)) * DAY;
    const dueOffset = i % 9 === 0 ? -0.4 : (isKnown ? 1 + (i % 30) : 1 + (i % 4));
    const due = now + dueOffset * DAY;
    return {
      id: crypto.randomUUID(),
      swahili: p.swahili, german: p.german, partOfSpeech: p.partOfSpeech,
      ...(p.nounClass ? { nounClass: p.nounClass } : {}),
      examples: p.examples || [],
      box, nextReview: due, leitnerDue: due,
      createdAt: created, updatedAt: last, lastReviewAt: last,
      ...(isKnown ? { maturedAt: now - (10 + (i % 30)) * DAY } : {}),
      fsrs: { stability: isKnown ? 9 + (i % 40) : 1 + (i % 3), difficulty: 4.5 + (i % 5) * 0.4,
              reps: isKnown ? 4 + (i % 8) : 1 + (i % 2), lapses: i % 7 === 0 ? 1 : 0,
              state: 'review', due },
    };
  };

  const vocab = [
    ...[...known].map((w, i) => mkCard(w, i, true)),
    ...[...learning].map((w, i) => mkCard(w, i, false)),
  ];

  // Eine Band-2-Geschichte auf die Zielgerade bringen: bis auf zwei Wörter alles bekannt.
  const target = storyIdx.stories.find(s => s.id === 'essen-2-01');
  if (target) {
    const knownNow = new Set(vocab.filter(c => c.maturedAt || c.box >= 3).map(c => c.swahili.toLowerCase()));
    const missing = [...new Set(target.lemmas.map(l => l.toLowerCase()))]
      .filter(l => !knownNow.has(l) && poolByWord.has(l));
    missing.slice(0, Math.max(0, missing.length - 2)).forEach((w, i) => {
      const due = now + (2 + (i % 25)) * DAY;
      const existing = vocab.find(c => c.swahili.toLowerCase() === w);
      if (existing) {
        existing.box = 4; existing.maturedAt = now - 12 * DAY; existing.fsrs.stability = 21;
        existing.nextReview = due; existing.leitnerDue = due; existing.fsrs.due = due;
        return;
      }
      const p = poolByWord.get(w);
      vocab.push({ id: crypto.randomUUID(), swahili: p.swahili, german: p.german,
        partOfSpeech: p.partOfSpeech, ...(p.nounClass ? { nounClass: p.nounClass } : {}),
        examples: p.examples || [], box: 4, nextReview: due, leitnerDue: due,
        createdAt: now - 45 * DAY, updatedAt: now - 5 * DAY, lastReviewAt: now - 5 * DAY,
        maturedAt: now - 14 * DAY,
        fsrs: { stability: 24, difficulty: 5, reps: 6, lapses: 0, state: 'review', due } });
    });
  }

  // Review-Log: zehn Tage, vier Übungsarten gemischt. Die Grammatik-Gym-Einträge
  // stehen im selben Log, zählen aber nicht als Karte (countReviewsOnDay filtert).
  const modes = ['flip','typed','audio','cloze'];
  const log = [];
  for (let d = 9; d >= 0; d--) {
    const count = d === 0 ? 7 : 6 + (d % 5);
    for (let k = 0; k < count; k++) {
      const card = vocab[(d * 13 + k * 7) % vocab.length];
      const ts = now - d * DAY - k * 240000;
      log.push({ id: 'r' + d + '-' + k, cardId: card.id, ts, grade: [3,4,3,2,3,4][k % 6],
        mode: modes[(d + k) % 4], elapsedDays: 1 + ((d + k) % 12), scheduler: 'fsrs',
        newBox: card.box, newStability: 12 + k, newDue: ts + (5 + k) * DAY });
    }
  }
  for (let k = 0; k < 14; k++)
    log.push({ id: 'g' + k, cardId: vocab[k].id, ts: now - (k % 5) * DAY - 3600000, grade: 3,
      mode: k % 2 ? 'morph-verb' : 'morph-ngeli', elapsedDays: 0, scheduler: 'fsrs',
      newBox: 3, newDue: now + DAY });

  const todayIdx = (new Date().getDay() + 6) % 7;
  const week = Array.from({ length: 7 }, (_, i) => isoDay(now - todayIdx * DAY + i * DAY));
  const entries = {
    'vocab:list': vocab,
    'vocab:seeded': true,
    'data:version': 2,
    'stats:current': { streak: 12, lastReviewDate: isoDay(now), totalReviewed: 684, xp: 2870,
      weekDays: week.slice(0, todayIdx + 1).filter((_, i) => i !== 2), freezes: 1,
      totalDaysLearned: 34, lastFreezeEarned: isoDay(now - 5 * DAY) },
    'log:reviews': log,
    'settings:app': { version: 1, scheduler: 'fsrs', dailyGoalCards: 10, weeklyGoalDays: 5, enabledModes: {} },
    'milestones:achieved': Object.fromEntries([['first-session',31],['seven-days',24],
      ['first-week-goal',20],['matured-50',18],['matured-150',9],['typed-perfect',12],
      ['audio-session',15],['verb-100',6],['first-story',11],['dialogue-played',8],
      ['retention-kept',4],['dialogues-unlocked-10',2]].map(([id, d]) => [id, now - d * DAY])),
    'stories:read': Object.fromEntries(openStories.slice(0, 5).map((s, i) => [s.id, now - (i + 1) * 2 * DAY])),
    'dialogues:played': Object.fromEntries(openDialogues.slice(0, 6).map((d, i) =>
      [d.id, { ts: now - (i + 1) * DAY, firstTry: i < 4 ? 4 : 3, total: 4 }])),
    'packs:active': [],
    'retention:checks': [{ ts: now - 4 * DAY, correct: 9, total: 10 }],
    'stats:trainer': { verbTasks: 124, ngeliTasks: 86, bestStreakRun: 17,
      ngeliCorrectByClass: { 'M-Wa': 22, 'M-Mi': 14, 'Ki-Vi': 18, 'N': 16, 'Ji-Ma': 9, 'U': 7 } },
  };

  const db = await new Promise((res, rej) => {
    const req = indexedDB.open('keyval-store');
    req.onupgradeneeded = () => req.result.createObjectStore('keyval');
    req.onsuccess = () => res(req.result); req.onerror = () => rej(req.error);
  });
  await new Promise((res, rej) => {
    const tx = db.transaction('keyval', 'readwrite');
    for (const [k, v] of Object.entries(entries)) tx.objectStore('keyval').put(v, k);
    tx.oncomplete = res; tx.onerror = () => rej(tx.error);
  });
  return { cards: vocab.length };
})()`;

/** Nur die Einstellungen ändern — für Shots, die einen bestimmten Übungsmodus brauchen. */
export function settingsScript(enabledModes) {
  return /* js */ `(async () => {
    const db = await new Promise((res, rej) => { const q = indexedDB.open('keyval-store'); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
    await new Promise((res, rej) => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').put({ version: 1, scheduler: 'fsrs', dailyGoalCards: 10, weeklyGoalDays: 5, enabledModes: ${JSON.stringify(enabledModes)} }, 'settings:app');
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
    return 'ok';
  })()`;
}
