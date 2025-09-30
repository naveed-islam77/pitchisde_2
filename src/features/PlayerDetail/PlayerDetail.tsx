import { GoogleAds } from "@/components/GoogleAds";
import { AppLayout } from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import { MiniTransfer } from "./Career";
import { MatchTable } from "./MatchTable";
import PlayerHero from "./PlayerHero";
import PlayerStatistics from "./PlayerStatistics";
import { SeasonStatistics } from "./SeasonStatistics";
import { useGetPlayerBanner, useGetPlayerTransfers } from "./usePlayers";

export function PlayerDetail() {
  const router = useRouter();
  const { playerId, season } = router.query;
  const { data: playerBanner, isLoading } = useGetPlayerBanner(
    playerId as string
  );

  const { data: transfers } = useGetPlayerTransfers(playerId as string);

  return (
    <AppLayout>
      <PlayerHero playerBanner={playerBanner} isLoading={isLoading} />
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="flex-1 space-y-5">
          <MatchTable seasons={playerBanner} />
          <PlayerStatistics playerBanner={playerBanner} />
        </div>
        <div className="shrink-0 space-y-5">
          <SeasonStatistics playerBanner={playerBanner} />
          <GoogleAds />
          <MiniTransfer transfers={transfers} />
        </div>
      </div>
    </AppLayout>
  );
}
