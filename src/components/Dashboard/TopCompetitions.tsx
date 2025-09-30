import { useTopCompetitions } from "@/features/Dashboard/useDashboard";
import { Block } from "../Block";
import { TopCardCompetition } from "./top-competition/top-card-competition";

export function TopCompetitions() {
  const { topCompetitions, isError, isLoading } = useTopCompetitions();

  if (isLoading)
    return (
      <Block
        title="Top Competitions"
        showNextButton={false}
        padding={false}
        className="overflow-x-hidden"
        contentClassName="border-t border-x-grey-3 p-6 "
      >
        <div className="relative h-48 bg-gray-200 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  if (topCompetitions?.length === 0)
    return <p className="text-center">No data available.</p>;

  return (
    <Block
      title="Top Competitions"
      padding={false}
      showNextButton={false}
      className="overflow-x-hidden"
    >
      <div>
        {topCompetitions?.map((league) => (
          <TopCardCompetition key={league.id} league={league} />
        ))}
      </div>
    </Block>
  );
}
