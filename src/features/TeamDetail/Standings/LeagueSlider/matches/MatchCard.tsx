import clsx from "clsx";
import dayjs from "dayjs";
import { startProgress, stopProgress } from "next-nprogress-bar";
import Image from "next/image";
import { useRouter } from "next/router";

let formColorMap = {
  win: "#00985F",
  loss: "#DD3636",
  draw: "#8D9499",
};

function MatchCard({ fixture, isPrevious, activeLeague }) {
  const router = useRouter();

  const navigateToFixture = () => {
    if (isPrevious) {
      startProgress();
      router.push(`/match/${fixture.fixture_id}`).finally(() => stopProgress());
    }
  };

  const scoreDisplay = isPrevious ? (
    <div
      style={{
        backgroundColor: formColorMap[fixture?.result],
      }}
      className={clsx(
        "px-2 py-[2px] font-semibold text-center text-white text-sm rounded-md"
      )}
    >
      {fixture?.goals_home} - {fixture?.goals_away}
    </div>
  ) : (
    <div
      className={clsx(
        "px-3 text-center text-white font-semibold bg-[#00985F] py-[2px] text-sm rounded-md"
      )}
    >
      {dayjs(fixture.starting_at).format("DD MMM")}
      <br />
    </div>
  );

  return (
    <div
      onClick={navigateToFixture}
      className="grid grid-cols-12 items-center text-primary cursor-pointer select-none gap-4 w-full"
    >
      <div className="flex col-span-5 items-center gap-2 justify-end place-content-center">
        <h1 className="text-right font-bold">{fixture?.home_team_name}</h1>
        <Image
          src={fixture?.home_team_logo}
          width={250}
          height={250}
          className="size-7"
          alt={fixture?.league_name}
          title={fixture?.league_name}
        />
        <span className="text-xs">{fixture?.goals_home}</span>
      </div>
      <p className="col-span-2">
        {activeLeague === "" && (
          <Image
            src={fixture?.league_logo}
            width={250}
            height={250}
            className="size-4 my-1 mx-auto"
            alt={fixture?.league_name}
            title={fixture?.league_name}
          />
        )}
        {scoreDisplay}
      </p>

      <div className="flex col-span-5 items-center gap-2">
        <span className="text-xs">{fixture?.goals_away}</span>
        <Image
          src={fixture?.away_team_logo}
          width={250}
          height={250}
          className="size-7"
          alt={fixture?.away_team_name}
          title={fixture?.away_team_name}
        />
        <h1 className="font-bold">{fixture?.away_team_name}</h1>
      </div>
    </div>
  );
}

export default MatchCard;
