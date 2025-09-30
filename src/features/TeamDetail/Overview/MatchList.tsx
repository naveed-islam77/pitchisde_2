import { Block } from "@/components/Block";
import LeagueMatchSwitch from "@/components/Match/league-match-switch";
import { MatchesTable } from "@/components/Match/LeagueMatches/MatchesTable";
import { MatchRow } from "@/components/Match/LeagueMatches/MatchRow";
import { RoundMatches } from "@/components/Match/LeagueMatches/RoundMatches";
import StandingsTableSkeleton from "@/components/Skeletons/StandingsTableSkeleton";
import { VersusRowList } from "@/components/VersusView";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useGetTeamFixturesPageNumber,
  useGetTeamFixturesRounds,
  useGetTeamFixturesTimeLine,
} from "../useTeams";

function MatchListInner({ fixtures }: any) {
  return (
    <VersusRowList>
      {fixtures?.map((match: any) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </VersusRowList>
  );
}

export function MatchList({ teamBanner }) {
  const router = useRouter();
  const { teamId, season } = router.query;
  const seasonId = season ? season : teamBanner?.[0]?.season_id;

  const [activeTab, setActiveTab] = useState<"date" | "round">("date");
  const [page, setPage] = useState(1);

  const { data: latestMatches, isLoading } = useGetTeamFixturesTimeLine(
    teamId,
    seasonId,
    page
  );

  const { data: pagesNumber } = useGetTeamFixturesPageNumber(teamId, seasonId);
  const { data: roundMatches, isLoading: isRoundLoading } =
    useGetTeamFixturesRounds(teamId, seasonId);

  const RenderComponent = () => {
    if (activeTab === "round") {
      return <RoundMatches seasonId={seasonId} fixturesData={roundMatches} />;
    } else if (activeTab === "date") {
      return (
        <MatchesTable
          fixturesData={latestMatches}
          pagesNumber={pagesNumber}
          setPage={setPage}
          page={page}
        />
      );
    }
  };

  useEffect(() => {
    if (pagesNumber) {
      setPage(pagesNumber);
    }
  }, [pagesNumber]);

  if (isLoading || isRoundLoading) return <StandingsTableSkeleton />;

  return (
    <Block padding={false}>
      <div className="flex items-center justify-between px-4 border-b">
        <div className=" mt-3">
          <LeagueMatchSwitch
            activeToggle={activeTab}
            setActiveToggle={setActiveTab}
          />
        </div>
        {/* <div className="translate-y-px translate-x-4">
          <LeagueSlider
            leagues={latestMatches?.map((league) => league)}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
            className="!border-none"
          />
        </div> */}
      </div>
      <RenderComponent />
    </Block>
  );
}
