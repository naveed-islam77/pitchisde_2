import { PresenterPropsR } from "@/utils/types";
import clsx from "clsx";
import Image from "next/image";
import { startProgress, stopProgress, useRouter } from "next-nprogress-bar";
import { formatDate } from "@/helpers/general";
import { format } from "date-fns";

function TeamSide({ label, icon }: PresenterPropsR) {
  return (
    <div className="flex mx-auto max-w-40 flex-col items-center space-y-2">
      <Image
        unoptimized
        src={icon}
        width={512}
        height={512}
        className="w-10"
        alt={label}
      />
      <p
        title={label}
        className="text-center max-w-40 truncate text-xs font-bold text-x-grey-1 w-max"
      >
        {label}
      </p>
    </div>
  );
}

export function ScheduledMatch({ fixture, isLoading }) {
  const router = useRouter();
  const {
    league_logo,
    league_name,
    starting_at,
    home_team_name,
    home_team_logo,
    home_team_position,
    away_team_name,
    away_team_logo,
    away_team_position,
  } = fixture || {};

  if (isLoading) {
    return (
      <div className="relative h-48 bg-gray-200 rounded-md">
        <div className="shimmer-effect"></div>
      </div>
    );
  }

  const navigateToFixture = () => {
    startProgress();
    router.push(`/match/${fixture.fixture_id}`);
  };

  return (
    <div
      onClick={navigateToFixture}
      className="grid grid-cols-12 items-center text-primary cursor-pointer select-none gap-4 w-full"
    >
      {/* Left side */}
      <div className="grid grid-cols-12 items-center w-full col-span-5 gap-2">
        <Image
          src={league_logo}
          width={100}
          height={100}
          className="w-5 h-5 col-span-2 justify-self-start"
          alt={league_name}
          title={league_name}
        />
        <h1
          className="font-bold leading-none col-span-5 truncate"
          title={home_team_name}
        >
          {home_team_name}
        </h1>
        <h1 className="text-xs leading-none text-gray-500 col-span-2 text-center">
          {home_team_position}
        </h1>
        <Image
          src={home_team_logo}
          width={108}
          height={100}
          className="w-7 h-7 col-span-3 justify-self-end"
          alt={home_team_name}
          title={home_team_name}
        />
      </div>

      {/* Match time (center) */}
      <p className="col-span-2 text-center font-medium text-sm">
        {format(starting_at, "dd MMM HH:mm")}
      </p>

      {/* Right side */}
      <div className="grid grid-cols-12 items-center w-full col-span-5 gap-2">
        <Image
          src={away_team_logo}
          width={100}
          height={100}
          className="w-7 h-7 col-span-3 justify-self-start"
          alt={away_team_name}
          title={away_team_name}
        />
        <h1 className="text-xs leading-none text-gray-500 col-span-2 text-center">
          {away_team_position}
        </h1>
        <h1
          className="font-bold leading-none col-span-7 truncate text-left"
          title={away_team_name}
        >
          {away_team_name}
        </h1>
      </div>
    </div>
  );
}
