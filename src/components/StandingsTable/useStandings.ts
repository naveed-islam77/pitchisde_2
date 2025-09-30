import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useLeague } from "@/contexts/League/LeagueContext";
import { useGetLeagueStandings } from "@/features/LeagueDetail/useGetLeagues";

export function useStandings() {
  const router = useRouter();
  const { query } = router;
  const { leagueId, season: seasonId } = query;
  const { leagueBannerData } = useLeague();
  const season = seasonId || leagueBannerData?.[0]?.season_id;



  const [activeToggle, setActiveToggle] = useState<"overall" | "home" | "away">(
    "overall"
  );

  const [selectedRound, setSelectedRound] = useState("");

    const { standings, isLoading } = useGetLeagueStandings(
    leagueId as string,
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
      (standing) =>
        standing?.type?.toLowerCase() === activeToggle.toLowerCase()
    );
    return result.length > 0 ? result : sortedStandings;
  }, [sortedStandings, activeToggle]);

  return {
    standings: filteredStandings,
    isLoading,
    activeToggle,
    setActiveToggle,
    selectedRound,
    setSelectedRound,
  };
}
