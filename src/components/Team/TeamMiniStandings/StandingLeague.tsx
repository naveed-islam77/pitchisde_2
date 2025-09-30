import StandingsTableSkeleton from "@/components/Skeletons/StandingsTableSkeleton";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const StandingLeague = ({ activeSeason, isLoading, isSameTeam }) => {
  if (isLoading) return <StandingsTableSkeleton />;

  return (
    <div className="space-y-4">
      <Seperator
        image_path={activeSeason.league_logo}
        name={activeSeason.league_name}
      />

      <div className="space-y-2">
        <Row standing={activeSeason} />
      </div>
    </div>
  );
};

export default StandingLeague;

function Row({ standing }) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto,auto] gap-y-2 items-center gap-x-4">
      <div className={clsx("relative py-2 w-4")}>{standing?.position}</div>
      <div className=" flex items-center gap-x-3">
        <Image
          width={100}
          height={100}
          src={standing?.team_logo}
          className="w-7"
          alt={`${standing.team_name} logo`}
        />
        <Link
          className="hover:underline underline-offset-2"
          href={`/team/${standing?.team_id}/overview`}
        >
          {standing?.team_name}
        </Link>
      </div>
      <span className="text-center font-semibold text-dark">
        {standing?.matches_played}
      </span>
      <span className="text-center font-semibold text-dark">
        {standing?.points}
      </span>
    </div>
  );
}

function Seperator({ image_path, name }) {
  return (
    <div className="col-span-full flex items-center justify-center gap-x-1.5">
      <Image
        unoptimized
        width={512}
        height={512}
        src={image_path}
        className="w-7"
        alt={name}
      />

      <p className="font-bold">{name}</p>
    </div>
  );
}
