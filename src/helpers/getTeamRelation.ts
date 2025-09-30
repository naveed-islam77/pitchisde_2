import { SeasonalHistory } from "@/types/league";


type ArcherRelation = {
  targetId: string;
  targetAnchor: "left" | "right" | "top" | "bottom";
  sourceAnchor: "left" | "right" | "top" | "bottom";
  style?: {
    endMarker?: boolean;
    strokeColor?: string;
    strokeDasharray?: string;
    noCurves?: boolean;
    // lineStyle?: string;
    offset?: number;
  };
};

export function getTeamRelation(params: {
  teamName: string;
  season: string;
  seasonIndex: number;
  allSeasons: string[];
  data: SeasonalHistory;
  hoveredTeamName: string | null;
  color: string;
}): ArcherRelation[] {
  const { teamName, seasonIndex, allSeasons, data, hoveredTeamName, color } = params;

  const nextSeason = allSeasons[seasonIndex + 1];
  if (!nextSeason || hoveredTeamName !== teamName) return [];

  const seasonNext: any = data[nextSeason] || [];


  const nextTeam = seasonNext?.find(
    (m) => m.team_name === teamName
  );

  if (!nextTeam) return [];

  return [
    {
      targetId: `${nextTeam.team_name}-${nextSeason}`,
      targetAnchor: "left",
      sourceAnchor: "right",
      style: { endMarker: false, strokeColor: color },
    },
  ];
}


const MAX_RANK = 26;

export const getElementId = (teamId: string, league: string, season: string) =>
  `team-${teamId}-${league}-${season}`;

export const getRankPosition = (rank: number | undefined) =>
  rank ? `${(rank / MAX_RANK) * 100}%` : "0%";

