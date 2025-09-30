import clsx from "clsx";
import styles from "./LeagueSlider.module.css";
import Image from "next/image";

export function LeagueSlider({
  leagues,
  selectedLeague,
  setSelectedLeague,
  hideAll = false,
  className,
}: any) {
  if (!leagues) return null;
  const uniqueLeagues = [
    ...new Map(leagues.map((league) => [league.league_id, league])).values(),
  ];

  const sortedLeagues = uniqueLeagues.sort((a: any, b: any) =>
    a.league_id < b.league_id ? -1 : a.league_id > b.league_id ? 1 : 0
  );

  return (
    <header
      className={clsx(
        "flex gap-x-2 border-b px-6 py-2 overflow-x-auto",
        className
      )}
    >
      {!hideAll && (
        <button
          data-active={selectedLeague === ""}
          onClick={() => setSelectedLeague("")}
          className={clsx(
            styles.league_slider,
            "text-lg font-bold text-primary"
          )}
        >
          All
        </button>
      )}
      {sortedLeagues.map((league: any) => (
        <button
          title={league.league_name}
          key={league.league_id}
          data-active={selectedLeague === league.league_id}
          onClick={() => setSelectedLeague(league.league_id)}
          className={clsx(styles.league_slider)}
        >
          <Image
            unoptimized
            width={250}
            height={250}
            src={league.league_logo}
            className="object-contain size-8"
            alt={league.league_name}
          />
        </button>
      ))}
    </header>
  );
}
