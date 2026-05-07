"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  getOurUpcomingMatches,
  OUR_TEAM_DISPLAY_NAME,
  type MatchSignup,
  type NormalizedMatch,
} from "@/lib/matches";

const dateFormatter = new Intl.DateTimeFormat("nb-NO", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Oslo",
});

const formatDate = (date: Date | null): string =>
  date ? dateFormatter.format(date) : "TBD";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

const diffParts = (target: Date, now: number): Parts => {
  const totalMs = target.getTime() - now;
  const clamped = Math.max(totalMs, 0);
  const seconds = Math.floor(clamped / 1000) % 60;
  const minutes = Math.floor(clamped / (1000 * 60)) % 60;
  const hours = Math.floor(clamped / (1000 * 60 * 60)) % 24;
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, totalMs };
};

const pad = (n: number): string => n.toString().padStart(2, "0");

type TeamBadgeProps = {
  signup: MatchSignup | null;
  align: "left" | "right";
  highlight?: boolean;
};

const TeamBadge = ({ signup, align, highlight = false }: TeamBadgeProps) => {
  const logoUrl = signup?.team?.logo?.url;
  const name = signup?.name ?? "TBD";
  const isRight = align === "right";
  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-3 ${
        isRight ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border ${
          highlight
            ? "border-emerald-400/60 bg-emerald-500/10"
            : "border-white/10 bg-white/5"
        }`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={48}
            height={48}
            className="h-full w-full object-contain"
            unoptimized
          />
        ) : (
          <span className="font-mono text-xs text-zinc-400">?</span>
        )}
      </div>
      <div className="min-w-0">
        <p
          className={`truncate text-sm font-semibold ${
            highlight ? "text-emerald-300" : "text-zinc-100"
          }`}
          title={name}
        >
          {name}
        </p>
        {signup?.team?.nationality ? (
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {signup.team.nationality}
          </p>
        ) : null}
      </div>
    </div>
  );
};

type CountdownProps = {
  target: Date;
  now: number;
};

const Countdown = ({ target, now }: CountdownProps) => {
  const parts = diffParts(target, now);
  if (parts.totalMs <= 0) {
    return (
      <p className="font-mono text-2xl font-semibold text-emerald-300">
        LIVE / venter på start
      </p>
    );
  }

  const cells: Array<{ label: string; value: string }> = [
    { label: "dager", value: pad(parts.days) },
    { label: "timer", value: pad(parts.hours) },
    { label: "min", value: pad(parts.minutes) },
    { label: "sek", value: pad(parts.seconds) },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex flex-col items-center rounded-md border border-white/10 bg-black/50 py-2"
        >
          <span className="font-mono text-2xl font-semibold text-zinc-100 tabular-nums sm:text-3xl">
            {cell.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
};

type MatchRowProps = {
  entry: NormalizedMatch;
};

const MatchRow = ({ entry }: MatchRowProps) => {
  const { match, us, opponent, isHome, startTime } = entry;
  return (
    <li className="rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <span className="font-mono uppercase tracking-wider">
            {match.round_identifier_text} · Bo{match.best_of}
          </span>
          <time
            dateTime={match.start_time ?? undefined}
            className="font-mono text-zinc-300"
          >
            {formatDate(startTime)}
          </time>
        </div>
        <div className="flex items-center gap-3">
          <TeamBadge
            signup={isHome ? us : opponent}
            align="left"
            highlight={isHome}
          />
          <span className="font-mono text-xs text-zinc-500">vs</span>
          <TeamBadge
            signup={isHome ? opponent : us}
            align="right"
            highlight={!isHome}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
          <span className="truncate" title={match.competition.name}>
            {match.competition.name}
          </span>
          <a
            href={match.url}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-zinc-200"
          >
            gamer.no ↗
          </a>
        </div>
      </div>
    </li>
  );
};

const UpcomingMatches = () => {
  const allMatches = useMemo(() => getOurUpcomingMatches(), []);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Until the client clock is available, render the same data the server
  // prerendered to keep hydration consistent. Once `now` is set, drop any
  // match whose start time has already passed.
  const futureMatches =
    now == null
      ? allMatches
      : allMatches.filter(
          (m) => m.startTime != null && m.startTime.getTime() > now,
        );

  if (futureMatches.length === 0) {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">🗓️ Kommende Matcher</h2>
        <p className="text-sm text-zinc-400">
          Ingen planlagte matcher for {OUR_TEAM_DISPLAY_NAME} akkurat nå.
        </p>
      </section>
    );
  }

  const nextMatch = futureMatches[0];
  const rest = futureMatches.slice(1);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">🗓️ Kommende Matcher</h2>
        <p className="text-sm text-zinc-400">
          Neste kamp for {OUR_TEAM_DISPLAY_NAME} – live nedtelling.
        </p>
      </div>

      <div className="rounded-xl border border-emerald-400/30 bg-linear-to-br from-emerald-500/10 via-black/60 to-black/40 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-300/80">
                Neste match
              </span>
              <span className="text-sm text-zinc-300">
                {nextMatch.match.round_identifier_text} ·{" "}
                {nextMatch.match.competition.game.title} · Bo
                {nextMatch.match.best_of}
              </span>
            </div>
            <time
              dateTime={nextMatch.match.start_time ?? undefined}
              className="font-mono text-sm text-zinc-200"
            >
              {formatDate(nextMatch.startTime)}
            </time>
          </div>

          <div className="flex items-center gap-3">
            <TeamBadge
              signup={nextMatch.isHome ? nextMatch.us : nextMatch.opponent}
              align="left"
              highlight={nextMatch.isHome}
            />
            <span className="font-mono text-xs text-zinc-500">vs</span>
            <TeamBadge
              signup={nextMatch.isHome ? nextMatch.opponent : nextMatch.us}
              align="right"
              highlight={!nextMatch.isHome}
            />
          </div>

          {nextMatch.startTime ? (
            now == null ? (
              <div
                aria-hidden
                className="h-[74px] rounded-md border border-white/5 bg-white/5"
              />
            ) : (
              <Countdown target={nextMatch.startTime} now={now} />
            )
          ) : (
            <p className="text-sm text-zinc-400">Starttid ikke bekreftet.</p>
          )}

          <a
            href={nextMatch.match.url}
            target="_blank"
            rel="noreferrer noopener"
            className="self-start text-xs text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
          >
            Se kampen på gamer.no ↗
          </a>
        </div>
      </div>

      {rest.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-zinc-300">
            Resten av kalenderen
          </h3>
          <ol className="flex flex-col gap-3">
            {rest.map((entry) => (
              <MatchRow key={entry.match.id} entry={entry} />
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
};

export default UpcomingMatches;
