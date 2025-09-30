import {
  getLeagueMatches,
  getLeagueMatchesPageNumber,
  getLeagueOverViewAwards,
  getLeagueRoundFixtures,
  getLeagueStandingsDropdown,
  getLeagueStatisticsPlayers,
  getLeagueStatisticsSeasons,
  getLeagueStatisticsTeams,
  getLeagueTots,
  getLeagueTotsCoach,
  getLeagueTransfers,
  getSearchResult,
  getStandingsBySeasonOrLeague,
  getLeagueTotsRounds,
  getUpcomingMatch,
  getTeamTots,
  getLeagueKnockouts,
} from "@/services/leagues-api";
import { useQuery } from "@tanstack/react-query";

export function useGetLeagueStandings(
  leagueId: string,
  seasonId?: string,
  type?: string,
  matchWeek?: string
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["league standings", leagueId, seasonId, type, matchWeek],
    queryFn: () =>
      getStandingsBySeasonOrLeague(seasonId, leagueId, type, matchWeek),
    enabled: !!seasonId,
  });

  return {
    standings: data,
    isLoading,
    isError,
    error,
  };
}

export function getLeagueAwards(leagueId: string, seasonId: string) {
  return useQuery({
    queryKey: ["league awards", leagueId, seasonId],
    queryFn: () => getLeagueOverViewAwards(leagueId, seasonId),
    enabled: !!seasonId,
  });
}

export function getStatisticsPlayers(
  teamId?: string | null,
  seasonId?: string | null
) {
  return useQuery({
    queryKey: ["league statistics players", teamId, seasonId],
    queryFn: () => getLeagueStatisticsPlayers(seasonId ?? null, teamId ?? null),
  });
}

export function usegetStatisticsTeams(leagueId: string, seasonId: string) {
  return useQuery({
    queryKey: ["league statistics teams", leagueId, seasonId],
    queryFn: () => getLeagueStatisticsTeams(seasonId, leagueId),
    enabled: !!seasonId,
  });
}

export function usegetStatisticsSeasons(leagueId: string) {
  return useQuery({
    queryKey: ["league statistics seasons", leagueId],
    queryFn: () => getLeagueStatisticsSeasons(leagueId),
    enabled: !!leagueId,
  });
}

export function usegetTransfers(leagueId: string, seasonId: string) {
  return useQuery({
    queryKey: ["league transfers", leagueId, seasonId],
    queryFn: () => getLeagueTransfers(leagueId, seasonId),
    enabled: !!leagueId,
  });
}

export function usegetMatches(seasonId: string, limit?: number, page?: number) {
  const params = {
    input_season_id: seasonId,
    input_limit: limit,
    input_page: page,
  };
  return useQuery({
    queryKey: ["league fixtures", seasonId, limit, page],
    queryFn: () => getLeagueMatches(params),
    enabled: !!seasonId && !!page,
  });
}
export function userGetLeagueMatchesPageNumber(seasonId: string) {
  const params = {
    input_season_id: seasonId,
    input_limit: 10,
  };
  return useQuery({
    queryKey: ["league fixtures page", seasonId],
    queryFn: () => getLeagueMatchesPageNumber(params),
    enabled: !!seasonId,
  });
}

export function useGetLeagueRoundFixtures(leagueId: string) {
  const params = {
    input_season_id: 23614,
  };
  return useQuery({
    queryKey: ["league fixtures timeline", leagueId],
    queryFn: () => getLeagueRoundFixtures(params),
    enabled: !!leagueId,
  });
}

export function searchQuery(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchResult(query),
    enabled: !!query,
  });
}
export function useGetUpcomingMatch({
  seasonId,
}: {
  teamId?: Number;
  seasonId?: Number;
}) {
  const params = {
    input_season_id: seasonId ?? null,
  };
  return useQuery({
    queryKey: ["upcoming match", seasonId],
    queryFn: () => getUpcomingMatch(params),
  });
}

export function useGetLeagueTotsRounds({ seasonId }: { seasonId?: Number }) {
  const params = {
    p_season_id: seasonId ?? null,
  };
  return useQuery({
    queryKey: ["league tot rounds", seasonId],
    queryFn: () => getLeagueTotsRounds(params),
  });
}


export function useGetLeagueTots({
  seasonId,
  round,
  formation,
}: {
  seasonId?: Number;
  round?: string;
  formation?: string | null;
}) {
  const params: any = {
    p_season_id: seasonId ?? null,
    p_stage_round: round ?? null,
  };

  return useQuery({
    queryKey: ["league tots", seasonId, round],
    queryFn: () => getLeagueTots(params),
    enabled: !!seasonId && !!round,
  });
}
export function useGetTeamTots({
  seasonId,
  teamId,
}: {
  seasonId?: Number;
  teamId?: any;
  formation?: string | null;
}) {
  const params: any = {
    p_season_id: seasonId ?? null,
    p_team_id: teamId ?? null,
  };

  return useQuery({
    queryKey: ["team tots", seasonId, teamId],
    queryFn: () => getTeamTots(params),
    enabled: !!seasonId && !!teamId,
  });
}


export function useGetLeagueTotsCoach({ seasonId }: { seasonId?: Number }) {
  const params: any = {
    input_season_id: seasonId ?? null,
  };

  return useQuery({
    queryKey: ["league tots coach", seasonId],
    queryFn: () => getLeagueTotsCoach(params),
    enabled: !!seasonId,
  });
}

export function useGetStandingsDropdown({ seasonId }: { seasonId?: Number }) {
  const params: any = {
    input_season_id: seasonId ?? null,
  };

  return useQuery({
    queryKey: ["league standings dropdown", seasonId],
    queryFn: () => getLeagueStandingsDropdown(params),
    enabled: !!seasonId,
  });
}

export function useGetLeagueKnockout({ seasonId }: { seasonId?: Number }) {
  const params: any = {
    input_season_id: Number(seasonId) ?? null,
  };

  return useQuery({
    queryKey: ["league knockout", seasonId],
    queryFn: () => getLeagueKnockouts(params),
    enabled: !!seasonId,
  });
}
