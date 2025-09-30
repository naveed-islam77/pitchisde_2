import { groupByLeague } from "@/helpers/fixture";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetTeamCupHistory, useGetTeamHistory } from "../useTeams";
import { getUniqueLeagues } from "./helper";
import StateSelector from "./StateSelector";
import StageTimeline from "./TeamCupHistory";
import TeamHistoryChart from "./TeamHistoryChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TeamHistory = () => {
  const { teamId } = useParams();
  const { data } = useGetTeamHistory(teamId as string);
  const { data: cupData } = useGetTeamCupHistory(teamId as string);
  const [activeState, setActiveState] = useState("domestic");
  const [activeLeague, setActiveLeague] = useState("");

  const groupHistory = groupByLeague(cupData || []);
  const uniqueLeaguesCup = getLeagues(cupData || []);
  const uniqueLeagues = getUniqueLeagues(data);

  const activeLeagueData = groupHistory[activeLeague] || [];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-2xl mx-auto">
      {/* topbar  */}
      <StateSelector
        uniqueLeagues={uniqueLeagues}
        setActiveState={setActiveState}
        activeState={activeState}
        leagues={uniqueLeaguesCup}
        setActiveLeague={setActiveLeague}
        activeLeague={activeLeague}
      />
      {activeState === "domestic" ? (
        <TeamHistoryChart data={data} />
      ) : (
        <StageTimeline seasonPerformance={activeLeagueData} />
      )}
    </div>
  );
};

export default TeamHistory;

function getLeagues(data: any[]) {
  const leagues: any[] = [];
  const seen = new Set<string>();

  data.forEach((item) => {
    if (!seen.has(item.league_name)) {
      seen.add(item.league_name);
      leagues.push(item);
    }
  });

  return leagues;
}
