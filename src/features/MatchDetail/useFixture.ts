import {
  getFixtureChannels,
  getFixtureComments,
  getFixtureEvents,
  getFixtureForm,
  getFixtureHeadToHead,
  getFixtureHeadToHeadCounts,
  getFixturePressureData,
  getFixturePressureEvents,
  getFixtureRefreeDetails,
  getFixtureRoundMatches,
  getFixtureStandings,
  getFixtureStatistics,
  getFixtureUpcoming,
  getFixtureWeather,
  getPlayerLineupAttacking,
  getPlayerLineupBasics,
  getPlayerLineupDetails,
  getPlayerLineupOverAll,
  getPlayerLineupStatsAttack,
  getPlayerLineupStatsBattle,
  getPlayerLineupStatsDefense,
  getPlayerLineupStatsDiscipline,
  getPlayerLineupStatsGoalkeeping,
  getPlayerSidelined,
} from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";

export function useGetPressureDataQuery(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture pressure", fixtureId],
    queryFn: () => getFixturePressureData(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPressureEvents(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture pressure events", fixtureId],
    queryFn: () => getFixturePressureEvents(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetFixtureEvents(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture events", fixtureId],
    queryFn: () => getFixtureEvents(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureStatistics(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture statistics", fixtureId],
    queryFn: () => getFixtureStatistics(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureComments(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture comments", fixtureId],
    queryFn: () => getFixtureComments(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetFixtureFormData(fixtureId: string, sameVenue: boolean, sameTeam: boolean) {
  return useQuery({
    queryKey: ["fixture Form", fixtureId, sameVenue, sameTeam],
    queryFn: () => getFixtureForm(fixtureId, sameVenue, sameTeam),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureUpcoming(
  fixtureId: string,
  sameLeague?: boolean,
  sameVenue?: boolean,
  sameSide?: boolean
) {
  const params = {
    p_match_id: Number(fixtureId),
    p_same_league: sameLeague,
    p_same_venue: sameVenue,
    p_same_side: sameSide,
  }
  return useQuery({
    queryKey: ["fixture upcoming", fixtureId, sameLeague, sameVenue, sameSide],
    queryFn: () => getFixtureUpcoming(params),
    enabled: !!fixtureId,
  });
}

export function useGetFixtureHeadToHead(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture head to head", fixtureId],
    queryFn: () => getFixtureHeadToHead(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureHeadToHeadCount(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture head to head counta", fixtureId],
    queryFn: () => getFixtureHeadToHeadCounts(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetSidelinedPlayers(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture sidelined", fixtureId],
    queryFn: () => getPlayerSidelined(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetLineUpBasics(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup basics", fixtureId],
    queryFn: () => getPlayerLineupBasics(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupAttacking(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup attacking", fixtureId],
    queryFn: () => getPlayerLineupAttacking(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupDetails(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup details", fixtureId],
    queryFn: () => getPlayerLineupDetails(fixtureId),
    enabled: !!fixtureId,
  });
}

// [Lineup stats overall]
export function useGetPlayerLineupStatsOverAll(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup overall", fixtureId],
    queryFn: () => getPlayerLineupOverAll(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupStatsAttack(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup stats attack", fixtureId],
    queryFn: () => getPlayerLineupStatsAttack(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupStatsDefense(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup  stats defense", fixtureId],
    queryFn: () => getPlayerLineupStatsDefense(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupStatsBattle(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup  stats battle", fixtureId],
    queryFn: () => getPlayerLineupStatsBattle(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupStatsDiscipline(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup  stats discipline", fixtureId],
    queryFn: () => getPlayerLineupStatsDiscipline(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetPlayerLineupStatsGoalkeeping(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture lineup  stats goalkeeping", fixtureId],
    queryFn: () => getPlayerLineupStatsGoalkeeping(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureChannels(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture channels", fixtureId],
    queryFn: () => getFixtureChannels(fixtureId),
    enabled: !!fixtureId,
  });
}
export function useGetFixtureStandings(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture standings", fixtureId],
    queryFn: () => getFixtureStandings(fixtureId),
    enabled: !!fixtureId,
  });
}


export function useGetFixtureRoundMatches(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture round matches", fixtureId],
    queryFn: () => getFixtureRoundMatches(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetFixtureRefreeDetails(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture refree details", fixtureId],
    queryFn: () => getFixtureRefreeDetails(fixtureId),
    enabled: !!fixtureId,
  });
}

export function useGetFixtureWeather(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture weather", fixtureId],
    queryFn: () => getFixtureWeather(fixtureId),
    enabled: !!fixtureId,
  });
}


export const headerKeyMap: Record<string, string> = {
  Minutes: "minutes",
  Goals: "goals",
  Assists: "assists",
  Shots: "total_shots",
  "Shots on Target": "shots_on_target",
  Passes: "total_passes",
  "Accurate Passes": "accurate_passes",
  "Pass %": "acc_pass_pct",
  Touches: "touches",
  rating: "rating",
  xG: "acc_pass_pct",
  age: "player_age",
  "Key Passes": "key_passes",
  Crosses: "crosses",
  "Big Chances Created": "big_chances_created",
  "Big Chances Missed": "big_chances_missed",
  "Hit Woodwork": "hit_woodwork",
  "Clearances (Off Line)": "clearances",
  Interceptions: "interceptions",
  "Shots Blocked": "shots_blocked",
  "Penalties Committed": "penalties_committed",
  "Errors Leading to Shot": "error_to_shot",
  "Errors Leading to Goal": "error_to_goal",
  Recoveries: "ball_recoveries",
  Dispossessions: "dispossessed",
  Aerials: "aerials_won",
  Duels: "duels_won",
  Tackles: "tackles_won",
  Dribbles: "dribbles_total",
  "Dribbled Past": "dribbled_past",
  "Yellow Cards": "yellow_cards",
  "Red Cards": "red_cards",
  "Fouls Committed": "fouls",
  "Fouls Drawn": "fouls_drawn",
  "Possession Lost": "possession_lost",
  Turnovers: "turnovers",
  "Offside Committed": "offsides",
  "Offside Provoked": "offsides_provoked",
  "Saves (Inside Box)": "saves",
  "Penalties Saved": "penalties_saved",
  Punches: "punches",
  "Good High Claims": "good_high_claim",
};
