import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VersusRowList } from "@/components/VersusView";
import { useGetLeagueRoundFixtures } from "@/features/LeagueDetail/useGetLeagues";
import { extractRoundStages } from "@/helpers/league";
import { getFixturesByRoundStage } from "@/helpers/math-helper";
import { useEffect, useState } from "react";
import { MatchRow } from "./MatchRow";

export function RoundMatches({ seasonId, fixturesData }) {
  // [data api]

  const [selectedRound, setSelectedRound] = useState("");
  const [currentRoundFixtures, setCurrentRoundFixtures] = useState<any>([]);

  const rounds: any = extractRoundStages(fixturesData);

  useEffect(() => {
    if (rounds.length > 0 && !selectedRound) {
      setSelectedRound(rounds[0]);
    }
  }, [rounds, selectedRound]);

  useEffect(() => {
    if (selectedRound) {
      const fixtures = getFixturesByRoundStage(fixturesData, selectedRound);
      setCurrentRoundFixtures(fixtures);
    }
  }, [selectedRound, fixturesData]);

  if (fixturesData?.length === 0)
    return <p className="text-center">No Upcoming Matches</p>;

  return (
    <div>
      <div className="bg-[#F2F2F2] flex justify-center py-5 shadow-md">
        <Select onValueChange={setSelectedRound} value={selectedRound}>
          <SelectTrigger className="w-[280px] bg-[#F2F2F2]">
            <SelectValue placeholder="Round" />
          </SelectTrigger>
          <SelectContent>
            {rounds.map((round, index) => (
              <SelectItem key={index} value={round}>
                {round}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {currentRoundFixtures.map((match) => (
        <div key={match.fixture_id}>
          <VersusRowList>
            <MatchRow match={match} />
          </VersusRowList>
        </div>
      ))}
    </div>
  );
}
