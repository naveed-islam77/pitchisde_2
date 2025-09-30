import { GoogleAds } from "@/components/GoogleAds";
import { SquadList } from "@/components/SquadList/SquadList";
import { useRouter } from "next/router";
import { useGetTeamSquad } from "../useTeams";
import { useTeam } from "@/contexts/Team/TeamContext";

export default function Squad() {
  const router = useRouter();
  const { teamId, season } = router.query;
  const { teamBanner } = useTeam();
  const seasonId = season ? season : teamBanner?.[0]?.season_id;

  const { data: teamSquad, isLoading } = useGetTeamSquad(
    teamId as string,
    seasonId as string
  );

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 shrink-0 space-y-5">
        <SquadList teams={teamSquad} isLoading={isLoading} />
      </div>
      <div className="shrink-0 space-y-5">
        {/* <TeamOfWeek /> */}
        <GoogleAds />
        {/* <NewsCarousel /> */}
      </div>
    </div>
  );
}
