import { Block } from "@/components/Block";
import { usegetStatisticsTeams } from "@/features/LeagueDetail/useGetLeagues";
import { useRouter } from "next/router";
import { StatTag } from "./StatTag";
import { cn } from "@/lib/utils";
import { TeamCardSkeleton } from "../Skeletons/team-skeletons/team-card-skeleton";

export function GoalStatCard({ seasonId, key, config }) {
  const router = useRouter();
  const { leagueId, teamId } = router.query;
  const { data: teams, isLoading } = usegetStatisticsTeams(
    leagueId as string,
    seasonId as string
  );

  if (teams?.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
        <h1 className="px-4 py-3 text-lg font-bold">No Teams</h1>
      </div>
    );
  }

  const teamsStatistics = groupTeamsById(teams);

  const getValue = (team: any) => {
    if (config?.valueFormatter) return config.valueFormatter(team);
    return team?.[config.valueKey] ?? 0;
  };

  if (isLoading) {
    return <TeamCardSkeleton />;
  }
  return (
    <div>
      {teamsStatistics?.map((team, index) => {
        const firstTeam = team?.teams?.[0];
        return (
          <Block
            padding={false}
            title={config?.title}
            centerTitle
            contentClassName="border-t border-x-grey-3 py-3 px-4"
            key={index}
          >
            <div key={index}>
              <div className="flex items-center py-3 md:flex-col">
                <div className="relative">
                  <img
                    src={firstTeam?.team_logo}
                    className="h-11 w-11 rounded-full md:h-16 md:w-16"
                  />
                  <StatTag className="absolute -right-6 -top-2 max-md:hidden" />
                </div>
                <p className="flex-1 font-medium max-md:pl-4 max-md:text-sm max-md:font-semibold md:mt-2">
                  {firstTeam?.team_name}
                </p>
                <StatTag
                  compact
                  className="ml-1 md:hidden"
                  stat={getValue(firstTeam)}
                />
              </div>

              <div className="h-[400px] overflow-y-auto">
                {team?.teams?.map((t: any, index: number) => {
                  const isFirst = index === 0;
                  const isSameTeam = t.team_id == teamId;
                  if (isFirst) return null;
                  return (
                    <div
                      className={cn(
                        "divide-y divide-x-grey-3 border-t border-x-grey-3 md:mt-4",
                        isSameTeam && "sticky top-0 bg-white z-10"
                      )}
                    >
                      <GoalRow team={t} getValue={getValue} />
                    </div>
                  );
                })}
              </div>
            </div>
          </Block>
        );
      })}
    </div>
  );
}
function GoalRow({ team, getValue }) {
  const { team_name, team_logo } = team;
  return (
    <div className="flex items-center py-3">
      <img src={team_logo} className="h-11 w-11 shrink-0 rounded-full" />
      <p className="flex-1 pl-4 text-sm leading-none max-md:font-medium">
        {team_name}
      </p>
      <p className="mr-2 self-center text-sm font-medium">{getValue(team)}</p>
    </div>
  );
}

function groupTeamsById(data: any) {
  const map: Record<string, any> = {};

  if (!data) return [];

  for (const item of data) {
    if (!map[item.league_id]) {
      map[item.league_id] = [];
    }
    map[item.league_id].push(item);
  }

  return Object.entries(map).map(([league_id, teams]) => ({
    league_id: Number(league_id),
    teams,
  }));
}
