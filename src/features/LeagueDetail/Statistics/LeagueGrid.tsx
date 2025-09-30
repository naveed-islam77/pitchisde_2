import { useHover } from "@/contexts/League/useHover";
import { getTeamRelation } from "@/helpers/getTeamRelation";
import { getSeasons, groupBySeason } from "@/helpers/league";
import { useRouter } from "next/router";
import { ArcherContainer, ArcherElement } from "react-archer";
import { usegetStatisticsSeasons } from "../useGetLeagues";
import TeamPopover from "@/components/Team/TeamPopover";

const LeagueGrid = () => {
  const router = useRouter();
  const { leagueId } = router.query;

  const { data: seasonData } = usegetStatisticsSeasons(leagueId as string);

  const { setHoveredTeamName, hoveredTeamName } = useHover();

  const seasonsTeams = groupBySeason(seasonData);
  const allSeasons = getSeasons(seasonData);

  return (
    <div className="relative overflow-x-auto space-y-6 p-4 bg-white">
      <ArcherContainer
        strokeColor="red"
        strokeWidth={2}
        className="w-full h-full relative"
      >
        <div className="flex gap-10">
          {allSeasons?.map((season, seasonIndex) => {
            const teams = seasonsTeams[season];

            return (
              <div key={season} className="flex flex-col items-center gap-2">
                <h2 className="font-bold text-lg">{season}</h2>

                {teams.map((team: any) => {
                  const id = `${team.team_name}-${season}`;
                  const relations = getTeamRelation({
                    teamName: team.team_name,
                    season,
                    seasonIndex,
                    allSeasons,
                    data: seasonsTeams,
                    hoveredTeamName,
                    color: team.team_colour,
                  });
                  return (
                    <div className="flex flex-col items-center cursor-pointer">
                      <ArcherElement id={id} relations={relations}>
                        <div>
                          <TeamPopover team={team}>
                            <img
                              src={team.team_logo}
                              alt={team.team_name}
                              className="w-8 h-8 rounded-full border"
                              onMouseEnter={() =>
                                setHoveredTeamName(team.team_name)
                              }
                              onMouseLeave={() => setHoveredTeamName(null)}
                            />
                          </TeamPopover>
                        </div>
                      </ArcherElement>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default LeagueGrid;
