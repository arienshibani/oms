import type { RosterPlayer } from "./roster";

/**
 * Weekly quest UI: edit the two row arrays and bump the instants when a new
 * week starts. Rollover = when “after” quests go live; the footer deadline
 * updates with the active week.
 *
 * Rollover instant: 12:00 Europe/Oslo, 12 May 2026 (CEST = UTC+2 → 10:00Z).
 */
export const WEEKLY_QUEST_ROLLOVER_MS = Date.parse(
  "2026-05-12T10:00:00.000Z",
);

export const PREVIOUS_WEEK_DEADLINE_DISPLAY = "12. mai 2026, 12:00";
export const PREVIOUS_WEEK_DEADLINE_ISO = "2026-05-12T12:00:00+02:00";

export const CURRENT_WEEK_DEADLINE_DISPLAY = "19. mai 2026, 12:00";
export const CURRENT_WEEK_DEADLINE_ISO = "2026-05-19T12:00:00+02:00";

export type WeeklyQuestRow =
  | {
      player: RosterPlayer;
      variant: "deeplol";
      /** Shown inside <strong>, e.g. "Shyvana Jungle". */
      pick: string;
      completed: boolean;
    }
  | {
      player: RosterPlayer;
      variant: "tbd";
      completed: boolean;
    };

/** Quests and checkboxes shown until {@link WEEKLY_QUEST_ROLLOVER_MS}. */
export const weeklyQuestRowsBeforeRollover: WeeklyQuestRow[] = [
  {
    player: "BPK Balagurbiz",
    variant: "deeplol",
    pick: "Tryndamere Top",
    completed: false,
  },
  {
    player: "BPK SHLEEP",
    variant: "deeplol",
    pick: "Lee Sin Jungle",
    completed: true,
  },
  {
    player: "BPK Solopolocolololo",
    variant: "deeplol",
    pick: "Vladimir Mid",
    completed: true,
  },
  {
    player: "BPK Boobdude",
    variant: "deeplol",
    pick: "Brand APC",
    completed: true,
  },
  {
    player: "BPK DOGCAT",
    variant: "deeplol",
    pick: "Pyke Support",
    completed: true,
  },
  {
    player: "BPK Obese",
    variant: "deeplol",
    pick: "Tryndamere Top",
    completed: false,
  },
  {
    player: "BPK Rengwick",
    variant: "tbd",
    completed: false,
  },
];

/** Quests after rollover — all completion flags start false for the new week. */
export const weeklyQuestRowsAfterRollover: WeeklyQuestRow[] = [
  {
    player: "BPK Balagurbiz",
    variant: "deeplol",
    pick: "Anivia Top",
    completed: false,
  },
  {
    player: "BPK SHLEEP",
    variant: "deeplol",
    pick: "Shyvana Jungle",
    completed: false,
  },
  {
    player: "BPK Solopolocolololo",
    variant: "deeplol",
    pick: "Zed Mid",
    completed: false,
  },
  {
    player: "BPK Boobdude",
    variant: "deeplol",
    pick: "Smolder Bot",
    completed: false,
  },
  {
    player: "BPK DOGCAT",
    variant: "deeplol",
    pick: "Seraphine Support",
    completed: false,
  },
  {
    player: "BPK Obese",
    variant: "deeplol",
    pick: "Kayle Top",
    completed: false,
  },
  {
    player: "BPK Rengwick",
    variant: "deeplol",
    pick: "Olaf Top",
    completed: false,
  },
];

export const isPastWeeklyQuestRollover = (nowMs: number) =>
  nowMs >= WEEKLY_QUEST_ROLLOVER_MS;
