import Image from "next/image";
import SeasonSelect from "./SeasonSelect";
import { useGetLeagueBannerData } from "@/features/Fixtures/useFixturesByDate";

export default function LeagueTitle({ leagueId }) {
  const { leagueBannerData, isLoading } = useGetLeagueBannerData(
    leagueId as string
  );
  const bannerData = leagueBannerData?.[0] || {};

  if (isLoading) return null;

  const seasons = extractSeasonData(leagueBannerData);

  return (
    <div className="flex h-full items-center gap-x-5 text-dark">
      <Image
        width={250}
        height={250}
        className="object-contain w-[70px] h-[70px]"
        src={bannerData?.league_logo}
        alt={bannerData?.league_name}
      />

      <div>
        <h2 className="xs:text-xl text-lg font-semibold sm:text-xl font-display text-[20px] ">
          {bannerData?.league_name}
        </h2>
        <div className="mt-1.5 flex items-center gap-x-2">
          <Image
            width={600}
            height={512}
            src={bannerData.league_country_logo}
            className="rounded-full object-cover aspect-square w-8"
            alt={bannerData.league_country}
          />
          <p className="text-sm font-semibold sm:text-base ">
            {bannerData.league_country}
          </p>
        </div>
        <SeasonSelect seasons={seasons} />
      </div>
    </div>
  );
}

type LeagueSeason = {
  season_id: number;
  season_name: string;
};

function extractSeasonData(data: any): LeagueSeason[] {
  return data?.map((item) => ({
    season_id: item.season_id,
    season_name: item.season_name,
  }));
}
