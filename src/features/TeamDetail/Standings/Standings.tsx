import { GoogleAds } from "@/components/GoogleAds";
import { TeamStandingsTable } from "@/components/Team/TeamMiniStandings/TeamStandingTable";
import { useRouter } from "next/router";
import { useGetTeamFixturesPrevious } from "../useTeams";
import { NextMatches } from "./LeagueSlider/matches/Matches";
import { PreviousMatches } from "./LeagueSlider/matches/PreviousMatches";

export default function Standings() {
  const router = useRouter();
  const { teamId, season } = router.query;

  const { data: fixtures } = useGetTeamFixturesPrevious(
    teamId as string,
    season as string
  );

  return (
    <div className="flex flex-col gap-5 screen-1400:flex-row screen-1400:items-start">
      <div className="flex-1 space-y-5">
        <ActiveSeasonStandings />
      </div>
      <div className="shrink-0 space-y-5 max-screen-1400:grid grid-cols-1 lg:grid-cols-2  screen-1200:grid-cols-3 gap-4">
        <PreviousMatches />
        <NextMatches fixtures={fixtures} />
        <GoogleAds />
        {/* <NewsCarousel /> */}
      </div>
    </div>
  );
}

function ActiveSeasonStandings() {
  return <TeamStandingsTable showTitle={true} />;
}
