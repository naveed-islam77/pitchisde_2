import { getTeamBanner, getTeamCupHistory, getTeamFixtures, getTeamFixturesNext, getTeamFixturesPageNumber, getTeamFixturesPrevious, getTeamFixturesRounds, getTeamFixturesTimeLine, getTeamHistory, getTeamLatestMatches, getTeamMiniStandings, getTeamSquad, getTeamStandings, getTeamTransfers } from "@/services/teams-api";
import { useQuery } from "@tanstack/react-query";

export function useGetTeamFixtures(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team_fixtures_landing", teamId, seasonId],
    queryFn: () => getTeamFixtures(teamId,  seasonId),
    enabled: !!teamId,
  });
}
export function useGetTeamFixturesTimeLine(teamId: any, seasonId: any, pageNumber: any) {
  return useQuery({
    queryKey: ["team_fixtures_timeline", teamId, seasonId, pageNumber],
    queryFn: () => getTeamFixturesTimeLine(teamId,  seasonId, pageNumber),
    enabled: !!teamId || !pageNumber || !seasonId,
  });
}
export function useGetTeamFixturesPageNumber(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team_fixtures_page_number", teamId, seasonId],
    queryFn: () => getTeamFixturesPageNumber(teamId,  seasonId),
    enabled: !!teamId || !!seasonId,
  });
}

export function useGetTeamFixturesRounds(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team_round_fixtures", teamId, seasonId],
    queryFn: () => getTeamFixturesRounds(teamId,  seasonId),
    enabled: !!teamId,
  });
}


export function useGetTeamFixturesNext(teamId: string, seasonId: string) {
  return useQuery({
    queryKey: ["team fixtures next", teamId, seasonId],
    queryFn: () => getTeamFixturesNext(teamId,  seasonId),
    enabled: !!teamId,
  });
}


export function useGetTeamFixturesPrevious(teamId: string, seasonId: string) {
  return useQuery({
    queryKey: ["team fixtures previous", teamId, seasonId],
    queryFn: () => getTeamFixturesPrevious(teamId,  seasonId),
    enabled: !!teamId,
  });
}
export function useGetTeamBanner(teamId: string) {
  return useQuery({
    queryKey: ["team banner", teamId],
    queryFn: () => getTeamBanner(teamId),
    enabled: !!teamId,
  });
}


export function useGetTeamHistory(teamId: string) {
  return useQuery({
    queryKey: ["team history", teamId],
    queryFn: () => getTeamHistory(teamId),
    enabled: !!teamId,
  });
}
export function useGetTeamCupHistory(teamId: string) {
  return useQuery({
    queryKey: ["team history cup", teamId],
    queryFn: () => getTeamCupHistory(teamId),
    enabled: !!teamId,
  });
}

export function useGetTeamMiniStandings(teamId: string, seasonName: any) {
  return useQuery({
    queryKey: ["team mini standings", teamId, seasonName],
    queryFn: () => getTeamMiniStandings(teamId, seasonName),
    enabled: !!teamId,
  });
}

export function useGetTeamLatestMatches(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team latest matches", teamId, seasonId],
    queryFn: () => getTeamLatestMatches(teamId, seasonId),
    enabled: !!teamId,
  });
}

export function useGetTeamStandings(teamId: any, seasonId: any, type: any, matchWeek: any) {
  const {data, isLoading, isError, error} =  useQuery({
    queryKey: ["team standings", teamId, seasonId, type],
    queryFn: () => getTeamStandings(teamId, seasonId, type),
    enabled: !!teamId,
  });


  return {
    standings: data,
    isLoading,
    isError,
    error,
  };
}

export function useGetTeamSquad(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team squad", teamId, seasonId],
    queryFn: () => getTeamSquad(teamId, seasonId),
    enabled: !!teamId,
  });
}


export function useGetTeamTransfers(teamId: any, seasonId: any) {
  return useQuery({
    queryKey: ["team transfers", teamId, seasonId],
    queryFn: () => getTeamTransfers(teamId, seasonId),
    enabled: !!teamId,
  });
}


