export type MatchLogo = {
  id: number;
  url: string;
  relative_url?: string;
  width?: number;
  height?: number;
};

export type MatchTeam = {
  id: number;
  name: string;
  logo: MatchLogo | null;
  nationality?: string | null;
};

export type MatchSignup = {
  id: number;
  name: string;
  team: MatchTeam | null;
};

export type MatchGame = {
  title: string;
  acronym: string;
  logo: MatchLogo | null;
};

export type MatchCompetition = {
  id: number;
  name: string;
  url: string;
  relative_url: string;
  game: MatchGame;
};

export type Matchup = {
  id: number;
  type: string;
  bracket: string;
  home_score: number | null;
  away_score: number | null;
  walkover: boolean;
  cancelled: boolean;
  postponed: boolean;
  best_of: number;
  round_number: number;
  round_identifier_text: string;
  home_signup: MatchSignup | null;
  away_signup: MatchSignup | null;
  url: string;
  relative_url: string;
  start_time: string | null;
  finished_at: string | null;
  status: string | null;
  winning_side: "home" | "away" | null;
  competition: MatchCompetition;
  stream_count: number;
  spectate_url: string | null;
};

export const OUR_SIGNUP_IDS: ReadonlySet<number> = new Set([
  252436, // Bleikemyr Pistolklubb (Komplettligaen Våren 2026)
  250749, // BPK: League of Legends (Good Game-ligaen Høsten 2025 kvalik)
]);

export const OUR_TEAM_DISPLAY_NAME = "Bleikemyr Pistolklubb";

export const isOurSignup = (signup: MatchSignup | null | undefined): boolean =>
  signup != null && OUR_SIGNUP_IDS.has(signup.id);

export type NormalizedMatch = {
  match: Matchup;
  us: MatchSignup | null;
  opponent: MatchSignup | null;
  isHome: boolean;
  startTime: Date | null;
};

export const normalizeMatch = (match: Matchup): NormalizedMatch => {
  const isHome = isOurSignup(match.home_signup);
  const us = isHome ? match.home_signup : match.away_signup;
  const opponent = isHome ? match.away_signup : match.home_signup;
  const startTime = match.start_time ? new Date(match.start_time) : null;
  return { match, us, opponent, isHome, startTime };
};

