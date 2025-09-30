import { Block } from "@/components/Block";
import MatchCard from "./MatchCard";

export function NextMatches({ fixtures }) {
  if (!fixtures) return null;

  return (
    <Block
      title="Upcoming"
      showNextButton={false}
      className="w-full screen-1400:max-w-[450px]"
    >
      <div className="flex flex-col gap-x-4 gap-y-3 justify-between">
        {fixtures?.slice(0, 5).map((fixture) => (
          <MatchCard
            key={fixture.fixture_id}
            fixture={fixture}
            isPrevious={false}
            activeLeague={null}
          />
        ))}
      </div>
    </Block>
  );
}
