import { supabase } from "@/supabase/supabaseClient";
import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const teamsUrl = "v3/football/teams";

interface TeamsResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
  latest?: object;
}

export async function getTeamFixtures(
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_fixtures_landing", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamFixturesTimeLine(
  teamId?: string,
  seasonId?: string,
  pageNumber?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_fixtures_timeline", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null,
    input_page: pageNumber
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}



export async function getTeamFixturesPageNumber(
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_fixtures_page_number", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function getTeamFixturesRounds(
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_round_fixtures", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamFixturesNext(
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_fixtures_next", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamFixturesPrevious(
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("latest_matches", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId ? Number(seasonId) : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTeamBanner(
  teamId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_banner", {
    input_team_id: teamId ? Number(teamId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamHistory  (
  teamId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_history", {
    input_team_id: teamId ? Number(teamId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTeamCupHistory(
  teamId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_cup_history", {
    input_team_id: teamId ? Number(teamId) : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamMiniStandings  (
  teamId?: string,
  seasonName?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_short_standings", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_name: seasonName
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamLatestMatches  (
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("latest_matches", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamStandings (
  teamId?: string,
  seasonId?: string,
  type?: string,
): Promise<any> {
  const func =  type === "overall" ? "team_overall_standings" : type === "home" ? "team_home_standings" : "team_away_standings";
  const params = {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_name: seasonId,
  }


  const { data, error } = await supabase.rpc(func, params);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTeamSquad (
  teamId?: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("team_squad", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_id: seasonId
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeamTransfers (
  teamId?: string,
  seasonId?: string
): Promise<any> {

  console.log("teamId", teamId);
  console.log("seasonId", seasonId);
  const { data, error } = await supabase.rpc("team_transfers", {
    input_team_id: teamId ? Number(teamId) : null,
    input_season_name: seasonId ? seasonId : null
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
// [previous api's]

export async function getTeamsBySearch(name: string): Promise<TeamsResponse> {
  const res = await axiosInstance.get(`${baseUrl}/${teamsUrl}/search/${name}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getTeamById(id: string, query?: object) {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${teamsUrl}/${id}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getTeamsBySeasonId(
  seasonId: string,
  query?: object
): Promise<TeamsResponse> {
  const res = await axiosInstance.get(
    `${baseUrl}/${teamsUrl}/seasons/${seasonId}`,
    { params: query }
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
