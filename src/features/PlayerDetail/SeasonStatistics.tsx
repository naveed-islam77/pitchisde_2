import { Block } from "@/components/Block";
import StatsBox from "@/components/Player/StatsBox";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./MatchTable.module.css";
import { useGetPlayerStatistics } from "./usePlayers";

export function SeasonStatistics({ playerBanner }) {
  const router = useRouter();
  const { playerId, season: selectedSeason } = router.query;
  const [selectedLeague, setSelectedLeague] = useState("");

  const seasonId = selectedSeason || playerBanner?.[0]?.season_id;

  const { data: playerStatistics } = useGetPlayerStatistics(
    playerId as string,
    seasonId as string
  );

  return (
    <Block>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">
          Season Statistics
        </h2>
      </div>
      <header className=" mt-3 flex gap-x-2 border-b pb-3">
        <button
          data-active={selectedLeague === ""}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
          type="button"
          onClick={() => setSelectedLeague("")}
        >
          All
        </button>
        {/* {sortedByLeague.map((stat) => (
          <button
            key={stat.id}
            data-active={selectedLeague === stat.season.league_id}
            onClick={() => setSelectedLeague(stat.season.league_id)}
            className={clsx(styles.league_slider)}
          >
            <Image
              width={250}
              height={250}
              src={stat?.season?.league?.image_path}
              alt={stat?.season?.league?.name}
            />
          </button>
        ))} */}
      </header>
      {/* Season Statistics Stats  */}
      <StatsBox stats={playerStatistics?.[0]} />
    </Block>
  );
}
