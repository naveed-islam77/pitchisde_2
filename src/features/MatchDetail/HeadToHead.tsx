import { Block } from "@/components/Block";
import LeagueFilter from "@/components/Match/HeadToHead/head-to-head-league-filter";
import Row from "@/components/Match/HeadToHead/head-to-head-row";
import { getContrastYIQ } from "@/lib/utils";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  useGetFixtureHeadToHead,
  useGetFixtureHeadToHeadCount,
} from "./useFixture";

export function HeadToHead() {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: headToHead, isLoading } = useGetFixtureHeadToHead(
    matchId as string
  );
  const { data: headToHeadCount } = useGetFixtureHeadToHeadCount(
    matchId as string
  );

  const [showAllMatches, setShowAllMatches] = useState(false);
  const [homeOnly, setHomeOnly] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("All");

  const leagues = [
    { name: "All", logo: null },
    ...Array.from(
      new Map(
        headToHead?.map((match) => [
          `${match.league_name}-${match.league_logo}`,
          { name: match.league_name, logo: match.league_logo },
        ])
      ).values()
    ),
  ];

  const filteredMatches = headToHead?.filter((match) => {
    if (homeOnly) {
      return (
        match.home_team_name?.toLowerCase() ===
        headToHeadCount?.[0]?.home_team_name?.toLowerCase()
      );
    } else if (selectedLeague === "All") {
      return match;
    } else {
      return match.league_name?.toLowerCase() === selectedLeague?.toLowerCase();
    }
  });

  const displayMatches = useMemo(() => {
    if (showAllMatches) {
      return headToHead;
    } else {
      return filteredMatches?.slice(0, 5);
    }
  }, [showAllMatches, headToHead]);

  if (isLoading) {
    return (
      <Block title="Head to Head" padding={false} showNextButton={false}>
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  const {
    away_team_logo,
    away_team_name,
    away_wins,
    draws,
    home_team_logo,
    home_team_name,
    home_wins,
  } = headToHeadCount?.[0] || {};

  if (headToHeadCount?.length === 0 || headToHead?.length === 0) {
    return (
      <Block title="Head to Head" padding={false} showNextButton={false}>
        <div className="flex items-center justify-center h-[200px] font-bold text-2xl">
          No data found
        </div>
      </Block>
    );
  }

  return (
    <Block showNextButton={false} padding={false}>
      <LeagueFilter
        leagues={leagues as string[]}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        matches={headToHead}
        homeOnly={homeOnly}
        setHomeOnly={setHomeOnly}
      />
      <div className="flex items-center gap-x-3 px-4 py-4 text-lg">
        <img
          src={home_team_logo}
          className="ml-auto w-12"
          alt={home_team_name}
        />
        <div className="flex w-full h-10 overflow-hidden justify-center">
          <div
            style={{
              backgroundColor: "#D50619",
              color: getContrastYIQ("#D50619"),
            }}
            className="h-full w-[35%] flex font-semibold items-center justify-center rounded-s-3xl"
          >
            {home_wins}
          </div>
          <div className="h-full bg-gray-300 font-semibold flex justify-center items-center w-[35%]">
            {draws}
          </div>
          <div
            style={{
              backgroundColor: "#F0F0F0",
              color: getContrastYIQ("#F0F0F0"),
            }}
            className="h-full flex font-semibold items-center justify-center rounded-e-3xl w-[30%]"
          >
            {away_wins}
          </div>
        </div>

        <img
          src={away_team_logo}
          className="mr-auto w-12"
          alt={away_team_name}
        />
      </div>

      <div className="mb-6 px-4 py-2 space-y-4 overflow-x-auto">
        {displayMatches?.map((match) => (
          <Row match={match} key={match?.fixture_id} />
        ))}
      </div>

      <div className="text-center pb-2">
        {filteredMatches?.length > 5 && (
          <button
            onClick={() => setShowAllMatches(!showAllMatches)}
            className="mx-auto px-4 py-1 rounded-full text-primary font-semibold hover:bg-dark/10"
          >
            {showAllMatches ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </Block>
  );
}
