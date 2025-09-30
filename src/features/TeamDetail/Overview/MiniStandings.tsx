import { Block } from "@/components/Block";
import StandingLeague from "@/components/Team/TeamMiniStandings/StandingLeague";
import { useRouter } from "next/router";
import { useGetTeamMiniStandings } from "../useTeams";
import { useTeam } from "@/contexts/Team/TeamContext";

export function MiniStandings() {
  const router = useRouter();
  const team = useTeam();
  const teamBanner = team?.teamBanner;
  const { season, teamId } = router.query;
  const seasonId = Array.isArray(season) ? season[0] : season;

  let currentSeasonName: string | undefined;

  if (teamBanner && seasonId) {
    const match = teamBanner.find(
      (s: any) => String(s.season_id) === String(seasonId)
    );
    currentSeasonName = match?.season_name;
  } else if (teamBanner?.length) {
    currentSeasonName = [...teamBanner].sort(
      (a, b) => b.season_id - a.season_id
    )[0]?.season_name;
  }

  const { data } = useGetTeamMiniStandings(teamId as string, currentSeasonName);

  return (
    <Block
      onNextClick={() => {
        router.push(`/team/${teamId}/standings`);
      }}
      title="Standings"
    >
      <div className="grid grid-cols-[auto,1fr,auto,auto] gap-y-2">
        <div className="col-span-full grid grid-cols-subgrid gap-x-4 font-semibold text-dark">
          <h3>#</h3>
          <h3>Team</h3>
          <h3>P</h3>
          <h3>Pts</h3>
        </div>
      </div>

      {/* Example rendering if you want to loop leagues later */}
      {data?.length > 0 &&
        data.map((season: any) => (
          <StandingLeague
            key={season.id}
            activeSeason={season}
            isLoading={false}
            isSameTeam={false}
          />
        ))}
    </Block>
  );
}
