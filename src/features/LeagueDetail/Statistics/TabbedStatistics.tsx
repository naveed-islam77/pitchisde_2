import { TabBlock } from "@/components/TabBlock";
import Players from "./StatisticsPlayer";
import Team from "./StatisticsTeam";
import { Trophies } from "./TrophyStatCard";
import { useLeague } from "@/contexts/League/LeagueContext";
import { useRouter } from "next/router";
import { getStatisticsPlayers } from "../useGetLeagues";
import { playerStatsConfig, teamStatsConfig } from "./statsConfig";

export function TabbedStatistics() {
  const { leagueBannerData: seasons } = useLeague();
  const router = useRouter();
  const { season } = router.query;
  const seasonId = season ? String(season) : seasons?.[0]?.season_id;
  const { data: players, isLoading } = getStatisticsPlayers(null, seasonId);

  return (
    <TabBlock>
      <TabBlock.List>
        <TabBlock.Tab label="Players" />
        <TabBlock.Tab label="Teams" />
        <TabBlock.Tab label="Seasons" />
      </TabBlock.List>
      <TabBlock.Panels>
        <TabBlock.Panel className="grid sm:grid-cols-2 gap-4 p-0">
          {Object.entries(playerStatsConfig).map(([key, config]) => (
            <Players
              key={key}
              players={players}
              seasons={seasons}
              title={config.title}
              config={config}
              isLoading={isLoading}
            />
          ))}
        </TabBlock.Panel>

        <TabBlock.Panel className="grid sm:grid-cols-2 gap-4 p-0">
          {Object.entries(teamStatsConfig).map(([key, config]) => (
            <Team seasonId={seasonId} key={key} config={config} />
          ))}
        </TabBlock.Panel>
        <TabBlock.Panel>
          <Trophies />
        </TabBlock.Panel>
      </TabBlock.Panels>
    </TabBlock>
  );
}
