import { Block } from "@/components/Block";
import StatsBox from "@/components/Player/PlayerStatistic/StatsBox";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./MatchTable.module.css";
import { useGetPlayerStatistics } from "./usePlayers";

export default function PlayerStatistics({ playerBanner }) {
  const router = useRouter();
  const { playerId, season } = router.query;
  const [selectedLeague, setSelectedLeague] = useState("");

  const seasonId = season || playerBanner?.[0]?.season_id || "";
  const { data: playerStatistics } = useGetPlayerStatistics(
    playerId as string,
    seasonId as string
  );

  const uniqueLeagues = Array.from(
    new Map(
      playerStatistics?.map((m) => [
        m?.league_name,
        {
          league_name: m?.league_name,
          league_logo: m?.league_logo,
          league_id: m?.league_id,
        },
      ])
    ).values()
  );

  return (
    <Block>
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-x-bargreen font-semibold">Statistics</h2>
      </div>
      <header className=" mt-4 flex gap-x-2 pb-3">
        <button
          data-active={selectedLeague === ""}
          onClick={() => setSelectedLeague("")}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
        >
          All
        </button>
        {uniqueLeagues?.map((match: any) => (
          <button
            key={match?.league_id}
            data-active={selectedLeague === match?.league_id}
            onClick={() => setSelectedLeague(match?.league_id)}
            className={clsx(styles.league_slider)}
          >
            <Image
              width={250}
              height={250}
              src={match?.league_logo}
              alt={match?.league_name}
            />
          </button>
        ))}
      </header>
      <StatsBox
        stats={playerStatistics?.[0]}
        role={playerBanner?.[0]?.player_detailed_position}
      />
    </Block>
  );
}
