"use client";

import { useEffect, useState } from "react";
import {
  CURRENT_WEEK_DEADLINE_DISPLAY,
  CURRENT_WEEK_DEADLINE_ISO,
  PREVIOUS_WEEK_DEADLINE_DISPLAY,
  PREVIOUS_WEEK_DEADLINE_ISO,
  isPastWeeklyQuestRollover,
  weeklyQuestRowsAfterRollover,
  weeklyQuestRowsBeforeRollover,
  type WeeklyQuestRow,
} from "@/lib/weeklyQuests";

const tableWrapperClass =
  "overflow-x-auto rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm";
const thClass = "px-4 py-2 font-medium";
const tdClass = "px-4 py-2";

const useNowMs = () => {
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    const id = globalThis.setInterval(() => setNowMs(Date.now()), 1000);
    return () => globalThis.clearInterval(id);
  }, []);
  return nowMs;
};

const WeeklyQuestSkeleton = () => (
  <section className="flex flex-col gap-4 animate-pulse" aria-busy="true">
    <div className="h-7 w-40 rounded bg-white/10" />
    <div className="h-24 max-w-2xl rounded bg-white/5" />
    <div className="h-64 w-full rounded-lg bg-white/5" />
    <div className="h-5 w-72 rounded bg-white/5" />
  </section>
);

const QuestCell = ({
  row,
  afterRollover,
}: {
  row: WeeklyQuestRow;
  afterRollover: boolean;
}) => {
  if (row.variant === "tbd") {
    return <>TBD</>;
  }
  if (afterRollover) {
    return (
      <>
        1 game med 75+ i deeplol score på <strong>{row.pick}</strong> i Rangert
        spill
      </>
    );
  }
  return (
    <>
      3 games med +50 i deeplol score på <strong>{row.pick}</strong> i Rangert
      spill
    </>
  );
};

const WeeklyQuestSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const nowMs = useNowMs();
  const afterRollover = isPastWeeklyQuestRollover(nowMs);

  if (!mounted) {
    return <WeeklyQuestSkeleton />;
  }

  const rows = afterRollover
    ? weeklyQuestRowsAfterRollover
    : weeklyQuestRowsBeforeRollover;
  const deadlineDisplay = afterRollover
    ? CURRENT_WEEK_DEADLINE_DISPLAY
    : PREVIOUS_WEEK_DEADLINE_DISPLAY;
  const deadlineIso = afterRollover
    ? CURRENT_WEEK_DEADLINE_ISO
    : PREVIOUS_WEEK_DEADLINE_ISO;

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">📅 Weekly</h2>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-400">
              Spillere kan få 25 OMS-poeng hvis de fullfører et oppdrag i løpet av
              uken. Oppdragene oppdateres hver uke. Kun rangerte kamper (Flex-
              eller Solo-kø) på OP.gg-profilen din, spilt innenfor tidsrammen,
              teller mot oppdraget.
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
              {rows.map((row) => (
                <tr key={row.player} className="border-t border-white/10">
                  <td className={`${tdClass} align-top`}>{row.player}</td>
                  <td className={`${tdClass} align-top text-zinc-200`}>
                    <QuestCell row={row} afterRollover={afterRollover} />
                  </td>
                  <td className={`${tdClass} align-top text-center`}>
                    <span
                      role="img"
                      aria-label={
                        row.variant !== "tbd" && row.completed
                          ? `${row.player} har fullført oppdraget`
                          : `${row.player} har ikke fullført oppdraget`
                      }
                      className={`pointer-events-none inline-flex h-5 w-5 select-none items-center justify-center rounded border text-xs font-bold ${
                        row.variant !== "tbd" && row.completed
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
          <time dateTime={deadlineIso} className="font-mono text-zinc-200">
            {deadlineDisplay}
          </time>
        </p>
      </section>
    </>
  );
};

export default WeeklyQuestSection;