export const upcomingMatches: Matchup[] = [
  {
    id: 256791,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 2,
    round_identifier_text: "Runde 2",
    home_signup: {
      id: 252596,
      name: "Oslo Døves Silent Power",
      team: {
        id: 196375,
        name: "Oslo Døves Silent Power",
        logo: {
          id: 315491,
          url: "https://i.bo3.no/image/315491/11046337-1034584219920195-4747532948438576199-n.jpg",
          relative_url:
            "/image/315491/11046337-1034584219920195-4747532948438576199-n.jpg",
          width: 906,
          height: 906,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256791",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256791",
    start_time: "2026-04-28T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256806,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 3,
    round_identifier_text: "Runde 3",
    home_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252417,
      name: "NTNUI Pink Poro Club",
      team: {
        id: 207909,
        name: "NTNUI Pink Poro Club",
        logo: {
          id: 326242,
          url: "https://i.bo3.no/image/326242/ntnui%20small.png",
          relative_url: "/image/326242/ntnui%20small.png",
          width: 512,
          height: 512,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256806",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256806",
    start_time: "2026-04-30T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256823,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 4,
    round_identifier_text: "Runde 4",
    home_signup: {
      id: 251826,
      name: "Boomers på riften (LoL)",
      team: {
        id: 210020,
        name: "Boomers på riften (LoL)",
        logo: {
          id: 343049,
          url: "https://i.bo3.no/image/343049/group.png",
          relative_url: "/image/343049/group.png",
          width: 512,
          height: 512,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256823",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256823",
    start_time: "2026-05-05T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256853,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 5,
    round_identifier_text: "Runde 5",
    home_signup: {
      id: 252396,
      name: "NTNUI GankiEZ - KHAN",
      team: {
        id: 209844,
        name: "NTNUI GankiEZ - KHAN",
        logo: {
          id: 326242,
          url: "https://i.bo3.no/image/326242/ntnui%20small.png",
          relative_url: "/image/326242/ntnui%20small.png",
          width: 512,
          height: 512,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256853",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256853",
    start_time: "2026-05-07T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256884,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 6,
    round_identifier_text: "Runde 6",
    home_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 251808,
      name: "Små Karer Gaming",
      team: {
        id: 196292,
        name: "Små Karer Gaming",
        logo: {
          id: 359557,
          url: "https://i.bo3.no/image/359557/bare_en_liten_kar2.jpg",
          relative_url: "/image/359557/bare_en_liten_kar2.jpg",
          width: 2637,
          height: 2397,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256884",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256884",
    start_time: "2026-05-12T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256906,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 7,
    round_identifier_text: "Runde 7",
    home_signup: {
      id: 252399,
      name: "BDG",
      team: {
        id: 207864,
        name: "BDG",
        logo: {
          id: 343049,
          url: "https://i.bo3.no/image/343049/group.png",
          relative_url: "/image/343049/group.png",
          width: 512,
          height: 512,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256906",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256906",
    start_time: "2026-05-19T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256930,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 8,
    round_identifier_text: "Runde 8",
    home_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252397,
      name: "Dyrehagen LoL",
      team: {
        id: 205033,
        name: "Dyrehagen LoL",
        logo: {
          id: 343049,
          url: "https://i.bo3.no/image/343049/group.png",
          relative_url: "/image/343049/group.png",
          width: 512,
          height: 512,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256930",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256930",
    start_time: "2026-05-26T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
  {
    id: 256950,
    type: "versus",
    bracket: "groups",
    home_score: null,
    away_score: null,
    walkover: false,
    cancelled: false,
    postponed: false,
    best_of: 3,
    round_number: 9,
    round_identifier_text: "Runde 9",
    home_signup: {
      id: 252436,
      name: "Bleikemyr Pistolklubb",
      team: {
        id: 209806,
        name: "Bleikemyr Pistolklubb",
        logo: {
          id: 389846,
          url: "https://i.bo3.no/image/389846/IMG_0377.png",
          relative_url: "/image/389846/IMG_0377.png",
          width: 1024,
          height: 1024,
        },
        nationality: "NO",
      },
    },
    away_signup: {
      id: 252430,
      name: "Gaudergutenj",
      team: {
        id: 205720,
        name: "Gaudergutenj",
        logo: {
          id: 319752,
          url: "https://i.bo3.no/image/319752/Gaudergutenj%20logo%20kreftforeningfarger.png",
          relative_url:
            "/image/319752/Gaudergutenj%20logo%20kreftforeningfarger.png",
          width: 1000,
          height: 1000,
        },
        nationality: "NO",
      },
    },
    url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256950",
    relative_url:
      "/turneringer/komplettligaen-league-of-legends-varen-2026/13836/kamp/256950",
    start_time: "2026-06-02T17:00:00.000000Z",
    finished_at: null,
    status: null,
    winning_side: null,
    competition: {
      id: 13836,
      name: "Komplettligaen: League of Legends - Våren 2026",
      url: "https://www.gamer.no/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      relative_url:
        "/turneringer/komplettligaen-league-of-legends-varen-2026/13836",
      game: {
        title: "League of Legends",
        acronym: "LoL",
        logo: {
          id: 375486,
          url: "https://i.bo3.no/image/375486/lol_2%20%281%29.png",
          relative_url: "/image/375486/lol_2%20%281%29.png",
          width: 512,
          height: 512,
        },
      },
    },
    stream_count: 0,
    spectate_url: null,
  },
];

export const getOurUpcomingMatches = (): NormalizedMatch[] =>
  upcomingMatches
    .filter(
      (match) =>
        (isOurSignup(match.home_signup) || isOurSignup(match.away_signup)) &&
        !match.cancelled &&
        !match.walkover &&
        match.start_time != null,
    )
    .map(normalizeMatch)
    .sort((a, b) => {
      const aTime = a.startTime?.getTime() ?? Number.POSITIVE_INFINITY;
      const bTime = b.startTime?.getTime() ?? Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });
