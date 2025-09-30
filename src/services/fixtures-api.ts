import { supabase } from "@/supabase/supabaseClient";
import axiosInstance from "@/utils/apiInstance";
import { toQueryString } from "@/utils/generics";

interface FixturesResponse {
  message?: string;
  subscription?: object;
  data?: any;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}
const fixturesUrl = "/v3/football/fixtures";

export async function getAllFixtures(
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query ? `?${toQueryString(query)}` : "";
  const res = await axiosInstance.get(`${fixturesUrl}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByDate(
  params: object
): Promise<FixturesResponse> {
  const { data, error } = await supabase.rpc("homepage_fixtures_list", params);

  if (error) {
    throw new Error(error.message || "Failed to fetch fixtures by date");
  }

  return data;
}

export async function getLeagueBannerData(
  leagueId: string
): Promise<FixturesResponse> {
  const { data, error } = await supabase.rpc("league_banner", {
    input_league_id: leagueId,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch league banner data");
  }
  return data;
}

export async function getFixtureBanner(
  fixtureId: string
): Promise<FixturesResponse> {
  const { data, error } = await supabase.rpc("fixture_banner", {
    input_fixture_id: fixtureId,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture banner data");
  }
  return data;
}

export async function getFixturePressureData(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_pressure", {
    input_fixture_id: fixtureId,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture Pressure data");
  }
  return data;
}
export async function getFixturePressureEvents(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_pressure_events", {
    input_fixture_id: fixtureId,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture Pressure Events data");
  }
  return data;
}

export async function getFixtureEvents(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_events", {
    input_fixture_id: fixtureId,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture Events data");
  }
  return data;
}

export async function getFixtureStatistics(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_statistics", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture Statistics data");
  }
  return data;
}
export async function getFixtureComments(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_comments", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture comments data");
  }
  return data;
}

export async function getFixtureForm(
  fixtureId: string,
  sameVenue: boolean,
  sameTeam: boolean
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_form", {
    p_match_id: Number(fixtureId),
    p_same_venue: sameVenue,
    p_same_side: sameTeam,
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture form data");
  }
  return data;
}
export async function getFixtureUpcoming(
  params: any
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_upcoming", params);

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture upcoming data");
  }
  return data;
}

export async function getFixtureHeadToHead(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_h2h", {
    p_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture head to head data");
  }
  return data;
}
export async function getFixtureHeadToHeadCounts(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_h2h_counts", {
    p_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture head to head counts data");
  }
  return data;
}

// [LineUp details]

export async function getPlayerSidelined(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_sidelined", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture sidelined data");
  }
  return data;
}

export async function getPlayerLineupBasics(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_basics", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup data");
  }
  return data;
}
export async function getPlayerLineupAttacking(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_attacking", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup attacking data");
  }
  return data;
}
export async function getPlayerLineupDetails(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_details", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup details data");
  }
  return data;
}


export async function getPlayerLineupOverAll(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_overall", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup overall data");
  }
  return data;
}

export async function getPlayerLineupStatsAttack(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_attacking", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup attacking data");
  }
  return data;
}

export async function getPlayerLineupStatsDefense(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_defending", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup defending data");
  }
  return data;
}

export async function getPlayerLineupStatsBattle(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_battle", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup battle data");
  }
  return data;
}

export async function getPlayerLineupStatsDiscipline(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_discipline", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup discipline data");
  }
  return data;
}

export async function getPlayerLineupStatsGoalkeeping(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("lineup_stats_goalkeeping", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture lineup goalkeeping data");
  }
  return data;
}

export async function getFixtureChannels(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_channels", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture channels data");
  }
  return data;
}

export async function getFixtureStandings(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_standings", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture standings data");
  }
  return data;
}

export async function getFixtureRoundMatches(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_round_matches", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture round matches data");
  }
  return data;
}

export async function getFixtureRefreeDetails(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_ref_stats", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture refree details data");
  }
  return data;
}

export async function getFixtureWeather(
  fixtureId: string
): Promise<any> {
  const { data, error } = await supabase.rpc("fixture_weather", {
    input_fixture_id: Number(fixtureId),
  });

  if (error) {
    throw new Error(error.message || "Failed to fetch fixture weather data");
  }
  return data;
}












// previous apis
export async function getLatestFixtures(
  queryParams: object
): Promise<FixturesResponse> {
  const res = await axiosInstance.get(`${fixturesUrl}/latest`, {
    params: queryParams,
  });

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByLeague(
  leagueId: string
): Promise<FixturesResponse> {
  const res = await axiosInstance(
    `${fixturesUrl}?filters=fixtureLeagues:${leagueId}&per_page=50&page=4&includes=participants`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureById(
  fixtureId: string,
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query
    ? `?${toQueryString(
        query
      )}&include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches`
    : "?include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches";
  const res = await axiosInstance(`${fixturesUrl}/${fixtureId}${queryStr}`);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureByIds(
  fixtureIds: string[],
  query?: object
): Promise<FixturesResponse> {
  const queryStr = query
    ? `?${toQueryString(
        query
      )}&include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches`
    : "?include=venue;metadata;referees.referee;sidelined.sideline.player;sidelined.sideline.type;coaches";
  const res = await axiosInstance(
    `${fixturesUrl}/multi/${fixtureIds}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixtureByHeadtoHead(
  firstTeam: Number,
  secondTeam: Number
): Promise<FixturesResponse> {
  let queryStr: string = "?includes=league;scores;participants;metadata";
  const res = await axiosInstance.get(
    `${fixturesUrl}/head-to-head/${firstTeam}/${secondTeam}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getFixturesByDateRange(
  startDate: string,
  endDate: string,
  teamId: number | undefined,
  order: string,
  query: object,
  page: number
): Promise<FixturesResponse> {
  const queryStr = toQueryString(query);
  const url = teamId
    ? `${fixturesUrl}/between/${startDate}/${endDate}/${teamId}?${queryStr}&page=${page}`
    : `${fixturesUrl}/between/${startDate}/${endDate}?${queryStr}&page=${page}&order=${order}`;
  const res = await axiosInstance(url);

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}
