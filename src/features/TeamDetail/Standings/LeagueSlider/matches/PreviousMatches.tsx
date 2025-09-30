import { Block } from "@/components/Block";
import MatchCard from "./MatchCard";
import { useRouter } from "next/router";
import { useGetTeamFixturesPrevious } from "@/features/TeamDetail/useTeams";
import { getMatchesLeagues, groupByLeague } from "@/helpers/fixture";
import { useState } from "react";
import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";

export function PreviousMatches() {
  const router = useRouter();
  const { season, teamId } = router.query;
  const [activeLeague, setActiveLeague] = useState("");

  const { data: fixtures } = useGetTeamFixturesPrevious(
    teamId as string,
    season as string
  );

  const leagues = getMatchesLeagues(fixtures);

  const groupFixtures = groupByLeague(fixtures);

  const activeFixtures = activeLeague ? groupFixtures[activeLeague] : fixtures;

  if (!fixtures) return null;
  return (
    <Block
      title="Latest"
      showNextButton={false}
      className="w-full screen-1400:max-w-[450px]"
    >
      <div className="mb-4">
        <LeagueSlider
          leagues={leagues}
          setSelectedLeague={setActiveLeague}
          selectedLeague={activeLeague}
          className="!px-1"
        />
      </div>
      <div className="flex flex-col gap-x-4 space-y-2 justify-center items-center">
        {activeFixtures?.slice(0, 5).map((fixture) => (
          <MatchCard
            key={fixture.fixture_id}
            fixture={fixture}
            isPrevious={true}
            activeLeague={activeLeague}
          />
        ))}
      </div>
    </Block>
  );
}
