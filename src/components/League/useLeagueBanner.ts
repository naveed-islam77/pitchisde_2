import { useRouter } from "next/router";
import { useGetLeagueBannerData } from "@/features/Fixtures/useFixturesByDate";
import { useGetTeamBanner } from "@/features/TeamDetail/useTeams";

export function useLeagueBanner() {
  const { query } = useRouter();
  const { leagueId, teamId } = query;

  const { leagueBannerData } = useGetLeagueBannerData(leagueId as string);
   const { data: teamBanner } = useGetTeamBanner(teamId as string);

  return { leagueId, leagueBannerData, teamId, teamBanner };
}