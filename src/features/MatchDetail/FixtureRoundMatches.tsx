import { Block } from "@/components/Block";
import Image from "next/image";
import React from "react";
import { useGetFixtureRoundMatches } from "./useFixture";
import { useRouter } from "next/router";
import { useFixture } from "@/contexts/Fixture/FixtureContext";

const FixtureRoundMatches = () => {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: roundMatches, isLoading } = useGetFixtureRoundMatches(
    matchId as string
  );
  const { fixtureBanner } = useFixture();

  const matchWeek = roundMatches?.[0]?.round_name;

  if (isLoading) {
    return (
      <Block title="Round Matches" padding={false} showNextButton={false}>
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden w-full xl:w-[200px]">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }
  return (
    <Block className="flex items-center justify-center gap-2 px-4 py-2 w-full xl:w-[200px]">
      <Image
        src={fixtureBanner?.[0]?.league_logo}
        alt="League Logo"
        width={50}
        height={50}
        className="w-10 h-10 mx-auto"
      />
      <h1 className="text-center py-3 font-semibold text-lg">{matchWeek}</h1>
      <div className="space-y-4">
        {roundMatches?.map((match: any, index) => (
          <div className="flex gap-6" key={index}>
            <Image
              src={match?.home_team_logo}
              alt="Team 1"
              width={30}
              height={30}
              className="w-10 h-10"
            />
            <div className="flex items-center flex-col">
              <h1 className="font-bold">{match?.score_date}</h1>
              <h1 className="text-xs text-gray-500">{match?.minute_state}</h1>
            </div>
            <Image
              src={match?.away_team_logo}
              alt="Team 2"
              width={50}
              height={50}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>
    </Block>
  );
};

export default FixtureRoundMatches;
