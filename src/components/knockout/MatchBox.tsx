import { useKnockout } from "@/contexts/knockOut/knockOutContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArcherElement } from "react-archer";
import TeamLogo from "./TeamLogo";
import Tooltip from "./KnockTooltip";
import CardBadge from "./CardBadge";

export const MatchBox = ({ match, relations, className }: any) => {
  const { hoveredTeam, setHoveredTeam } = useKnockout();
  const [hovered, setHovered] = useState(false);

  const teams = [match?.home_team_name, match?.away_team_name];
  const winner =
    match?.winner === String(match?.home_team_id)
      ? match?.home_team_name
      : match?.winner === String(match?.away_team_id)
      ? match?.away_team_name
      : null;

  const isTeamWinner = hoveredTeam && hoveredTeam === winner;
  return (
    <ArcherElement
      id={String(match?.match_num)}
      relations={
        relations?.map((rel: any) => ({
          targetId: String(rel.targetId),
          targetAnchor: rel.targetAnchor || "left",
          sourceAnchor: rel.sourceAnchor || "right",
          style: {
            strokeColor: isTeamWinner ? "#22c55e" : "#F0F0F0",
            lineStyle: "angle",
          },
        })) || []
      }
    >
      <div
        className={cn(
          `relative border rounded p-3 text-sm w-max md:w-48 text-center cursor-pointer transition
           bg-white hover:shadow-lg`,
          hoveredTeam && teams.includes(hoveredTeam) && "bg-[#f8f8f8]",
          className
        )}
        onMouseEnter={() => {
          setHovered(true);
          setHoveredTeam(winner);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setHoveredTeam(null);
        }}
        onClick={() => {
          console.log("match", match);
        }}
      >
        {/* Tooltip above (aggregate 1st leg) */}
        <Tooltip position="top" visible={hovered && match?.is_aggregate}>
          <TeamLogo
            src={match?.first_home_team_logo || match?.home_team_logo}
            alt="First Home Team Logo"
          />
          <p className="text-lg font-bold">
            {match?.first_fixture_score || "0 - 0"}
          </p>
          <TeamLogo
            src={match?.first_away_team_logo || match?.away_team_logo}
            alt="First Away Team Logo"
          />
        </Tooltip>

        {match?.stage_name === "Final" && (
          <CardBadge
            title={match?.stage_name}
            className="absolute -top-4 left-[32%] bg-yellow-400 px-3 py-1 rounded-md font-semibold uppercase text-xs"
          />
        )}

        {/* Match content */}
        <div className="flex justify-center items-center gap-2">
          {/* Home team */}
          <div className="flex gap-1 items-center flex-col">
            <TeamLogo src={match?.home_team_logo} alt="Home Team Logo" />
            <div className="flex gap-1 items-center text-xs">
              <p>{match?.home_team_position}</p>
              <p className="font-extrabold">{match?.home_team_name}</p>
            </div>
          </div>

          {/* Score */}
          <div className="font-bold gap-3 items-center hidden screen-900:flex">
            <div
              className={cn(
                "text-lg",
                match?.stage_name === "Final" && "text-2xl"
              )}
            >
              {match?.home_score}
            </div>
            <div className="text-gray-400">{match?.state}</div>
            <div
              className={cn(
                "text-lg",
                match?.stage_name === "Final" && "text-2xl"
              )}
            >
              {match?.away_score}
            </div>
          </div>

          {/* Away team */}
          <div className="flex gap-1 items-center flex-col">
            <TeamLogo src={match?.away_team_logo} alt="Away Team Logo" />
            <div className="flex gap-2 items-center text-xs">
              <p>{match?.away_team_position}</p>
              <p className="font-extrabold">{match?.away_team_name}</p>
            </div>
          </div>
        </div>
        {/* Mobile Score  */}
        <div className="font-bold gap-3 flex justify-center items-center screen-900:hidden">
          <div
            className={cn(
              "text-lg",
              match?.stage_name === "Final" && "text-2xl"
            )}
          >
            {match?.home_score}
          </div>
          <div className="text-gray-400">{match?.state}</div>
          <div
            className={cn(
              "text-lg",
              match?.stage_name === "Final" && "text-2xl"
            )}
          >
            {match?.away_score}
          </div>
        </div>

        {/* Tooltip below (aggregate 2nd leg) */}
        <Tooltip position="bottom" visible={hovered && match?.is_aggregate}>
          <TeamLogo
            src={match?.second_home_team_logo || match?.away_team_logo}
            alt="Second Home Team Logo"
          />
          <p className="text-lg font-bold">
            {match?.second_fixture_score || "0 - 0"}
          </p>
          <TeamLogo
            src={match?.second_away_team_logo || match?.home_team_logo}
            alt="Second Away Team Logo"
          />
        </Tooltip>
      </div>
    </ArcherElement>
  );
};
