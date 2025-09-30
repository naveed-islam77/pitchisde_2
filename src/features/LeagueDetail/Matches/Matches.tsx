import { Block } from "@/components/Block";
import LeagueMatchSwitch from "@/components/Match/league-match-switch";
import { MatchesTable } from "@/components/Match/LeagueMatches/MatchesTable";
import { RoundMatches } from "@/components/Match/LeagueMatches/RoundMatches";
import { NewsCard } from "@/components/News/NewsCard";
import MatchSkeleton from "@/components/Skeletons/MatchSkeleton";
import { useLeague } from "@/contexts/League/LeagueContext";
import { getFootballNews } from "@/services/core-api";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getLeagueAwards,
  useGetLeagueRoundFixtures,
  usegetMatches,
  userGetLeagueMatchesPageNumber,
} from "../useGetLeagues";
import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { LeagueAward } from "@/components/LeagueAward";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Matches() {
  const router = useRouter();
  const { query } = router;
  const { leagueId, season } = query;
  const { leagueBannerData } = useLeague();
  const bannerData = leagueBannerData?.[0];
  const seasonId = season || leagueBannerData?.[0]?.season_id;
  const { data: pagesNumber } = userGetLeagueMatchesPageNumber(seasonId);
  const { data: awards, isLoading: isAwardsDataLoading } = getLeagueAwards(
    leagueId as string,
    season as string
  );

  const [activeToggle, setActiveToggle] = useState<"round" | "date">("date");
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);

  const { data: matches, isLoading } = usegetMatches(
    leagueId as string,
    10,
    page
  );

  const { data: roundMatches } = useGetLeagueRoundFixtures(seasonId);

  useEffect(() => {
    if (pagesNumber) {
      setPage(pagesNumber);
    }
  }, [pagesNumber]);

  const RenderComponent = () => {
    if (activeToggle === "round") {
      return <RoundMatches seasonId={seasonId} fixturesData={roundMatches} />;
    } else if (activeToggle === "date") {
      return (
        <MatchesTable
          fixturesData={matches}
          pagesNumber={pagesNumber}
          setPage={setPage}
          page={page}
        />
      );
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
    };

    loadNews();
  }, []);

  const shadow = "0px 2px 15px 0px #00000040";
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-5">
        {isLoading && <MatchSkeleton />}
        {!isLoading && (
          <Block padding={false} style={{ boxShadow: shadow }}>
            <div className="bg-white px-4 py-4 rounded-xl">
              <LeagueMatchSwitch
                setActiveToggle={setActiveToggle}
                activeToggle={activeToggle}
              />
              <RenderComponent />
            </div>
          </Block>
        )}
      </div>
      <div className="shrink-0 space-y-5">
        {bannerData?.overview === false && (
          <LeagueAward awards={awards} isLoading={isAwardsDataLoading} />
        )}
        {bannerData?.overview === false && <TeamOfWeek />}

        <div className="">
          <NewsCard
            newsData={newsData}
            className="md:grid-cols-1 lg:grid-cols-1"
          />
        </div>
      </div>
    </div>
  );
}
