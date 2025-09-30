export type Fixture = {
  fixture_id: number;
  country_logo: string;
  country: string;
  league_id: number;
  league: string;
  league_logo: string;
  season_id: number;
  season_name: string;
  home_team_id: number;
  home_team: string;
  home_team_logo: string;
  away_team_id: number;
  away_team: string;
  away_team_logo: string;
  grp: string | null;
  round_stage: string;
  goals_home: number | null;
  goals_away: number | null;
  aggregate: any;
  state: string;
  fixture_utc_timestamp: string;
  home_red_cards: number | null;
  away_red_cards: number | null;
  notif_on: boolean | null;
};

export type GroupedByLeague = {
  league_id: number;
  league: string;
  league_logo: string;
  country: string;
  country_logo: string;
  matches: Fixture[];
};


export interface VersusRowTeam {
  id?: number;
  name: string;
  logo: string;
  score: number;
  meta?: any;
}

export interface VersusRowProp {
  aggregate?: string;
  team1: VersusRowTeam;
  team2: VersusRowTeam;
  tag?: string;
  tagFull?: string;
  notification?: boolean;
  mode?: "score" | "schedule" | "awaiting";
  time?: string | null;
  matchId?: string;
  awaiting?: string;
  team1RedCards?: number;
  team2RedCards?: number;
  starting_at?: string;
  state?: string;
  pen_score?: number;
}