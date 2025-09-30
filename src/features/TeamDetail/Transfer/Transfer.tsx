import { Block } from "@/components/Block";
import { GoogleAds } from "@/components/GoogleAds";
import { NewsCard } from "@/components/News/NewsCard";
import { TransferGrid } from "@/components/TransferGrid/TransferGrid";
import { useRouter } from "next/router";
import { useGetTeamTransfers } from "../useTeams";
import { useTeam } from "@/contexts/Team/TeamContext";
import { useEffect, useState } from "react";
import { getFootballNews } from "@/services/core-api";

export default function Transfer() {
  const [newsData, setNewsData] = useState([]);

  const router = useRouter();
  const { teamId, season } = router.query;
  const { teamBanner } = useTeam();
  const seasonName =
    teamBanner?.find((s: any) => s.season_id === Number(season))?.season_name ||
    teamBanner?.[0]?.season_name;

  const { data: teamTransfers, isLoading } = useGetTeamTransfers(
    teamId as string,
    seasonName as string
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
      <div className="flex-1 shrink-0 space-y-5">
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={`squad-loader-${i}`}
                className="relative overflow-x-hidden bg-gray-200 h-40 rounded-md"
              >
                <div className="shimmer-effect"></div>
              </div>
            ))}
          </div>
        ) : (
          <TransferGrid
            teamId={teamId}
            transfers={teamTransfers}
            teamsData={teamTransfers}
          />
        )}
      </div>
      <div className="shrink-0 space-y-5">
        {/* <NextMatches fixtures={team?.upcoming} /> */}
        <GoogleAds />

        <NewsCard
          className="md:grid-cols-1 lg:grid-cols-1"
          newsData={newsData}
        />
      </div>
    </div>
  );
}
