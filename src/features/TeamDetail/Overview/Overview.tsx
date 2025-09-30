import { Block } from "@/components/Block";
import { GoogleAds } from "@/components/GoogleAds";
import { ScheduledMatch } from "@/components/ScheduledMatch";
import { PreviousMatches } from "../Standings/LeagueSlider/matches/PreviousMatches";
import { MatchList } from "./MatchList";
import { MiniStandings } from "./MiniStandings";
import { useGetUpcomingMatch } from "@/features/LeagueDetail/useGetLeagues";
import { useRouter } from "next/router";
import { useTeam } from "@/contexts/Team/TeamContext";

export default function Overview() {
  const router = useRouter();
  const { query } = router;
  const { season: seasonId } = query;
  const { teamBanner } = useTeam();
  const season = seasonId || teamBanner?.[0]?.season_id;

  const { data: fixture, isLoading } = useGetUpcomingMatch({
    seasonId: Number(season),
  });

  return (
    <div className="grid grid-cols-1 gap-4 screen-1100:grid-cols-12">
      <div className="order-1 screen-1100:order-2 screen-1100:col-span-8 screen-1400:col-span-6">
        <MatchList teamBanner={teamBanner} />
      </div>

      {/* Left Column */}
      <div className="order-2 screen-1100:order-1 space-y-4 screen-1100:col-span-4 screen-1400:col-span-3">
        <PreviousMatches />
        <GoogleAds />
        {/* <NewsCarousel /> */}
      </div>

      {/* Right Column */}
      <div className="order-3 space-y-4 screen-1100:col-span-12 screen-1400:col-span-3">
        {fixture?.length > 0 && (
          <Block title="Upcoming Matches">
            <div className="space-y-6">
              <ScheduledMatch fixture={fixture} isLoading={isLoading} />
            </div>
          </Block>
        )}
        <MiniStandings />
      </div>
    </div>
  );
}
