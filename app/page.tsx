import Galaxy from "@/components/Galaxy";
import UpcomingMatches from "@/components/UpcomingMatches";

type PointRule = {
  action: string;
  points: number;
};

type ScoreRow = {
  player: string;
  score: number;
};

type QuestRow = {
  player: string;
  quest: React.ReactNode;
  completed: boolean;
};

type HistoryAward = {
  player: string;
  points: number;
};

type HistoryEntry = {
  id: string;
  timestamp: string;
  displayTime: string;
  reason: React.ReactNode;
  awards: HistoryAward[];
};

const roster: string[] = [
  "BPK Balagurbiz",
  "BPK SHLEEP",
  "BPK Solopolocolololo",
  "BPK Boobdude",
  "BPK DOGCAT",
];

const pointRules: PointRule[] = [
  { action: "Deltagelse i Match", points: 20 },
  { action: "Deltagelse i Trening", points: 10 },
  { action: "Vær Cracked*", points: 5 },
  { action: "Weekly Quest", points: 25 },
];

const sortedPointRules: PointRule[] = [...pointRules].sort(
  (a, b) => b.points - a.points || a.action.localeCompare(b.action),
);

const pointRulesDescription =
  "Å være cracked betyr å få 50+ i Deeplol Score. Gjelder kun turneringsmatcher: +5 OMS-poeng for hver game hvor du oppnår 50+ i Deeplol Score. Turneringsmatcher spilles i Bo3, så én match kan gi opptil +15 poeng (3 games × 5 poeng).";

const history: HistoryEntry[] = [
    {
    id: "2026-04-24-weekly-q",
    timestamp: "2026-04-21T19:30",
    displayTime: "21. april 2026, 19:30",
    reason: "Fullførte weekly OMS.",
    awards: [{ player: "BPK SHLEEP", points: 25 }],
  },
  {
    id: "2026-04-21-tournament-participation",
    timestamp: "2026-04-21T19:30",
    displayTime: "21. april 2026, 19:30",
    reason: "Deltagelse i turneringsmatch mot TBD",
    awards: roster.map((player) => ({ player, points: 20 })),
  },
  {
    id: "2026-04-21-game2-cracked",
    timestamp: "2026-04-21T20:30",
    displayTime: "21. april 2026, ~20:30",
    reason: (
      <>
        Var cracked i{" "}
        <a
          href="https://www.deeplol.gg/summoner/euw/BPK%20SHLEEP-1337/matches/EUW1_7828447684"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 hover:text-zinc-100"
        >
          Game 2
        </a>{" "}
         mot TBD - 50+ Deeplol Score.
      </>
    ),
    awards: [
      { player: "BPK SHLEEP", points: 5 },
      { player: "BPK Boobdude", points: 5 },
      { player: "BPK DOGCAT", points: 5 },
      { player: "BPK Balagurbiz", points: 5 },
    ],
  },
];

const sortedHistory: HistoryEntry[] = [...history].sort((a, b) =>
  b.timestamp.localeCompare(a.timestamp),
);

const sortedScoreTable: ScoreRow[] = roster
  .map((player) => ({
    player,
    score: history.reduce(
      (sum, entry) =>
        sum +
        entry.awards
          .filter((award) => award.player === player)
          .reduce((acc, award) => acc + award.points, 0),
      0,
    ),
  }))
  .sort(
    (a, b) => b.score - a.score || a.player.localeCompare(b.player),
  );

const questTable: QuestRow[] = [
  {
    player: "BPK Balagurbiz",
    quest: (
      <>
        5 victories totalt med <strong>Vayne Top</strong> i Flex / Solo queue
      </>
    ),
    completed: false,
  },
  {
    player: "BPK SHLEEP",
    quest: (
      <>
        5 victories totalt med <strong>Sejuani Jungle</strong> i Flex / Solo
        queue
      </>
    ),
    completed: true,
  },
  {
    player: "BPK Solopolocolololo",
    quest: (
      <>
        5 victories totalt med <strong>Ahri Mid</strong> i Flex / Solo queue
      </>
    ),
    completed: false,
  },
  {
    player: "BPK Boobdude",
    quest: (
      <>
        5 victories totalt med <strong>Kalista ADC</strong> i Flex / Solo queue
      </>
    ),
    completed: false,
  },
  {
    player: "BPK DOGCAT",
    quest: (
      <>
        5 victories totalt med <strong>Renata Glasc</strong> i Flex / Solo
        queue
      </>
    ),
    completed: false,
  },
];

const tableWrapperClass =
  "overflow-x-auto rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm";
