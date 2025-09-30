import { VersusRowList } from "@/components/VersusView";
import { getCurrentWeekFixtures } from "@/helpers/math-helper";
import { MatchRow } from "./MatchRow";

export function CurrentWeek({ fixturesData }) {
  // const matches = getCurrentWeekFixtures(fixturesData);

  if (fixturesData?.length === 0)
    return <p className="text-center">No Upcoming Matches</p>;

  return (
    <div>
      <VersusRowList>
        {fixturesData?.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </VersusRowList>
    </div>
  );
}
