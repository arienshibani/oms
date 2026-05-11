export const roster = [
  "BPK Balagurbiz",
  "BPK SHLEEP",
  "BPK Solopolocolololo",
  "BPK Boobdude",
  "BPK DOGCAT",
  "BPK Obese",
  "BPK Rengwick",
] as const;

export type RosterPlayer = (typeof roster)[number];
