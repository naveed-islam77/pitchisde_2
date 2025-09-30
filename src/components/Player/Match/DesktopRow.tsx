import RedCard from "@/components/GameCards/RedCard";
import YellowCard from "@/components/GameCards/YellowCard";
import { getRatingColor } from "@/features/MatchDetail/matchHelpers";
import clsx from "clsx";
import { startProgress, stopProgress } from "next-nprogress-bar";
import Image from "next/image";
import { useRouter } from "next/router";

function DesktopRow({ match }) {
  const router = useRouter();

  const ratingColor = (ratingValue) => {
    return ratingValue >= 9.0
      ? "bg-info"
      : ratingValue >= 7.5
      ? "bg-primary"
      : ratingValue >= 6.0
      ? "bg-warning"
      : ratingValue >= 5.0
      ? "bg-danger"
      : "bg-dark";
  };

  const navigateToFixture = () => {
    startProgress();
    router.push(`/match/${match.fixture_id}`).finally(() => stopProgress());
  };

  return (
    <div
      onClick={navigateToFixture}
      className="flex justify-center md:justify-between items-center border-b py-2 px-4 hover:bg-gray-200 cursor-pointer"
    >
      {/* LEFT (time) */}
      <div className="min-w-[6rem] hidden md:block text-left">
        <span className="font-medium text-gray-700">{match.starting_at}</span>
      </div>

      {/* CENTER (teams + score) */}
      <div
        className="grid gap-3 items-center"
        style={{
          gridTemplateColumns:
            "minmax(5rem, 1fr) 2rem auto 2rem minmax(5rem, 1fr)",
        }}
      >
        {/* Home team name */}
        <span
          className={clsx(
            "justify-self-end text-gray-700 text-right",
            match?.goals_home > match?.goals_away ? "font-bold" : "font-medium"
          )}
        >
          {match?.home_team_name}
        </span>

        {/* Home logo */}
        <Image
          unoptimized
          width={250}
          height={250}
          src={match?.home_team_logo}
          className="w-7 md:w-8"
          alt={match?.home_team_name}
        />

        {/* Score */}
        <div className="text-center text-xl font-bold text-gray-700 xl:text-xl">
          <span>{match?.goals_home}&nbsp;</span>
          <span>-</span>
          <span>&nbsp;{match?.goals_away}</span>
        </div>

        {/* Away logo */}
        <Image
          unoptimized
          width={250}
          height={250}
          src={match?.away_team_logo}
          className="w-7 md:w-8"
          alt={match?.away_team_name}
        />

        {/* Away team name */}
        <span
          className={clsx(
            "text-gray-700",
            match?.goals_home < match?.goals_away ? "font-bold" : "font-medium"
          )}
        >
          {match?.away_team_name}
        </span>
      </div>

      {/* RIGHT (player stats) */}
      <div className="md:grid hidden grid-cols-7 gap-3">
        {/* Minutes or bench */}
        <div className="flex justify-center items-center w-10 h-10">
          <span className="text-lg font-bold text-primary">
            {match?.player_minutes ? (
              match?.player_minutes
            ) : (
              <Image
                src={"/mig/icons/bench-svgrepo-com.svg"}
                alt="Bench"
                width={20}
                height={20}
              />
            )}
          </span>
        </div>

        {/* Goals */}
        {match?.player_goals ? (
          <div className="relative flex justify-center items-center w-10 h-10">
            <Image
              width={24}
              height={24}
              alt="Football icon"
              src="/mig/icons/football.png"
              className="w-6"
            />
            <span
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center w-4 h-4 text-xs rounded-full 
              bg-danger text-white"
            >
              {match?.player_goals}
            </span>
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}

        {/* Assists */}
        {match?.player_assists ? (
          <div className="relative flex justify-center items-center w-10 h-10">
            <Image
              width={24}
              height={24}
              alt="Sneaker icon"
              src="/mig/icons/sneaker.png"
              className="w-6"
            />
            <span
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center w-4 h-4 text-xs rounded-full 
              bg-danger text-white"
            >
              {match?.player_assists}
            </span>
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}

        {/* Yellow cards */}
        {match?.player_yellow_cards ? (
          <div className="relative flex justify-center items-center w-10 h-10">
            <YellowCard />
            <span
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center w-4 h-4 text-xs rounded-full 
              bg-danger text-white"
            >
              {match?.player_yellow_cards}
            </span>
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}

        {/* Red cards */}
        {match?.player_red_cards ? (
          <div className="relative flex justify-center items-center w-10 h-10">
            <RedCard />
            <span
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center w-4 h-4 text-xs rounded-full 
              bg-danger text-white"
            >
              {match?.player_red_cards}
            </span>
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}

        {/* Rating */}
        <div className="flex justify-center items-center w-10 h-10">
          {match?.player_rating ? (
            <span
              className={clsx(
                "px-2 py-0 text-sm font-semibold text-white rounded-full",
                getRatingColor(match?.player_rating)
              )}
            >
              {match?.player_rating}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DesktopRow;
