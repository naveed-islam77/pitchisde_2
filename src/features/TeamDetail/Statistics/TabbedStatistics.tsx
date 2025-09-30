import { TabBlock } from "@/components/TabBlock";
import { GoalStatCard } from "@/components/stat/GoalStatCard";
import { useTeam } from "@/contexts/Team/TeamContext";
import Players from "@/features/LeagueDetail/Statistics/StatisticsPlayer";
import Team from "@/features/LeagueDetail/Statistics/StatisticsTeam";
import TeamHistory from "./TeamHistory";
import { useRouter } from "next/router";
import { getStatisticsPlayers } from "@/features/LeagueDetail/useGetLeagues";
import {
  playerStatsConfig,
  teamStatsConfig,
} from "@/features/LeagueDetail/Statistics/statsConfig";

export function TabbedStatistics() {
  const team = useTeam();
  const teamBanner = team?.teamBanner;

  const router = useRouter();
  const { teamId, season } = router.query;
  const seasonId = season ? String(season) : teamBanner?.[0]?.season_id;

  const { data: players, isLoading } = getStatisticsPlayers(
    teamId as string,
    null
  );

  return (
    <TabBlock>
      <TabBlock.List>
        <TabBlock.Tab label="Players" />
        <TabBlock.Tab label="Team" />
        <TabBlock.Tab label="History" />
      </TabBlock.List>
      <TabBlock.Panels>
        <TabBlock.Panel className={"grid sm:grid-cols-2 gap-4 p-0"}>
          {Object.entries(playerStatsConfig).map(([key, config]) => (
            <Players
              key={key}
              players={players}
              seasons={teamBanner}
              title={config.title}
              config={config}
              isLoading={isLoading}
            />
          ))}
        </TabBlock.Panel>
        <TabBlock.Panel className={"grid sm:grid-cols-2 gap-4 p-0"}>
          {Object.entries(teamStatsConfig).map(([key, config]) => (
            <Team seasonId={seasonId} key={key} config={config} />
          ))}
        </TabBlock.Panel>
        <TabBlock.Panel>
          <TeamHistory />
        </TabBlock.Panel>
      </TabBlock.Panels>
    </TabBlock>
  );
}
