import { Block } from "@/components/Block";
import DesktopView from "@/components/Player/Match/DesktopView";
import { useRouter } from "next/router";
import { useGetPlayerMatches } from "./usePlayers";

export interface Team {
  name: string;
  logo: string;
  score: number;
}

export function MatchTable({ seasons }) {
  const router = useRouter();
  const { playerId, season } = router.query;
  const seasonId = season ? season : seasons?.[0]?.season_id;

  const { data: playerMatches, isLoading } = useGetPlayerMatches(
    playerId as string,
    seasonId as string
  );

  console.log("playerMatches", playerMatches);

  if (isLoading) {
    return (
      <Block padding={false} showNextButton={false} className="my-3 shadow-md">
        <div className="relative h-96 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  if (playerMatches?.length === 0 || !playerMatches) {
    return (
      <Block padding={false} showNextButton={false} className="my-3 shadow-md">
        <div className="flex items-center text-2xl font-bold justify-center h-[200px]">
          No data found
        </div>
      </Block>
    );
  }

  return (
    <Block padding={false}>
      <DesktopView lineups={playerMatches} />
    </Block>
  );
}
