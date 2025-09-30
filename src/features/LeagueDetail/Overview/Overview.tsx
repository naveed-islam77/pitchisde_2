import { Block } from "@/components/Block";
import { LeagueAward } from "@/components/LeagueAward";
import { NewsCard } from "@/components/News/NewsCard";
import { ScheduledMatch } from "@/components/ScheduledMatch";
import { StandingsTable } from "@/components/StandingsTable/StandingsTable";
import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { useLeague } from "@/contexts/League/LeagueContext";
import { getFootballNews } from "@/services/core-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLeagueAwards, useGetUpcomingMatch } from "../useGetLeagues";

export default function Overview() {
  const router = useRouter();
  const { query } = router;
  const { leagueId, season: seasonId } = query;
  const { leagueBannerData } = useLeague();
  const bannerData = leagueBannerData?.[0];
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bannerData?.overview === false && leagueId) {
      router.replace(`/league/${leagueId}/matches`);
    }
  }, [bannerData?.overview, leagueId, router]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
      setLoading(false);
    };

    loadNews();
  }, []);

  const season = seasonId || leagueBannerData?.[0]?.season_id;

  const { data: awards, isLoading: isAwardsDataLoading } = getLeagueAwards(
    leagueId as string,
    season as string
  );

  const { data: fixture, isLoading } = useGetUpcomingMatch({
    seasonId: Number(season),
  });

  const newsShadow = "0px 2px 10px 0px #00000040";
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      {/* left  */}
      <div className="flex-1 space-y-5">
        {/* Standing Table */}
        <StandingsTable showTitle={true} />
        {/*Web New Horizontal News */}
        <div className="xl:block hidden">
          <NewsCard newsData={newsData} />
        </div>
      </div>
      {/* right  */}
      <div className="shrink-0 space-y-5">
        {/* Upcoming Matches */}
        {fixture?.length > 0 && (
          <Block
            contentClassName="!pb-2"
            title="Upcoming Matches"
            titleClassNaeme="!text-[#00401A] !text-[20px] font-semibold"
            style={{ boxShadow: newsShadow }}
          >
            <ScheduledMatch fixture={fixture} isLoading={isLoading} />
          </Block>
        )}
        {/* League Awards */}
        <LeagueAward awards={awards} isLoading={isAwardsDataLoading} />
        {/* Team of the Week  */}
        <TeamOfWeek />
        {/* Mobile News  */}
        <div className="xl:hidden">
          <NewsCard newsData={newsData} />
        </div>
      </div>
    </div>
  );
}
