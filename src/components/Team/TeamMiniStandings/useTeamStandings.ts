import { useTeam } from "@/contexts/Team/TeamContext";
import { useGetTeamStandings } from "@/features/TeamDetail/useTeams";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export function useTeamStandings() {
  const router = useRouter();
  const { query } = router;
  const { teamId, season: seasonId } = query;
  const { teamBanner } = useTeam();

  const season =
    teamBanner?.find((s: any) => s.season_id === Number(seasonId))
      ?.season_name || teamBanner?.[0]?.season_name;

  const [activeToggle, setActiveToggle] = useState<"overall" | "home" | "away">(
    "overall"
  );
  const [selectedRound, setSelectedRound] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const { standings, isLoading } = useGetTeamStandings(
    teamId as string,
    season,
    activeToggle,
    selectedRound
  );


  const sortedStandings = useMemo(() => {
    return standings?.sort((a, b) => a.position - b.position) ?? [];
  }, [standings]);

  const filteredStandings = useMemo(() => {
    if (!sortedStandings) return [];
    const result = sortedStandings.filter(
      (standing) => standing?.type?.toLowerCase() === activeToggle.toLowerCase()
    );
    return result.length > 0 ? result : sortedStandings;
  }, [sortedStandings, activeToggle]);

  const rounds = getStandingDropdown(standings);

  useEffect(() => {
    if (!selectedRound) {
      const currentRound = rounds.find((r) => r.isCurrent)?.round || "";
      setSelectedRound(currentRound);
    }
  }, [rounds, selectedRound]);

  useEffect(() => {
    if (!selectedLeague) {
      const currentLeague = standings?.[0]?.league_id || "";
      setSelectedLeague(currentLeague);
    }
  }, [standings, selectedLeague]);

  const standingsByRound = standings?.filter(
    (standing) => standing.round === selectedRound && standing?.league_id === selectedLeague
  );

  return {
    standings: filteredStandings,
    isLoading,
    activeToggle,
    setActiveToggle,
    selectedRound,
    setSelectedRound,
    rounds,
    standingsByRound,
    setSelectedLeague,
    selectedLeague,
  };
}

function getStandingDropdown(standings: any[]) {
  const rounds: any[] = [];

  standings?.forEach((standing) => {
    const exists = rounds.find((r) => r.round === standing.round);

    if (!exists) {
      rounds.push({
        round: standing.round,
        isCurrent: standing.is_current,
      });
    }
  });

  return rounds;
}
