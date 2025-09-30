import { useTeam } from "@/contexts/Team/TeamContext";
import {
  IconBuildingStadium,
  IconChartBar,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";

function Social() {
  const team: any = useTeam();
  const { data } = team || {};
  const rankings = data?.rankings;
  const venue = data?.venue;
  const hasRankings = rankings?.length;

  return (
    <div id="Social" className="h-full hidden md:block">
      <ul className="space-y-2 text-dark font-display">
        {venue && (
          <li>
            <div className="flex items-center gap-3 ">
              <IconBuildingStadium />
              <span className="text-lg">{venue.name}</span>
            </div>
          </li>
        )}

        <li>
          <div className="flex items-center gap-3 ">
            <IconUsersGroup />
            <span className="text-lg">10,000</span>
          </div>
        </li>

        <li>
          <a
            target="__blank"
            href="#"
            className="flex items-center gap-3 hover:underline"
          >
            <IconWorld />
            <span className="text-lg">Website</span>
          </a>
        </li>
        {hasRankings ? (
          <li>
            <div className="flex items-center gap-3 ">
              <IconChartBar />
              <span className="text-lg">
                {rankings[0]?.type} Ranking: {rankings[0]?.position}
              </span>
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default Social;
