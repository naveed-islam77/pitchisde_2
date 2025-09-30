import { supabase } from "@/supabase/supabaseClient";
import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import { toQueryString } from "@/utils/generics";

const playersUrl = "v3/football/players";

interface PlayerResponse {
  message?: string;
  subscription?: object;
  data?: any;
  rate_limit?: object;
  timezone?: string;
  pagination?: object;
}

export async function getPlayerById(
  id: string,
  query?: object
): Promise<PlayerResponse> {
  const queryStr = query ? `?${toQueryString(query)}` : "";

  const res = await axiosInstance.get(
    `${baseUrl}/${playersUrl}/${id}${queryStr}`
  );

  if (res.status !== 200) throw new Error(res.data.message);

  return res.data;
}

export async function getPlayerBanner(playerId: string): Promise<any> {
  const { data, error } = await supabase.rpc("player_banner", {
    input_player_id: Number(playerId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerMatches(
  playerId: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("player_matches", {
    input_player_id: Number(playerId),
    input_season_id: Number(seasonId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getPlayerStatitics(
  playerId: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("player_statistics", {
    input_player_id: Number(playerId),
    input_season_id: Number(seasonId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerTransfers(
  playerId: string,
): Promise<any> {
  const { data, error } = await supabase.rpc("player_transfers", {
    input_player_id: Number(playerId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerTrophies(
  playerId: string,
): Promise<any> {
  const { data, error } = await supabase.rpc("player_trophies", {
    input_player_id: Number(playerId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerStatitics90(
  playerId: string,
  seasonId?: string
): Promise<any> {
  const { data, error } = await supabase.rpc("player_statistics_per90", {
    input_player_id: Number(playerId),
    input_season_id: Number(seasonId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerPerformance(
  playerId: string,
): Promise<any> {
  const { data, error } = await supabase.rpc("player_performance", {
    input_player_id: Number(playerId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPlayerAbsence(
  playerId: string,
): Promise<any> {
  const { data, error } = await supabase.rpc("player_absences", {
    input_player_id: Number(playerId),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
