import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  useGetLeagueTots,
  useGetLeagueTotsCoach,
  useGetLeagueTotsRounds,
  useGetTeamTots,
} from "@/features/LeagueDetail/useGetLeagues";

import { arrangePlayersByFormation, getFormations } from "@/helpers/league";
import { useLeagueBanner } from "../League/useLeagueBanner";

export function useTeamOfWeek() {
  const { leagueBannerData, teamBanner } = useLeagueBanner();
  const router = useRouter();
  const { leagueId, teamId, season } = router.query;

  const isTeam = Boolean(teamId);
  const seasonId = season
    ? season
    : isTeam
    ? teamBanner?.[0]?.season_id
    : leagueBannerData?.[0]?.season_id;

  const [selectedRound, setSelectedRound] = useState("");
  const [selectedFormation, setSelectedFormation] = useState<string | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const { data: rounds } = useGetLeagueTotsRounds({ seasonId });


  const { data: tots } = isTeam
    ? useGetTeamTots({ seasonId, teamId })
    : useGetLeagueTots({ seasonId, round: selectedRound });

  console.log("selectedRound", selectedRound);

  const { data: coach } = useGetLeagueTotsCoach({ seasonId });

  // ========================
  // Formation + grouping
  // ========================
  const formations = getFormations(tots);
  const grouped: any = arrangePlayersByFormation(tots || [], selectedFormation);

  useEffect(() => {
    if (formations.length > 0 && selectedFormation === null) {
      setSelectedFormation(formations[0]?.formation);
    }
  }, [formations]);

  useEffect(() => {
    if (rounds?.length > 0 && !selectedRound) {
      setSelectedRound(rounds[1]?.value);
    }
  }, [rounds]);

  const isEmpty =
    grouped &&
    Object.values(grouped).every(
      (arr) => Array.isArray(arr) && arr.length === 0
    );

  const currentFormationTots = tots?.filter(
    (player) => player.formation === selectedFormation
  );

  const avg_rating =
    currentFormationTots && currentFormationTots.length > 0
      ? currentFormationTots.reduce(
          (acc, tot) => acc + (tot?.avg_rating || 0),
          0
        ) / currentFormationTots.length
      : 0;

  // ========================
  // Return
  // ========================
  return {
    mode: isTeam ? "team" : "league",
    rounds,
    tots,
    selectedRound,
    setSelectedRound,
    selectedFormation,
    setSelectedFormation,
    selectedTab,
    setSelectedTab,
    formations,
    grouped,
    isEmpty,
    avg_rating,
    coach,
  };
}
