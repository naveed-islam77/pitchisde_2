import { TeamCardSkeleton } from "@/components/Skeletons/team-skeletons/team-card-skeleton";
import { useEffect, useRef, useState } from "react";

function Players({
  title = "Top Scorers",
  seasons,
  players,
  config,
  isLoading,
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setScrolled(scrollRef.current.scrollTop > 0);
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (!players || players.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
        <h3 className="px-4 py-3 text-lg font-bold">{title}</h3>
        <div className="px-4 py-3 text-gray-500">No players found</div>
      </div>
    );
  }

  const firstPlayer = players[0];

  const getValue = (player: any) => {
    if (config?.valueFormatter) return config.valueFormatter(player);
    return player[config?.valueKey];
  };

  if (isLoading) {
    return <TeamCardSkeleton />;
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
      <h3 className="px-4 py-3 text-2xl font-bold">{title}</h3>

      <div
        className={`flex items-center px-4 py-3 z-10 ${
          scrolled ? "shadow-md" : ""
        } transition-shadow duration-200`}
      >
        <div className="relative">
          <img
            src={firstPlayer?.team_logo}
            className="size-14 shrink-0 rounded-full bg-dark/50"
          />
          <img
            src={firstPlayer?.league_logo}
            className="w-7 absolute -right-4 top-4 rounded-full border bg-gray-400"
          />
        </div>
        <div className="ml-8 flex flex-1 flex-col justify-center">
          <p className="font-bold text-base leading-none">
            {firstPlayer?.player_name}
          </p>
          {config?.extra && (
            <span className="mt-1 text-sm font-bold text-dark/70">
              {config.extra(firstPlayer)}
            </span>
          )}
        </div>
        <p className="ml-auto text-base font-bold bg-green-900 rounded-full px-4 text-white">
          {getValue(firstPlayer)}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="max-h-96 overflow-y-auto scroll-smooth ml-2"
      >
        {players
          ?.sort((a, b) => b[config?.valueKey] - a[config?.valueKey])
          ?.slice(1, 10)
          .map((player, i) => (
            <div
              key={i}
              className="flex items-center border-t-[2px] border-gray-300 px-4 py-3"
            >
              <div className="relative">
                <img
                  src={player?.team_logo}
                  className="size-10 shrink-0 rounded-full bg-dark/50"
                />
                <img
                  src={player?.league_logo}
                  className="w-5 absolute -right-2 top-3 rounded-full border bg-gray-400"
                />
              </div>
              <div className="ml-10 flex flex-1 flex-col justify-center">
                <p className="text-sm leading-none">{player?.player_name}</p>
                {config?.extra && (
                  <span className="mt-1 text-xs font-bold text-dark/70">
                    {config.extra(player)}
                  </span>
                )}
              </div>
              <p className="ml-auto text-sm font-bold">{getValue(player)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Players;
