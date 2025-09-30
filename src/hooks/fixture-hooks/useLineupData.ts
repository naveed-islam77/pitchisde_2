import {
  useGetLineUpBasics,
  useGetPlayerLineupDetails,
  useGetSidelinedPlayers,
} from "@/features/MatchDetail/useFixture";
import { groupByLineupType } from "@/helpers/fixture";

export function useLineupData(matchId: string) {
  const { data: lineupBasics } = useGetLineUpBasics(matchId);
  const { data: sidelinedPlayers } = useGetSidelinedPlayers(matchId);
  const { data: lineupsDetails } = useGetPlayerLineupDetails(matchId);

  // Extract formations
  const homeFormation = lineupBasics?.find(
    (i) => i?.side === "home"
  )?.formation;
  const awayFormation = lineupBasics?.find(
    (i) => i?.side === "away"
  )?.formation;

  // Extract participants
  const homeParticipant = lineupBasics?.find((i) => i?.side === "home");
  const awayParticipant = lineupBasics?.find((i) => i?.side === "away");

  // Group players
  const groupedData = groupByLineupType(lineupsDetails || []);
  const homeSubstitutes = groupedData["substitute"]?.filter(
    (i) => i?.side === "home"
  );
  const awaySubstitutes = groupedData["substitute"]?.filter(
    (i) => i?.side === "away"
  );

  // Starters with rating
  const homeLineups =
    lineupsDetails?.filter((i) => i?.side === "home" && i?.rating) || [];
  const awayLineups =
    lineupsDetails?.filter((i) => i?.side === "away" && i?.rating) || [];

  // Averages
  const homeAverageRating = homeLineups.length
    ? homeLineups.reduce((acc, curr) => acc + curr.rating, 0) /
      homeLineups.length
    : null;

  const awayAverageRating = awayLineups.length
    ? awayLineups.reduce((acc, curr) => acc + curr.rating, 0) /
      awayLineups.length
    : null;

  return {
    homeFormation,
    awayFormation,
    homeParticipant,
    awayParticipant,
    homeSubstitutes,
    awaySubstitutes,
    homeAverageRating,
    awayAverageRating,
    sidelinedPlayers,
    lineupsDetails,
  };
}
