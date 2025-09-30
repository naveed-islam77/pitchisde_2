export interface LeaguesResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}

export interface Seasion {
  league_id: number;
  season_id: number;
  season_name: string;
}

export interface Standings {
  id: string;
  name: string;
  country: string;
  logo: string;
  type: string;
  seasons?: Seasion[];
}


export type TeamFormResult = "W" | "D" | "L" | "";

export interface TeamStanding {
  id: number;
  team_id: number;
  team_name: string;
  team_logo: string;
  league_id: number;
  league_logo: string;
  season_id: number;
  season_name: string;
  grp: string | null;
  round: string;
  type: "Overall" | "Home" | "Away";
  position: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals: string;
  goal_diff: string; 
  points: number;
  form: TeamFormResult[];
  form_fixtures: number[];
  form_results: string[];
  next_team_id: number | null;
  next_team_logo: string | null;
  standing_rule: string | null;
}



export interface TeamMatch {
  matchId: string;
  rank: number;
  points: number;
  image: string;
  name: string;
}

export interface Season {
  matches: TeamMatch[];
}

export type SeasonalHistory = {
  [season: string]: Season;
};