import clsx from "clsx";
import { LeagueFilterProps } from "./head-to-head-types";

function LeagueFilter({
  leagues,
  selectedLeague,
  setSelectedLeague,
  matches,
  homeOnly,
  setHomeOnly,
}: LeagueFilterProps) {
  const home_team_logo = matches?.[0]?.home_team_logo || null;
  return (
    <div className="flex flex-col w-full px-4">
      <p className=" py-2 text-lg font-semibold text-x-bargreen">
        Head to Head
      </p>
      <div className="flex items-center justify-between  pt-1">
        <div className="flex gap-2 overflow-x-auto">
          {/* leagues filters  */}
          {leagues?.map((league: any) => {
            // const matchForLeague: any = matches.find(
            //   (m: any) => m?.league_name === league
            // );
            return (
              <button
                key={league}
                onClick={() => setSelectedLeague(league.name)}
                className={clsx(
                  "inline-flex items-center justify-center gap-1 size-10 rounded-full transition-colors",
                  selectedLeague === league.name
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                )}
              >
                {league.name === "All" ? (
                  <span className="text-sm">All</span>
                ) : (
                  <img
                    src={league?.logo}
                    alt={league.name}
                    className="w-6 h-6"
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setHomeOnly(!homeOnly);
          }}
          className={clsx(
            "flex items-center gap-2 px-3 py-1 rounded-full transition-colors",
            homeOnly ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          )}
        >
          <img src={home_team_logo} alt="Home team" className="w-6 h-6" />
          <span className="text-sm">Home</span>
        </button>
      </div>
    </div>
  );
}

export default LeagueFilter;
