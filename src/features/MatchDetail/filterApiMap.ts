import {
  useGetPlayerLineupStatsOverAll,
  useGetPlayerLineupStatsAttack,
  useGetPlayerLineupStatsDefense,
  useGetPlayerLineupStatsBattle,
  useGetPlayerLineupStatsDiscipline,
  useGetPlayerLineupStatsGoalkeeping,
} from "./useFixture";

export const filterApiMap: Record<string, (id: string) => any> = {
  Overall: useGetPlayerLineupStatsOverAll,
  Attack: useGetPlayerLineupStatsAttack,
  Defense: useGetPlayerLineupStatsDefense,
  Battle: useGetPlayerLineupStatsBattle,
  Discipline: useGetPlayerLineupStatsDiscipline,
  Goalkeeping: useGetPlayerLineupStatsGoalkeeping,
};