const thClass = "px-4 py-2 font-medium";
const tdClass = "px-4 py-2";

const Home = () => {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col bg-black text-zinc-100">
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.1}
          saturation={0}
          hueShift={140}
          twinkleIntensity={1}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={2}
          speed={1}
        />
      </div>

      <main className="pointer-events-auto relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16 sm:px-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            🖥️ On My Screen
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            Oversikt over OMS-poeng, lagtabell og ukens quest.
          </p>
        </header>

        <UpcomingMatches />

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Tabell</h2>
          <div className={tableWrapperClass}>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-white/5 text-left">
                <tr>
                  <th className={`${thClass} w-12 text-right`}>#</th>
                  <th className={thClass}>Spiller</th>
                  <th className={`${thClass} w-24 text-right`}>Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedScoreTable.map((row, index) => (
                  <tr key={row.player} className="border-t border-white/10">
                    <td
                      className={`${tdClass} text-right font-mono text-zinc-400`}
                    >
                      {index + 1}
                    </td>
                    <td className={tdClass}>{row.player}</td>
                    <td className={`${tdClass} text-right font-mono`}>
                      {row.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Hvordan får OMS points?</h2>
          <div className={tableWrapperClass}>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-white/5 text-left">
                <tr>
                  <th className={thClass}>Handling</th>
                  <th className={`${thClass} w-24 text-right`}>Poeng</th>
                </tr>
              </thead>
              <tbody>
                {sortedPointRules.map((rule) => (
                  <tr key={rule.action} className="border-t border-white/10">
                    <td className={tdClass}>{rule.action}</td>
                    <td className={`${tdClass} text-right font-mono`}>
                      {rule.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <section className="flex flex-col gap-3">
 
            <p className="text-sm text-zinc-400">* {pointRulesDescription}</p>
          </section>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">📅 Weekly</h2>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-zinc-400">
                Spillere kan få 25 OMS-poeng hvis de fullfører et oppdrag i løpet av uken. Oppdragene oppdateres hver uke. Kun rangerte kamper (Flex- eller Solo-kø) på OP.gg-profilen din, spilt innenfor tidsrammen, teller mot oppdraget.
              </p>
            </div>
          </div>

          <div className={tableWrapperClass}>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-white/5 text-left">
                <tr>
                  <th className={`${thClass} w-56`}>Spiller</th>
                  <th className={thClass}>Quest</th>
                  <th className={`${thClass} w-24 text-center`}>Fullført</th>
                </tr>
              </thead>
              <tbody>
                {questTable.map((row) => (
                  <tr key={row.player} className="border-t border-white/10">
                    <td className={`${tdClass} align-top`}>{row.player}</td>
                    <td className={`${tdClass} align-top text-zinc-200`}>
                      {row.quest}
                    </td>
                    <td className={`${tdClass} align-top text-center`}>
                      <span
                        role="img"
                        aria-label={
                          row.completed
                            ? `${row.player} har fullført oppdraget`
                            : `${row.player} har ikke fullført oppdraget`
                        }
                        className={`pointer-events-none inline-flex h-5 w-5 select-none items-center justify-center rounded border text-xs font-bold ${
                          row.completed
                            ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-300"
                            : "border-white/20 bg-white/5 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-4">
        <p className="text-sm text-zinc-400">
              Weekly On-My-Screen Quest Deadline:{" "}
              <time
                dateTime="2026-04-28T12:00"
                className="font-mono text-zinc-200"
              >
                28. april 2026, 12:00
              </time>
            </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">📜 Historikk</h2>
            <p className="text-sm text-zinc-400">
              Revisjonsspor over alle OMS-poeng. Mest nylige først.
            </p>
          </div>

          <ol className="flex flex-col gap-3">
            {sortedHistory.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <time
                      dateTime={entry.timestamp}
                      className="font-mono text-xs text-zinc-400"
                    >
                      {entry.displayTime}
                    </time>
                    <span className="font-mono text-xs text-zinc-500">
                      {entry.awards.reduce(
                        (sum, award) => sum + award.points,
                        0,
                      )}{" "}
                      poeng utdelt
                    </span>
                  </div>
                  <p className="text-sm text-zinc-200">{entry.reason}</p>
                  <ul className="flex flex-wrap gap-2">
                    {entry.awards.map((award) => (
                      <li
                        key={`${entry.id}-${award.player}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                      >
                        <strong className="font-semibold text-zinc-100">
                          {award.player}
                        </strong>
                        <span className="font-mono text-emerald-400">
                          +{award.points}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
};

export default Home;
