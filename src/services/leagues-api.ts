import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";
import { supabase } from "@/supabase/supabaseClient";
import { LeaguesResponse, Seasion, TeamStanding } from "@/types/league";

const leaguesUrl = "v3/football/leagues";

export async function getTopCompetitions(): Promise<any> {
  const { data, error } = await supabase.rpc("homepage_top_comps");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}



export async function getHomeFeaturedMatches(): Promise<any> {
  const { data, error } = await supabase.rpc("homepage_featured_matches");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getHomeLiveMatches(): Promise<any> {
  const { data, error } = await supabase.rpc("homepage_live_matches");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueMatches(params?: object): Promise<any> {
  const { data, error } = await supabase.rpc("league_fixtures_timeline", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueMatchesPageNumber(
  params?: object
): Promise<any> {
  const { data, error } = await supabase.rpc(
    "league_fixtures_page_number",
    params
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getLeagueRoundFixtures(params?: object): Promise<any> {
  const { data, error } = await supabase.rpc(
    "league_round_fixtures",
    params
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStandingsBySeasonOrLeague(
  seasonId?: string,
  leagueId?: string,
  type?: string,
  matchWeek?: string
): Promise<TeamStanding[]> {
  const func =
    type === "overall"
      ? "league_overall_standings"
      : type === "home"
      ? "league_home_standings"
      : "league_away_standings";
  const params = {
    input_season_id: seasonId ? Number(seasonId) : null,
    input_round: matchWeek
  };

  if (!seasonId) {
    throw new Error("seasonId or leagueId is required");
  }

  const { data, error } = await supabase.rpc(func, params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueOverViewAwards(
  leagueId: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("league_overview_awards", {
    input_season_id: seasonId ? Number(seasonId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// league statistics
export async function getLeagueStatisticsPlayers(
  seasonId?: string | null,
  teamId?: string | null
): Promise<any> {
  const { data, error } = await supabase.rpc("league_player_statistics", {
    input_season_id: seasonId ? Number(seasonId) : null,
    input_team_id: teamId ? Number(teamId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueStatisticsTeams(
  seasonId?: string,
  leagueId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("league_statistics_teams", {
    input_season_id: seasonId ? Number(seasonId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueStatisticsSeasons(
  leagueId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("league_statistics_seasons", {
    input_league_id: leagueId ? Number(leagueId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueTransfers(
  leagueId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("league_transfers", {
    input_season_id: seasonId ? Number(seasonId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
// [search]
export async function getSearchResult(query: string): Promise<any> {
  const { data, error } = await supabase.rpc("search_bar", {
    search_term: query,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUpcomingMatch(params: any): Promise<any> {
  const { data, error } = await supabase.rpc("upcoming_matches", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueTotsRounds(params: any): Promise<any> {
  const { data, error } = await supabase.rpc("league_tots_rounds", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function getLeagueTots(params: any): Promise<any> {
  const { data, error } = await supabase.rpc("league_tots", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTeamTots(params: any): Promise<any> {
  const { data, error } = await supabase.rpc("team_tots", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueTotsCoach(params: any): Promise<any> {
  const { data, error } = await supabase.rpc("league_tots_coach", params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLeagueStandingsDropdown(params: any): Promise<any> {
  const { data, error } = await supabase.rpc(
    "league_standings_round_dropdown",
    params
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getLeagueKnockouts(params: any): Promise<any> {
  const { data, error } = await supabase.rpc(
    "league_knockout",
    params
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// [previous apis]

export async function getLeagueById(
  id: string,
  query?: object
): Promise<LeaguesResponse> {
  const queryStr = query ? toQueryString(query) : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/${id}?${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLeaguesByCountryId(
  countryId: string
): Promise<LeaguesResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/countries/${countryId}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getLeaguesBySearch(
  name: string
): Promise<LeaguesResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${leaguesUrl}/search/${name}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
