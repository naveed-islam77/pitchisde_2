import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import { TitleStripSimple } from "@/components/TitleStrip";
import { FeaturedTransfers } from "@/components/Transfers/FeaturedTransfers";
import Transfers from "@/components/Transfers/Transfers";
import { useLeague } from "@/contexts/League/LeagueContext";
import { useRouter } from "next/router";
import { usegetTransfers } from "../useGetLeagues";
import { useEffect, useState } from "react";
import { getFootballNews } from "@/services/core-api";

export default function Transfer() {
  const { leagueBannerData: seasons } = useLeague();
  const router = useRouter();
  const [newsData, setNewsData] = useState([]);
  const { query } = router;
  const { leagueId, season } = query;

  const seasonId = season || seasons[0]?.season_id;

  const { data: TransfersData, isLoading } = usegetTransfers(
    leagueId as string,
    seasonId as string
  );

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
    };

    loadNews();
  }, []);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 space-y-4">
        {isLoading && (
          <Block padding={false}>
            <TitleStripSimple title="Transfer" />
            <div className="relative h-[32rem] bg-gray-200 overflow-hidden">
              <div className="shimmer-effect"></div>
            </div>
          </Block>
        )}
        {TransfersData && !isLoading ? (
          <Transfers teamsData={TransfersData} isLoading={isLoading} />
        ) : null}
      </div>
      <div className="shrink-0 space-y-4">
        <FeaturedTransfers TransfersData={TransfersData} />

        <NewsCard
          newsData={newsData}
          className="md:grid-cols-1 lg:grid-cols-1"
        />
      </div>
    </div>
  );
}
