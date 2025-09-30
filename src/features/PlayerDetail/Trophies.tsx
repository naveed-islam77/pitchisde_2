import Image from "next/image";
import { useRouter } from "next/router";

function Trophy({ team }) {
  const router = useRouter();
  return (
    <div className="  text-dark py-2">
      <header className="flex items-center gap-x-3 justify-between">
        <div className="flex items-center gap-x-3">
          <Image
            src={`${team?.team_logo || ""}`}
            className="w-12 h-auto"
            width={250}
            height={250}
            alt={team.team_name}
          />
          <div>
            <h2 className="font-bold text-xl">{team.league_name}</h2>
            <div
              className="flex items-center justify-center mt-2 gap-x-2 shadow-sm border rounded-full px-2 py-1 cursor-pointer"
              onClick={() =>
                router.push(
                  `/league/${team?.league_id}?season=${team?.season_id}`
                )
              }
            >
              <Image
                src={`${team?.league_logo || ""}`}
                className="w-6 rounded-full h-auto"
                width={100}
                height={100}
                alt={team.team_name}
              />
              <p className="font-semibold text-[#102c61]">
                {team?.season_name}
              </p>
            </div>
          </div>
        </div>
        <p className="text-2xl font-bold">{team.trophy_count}</p>
      </header>
    </div>
  );
}

export function Trophies({ trophies }) {
  return (
    <div className="divide-y">
      {trophies?.length
        ? trophies?.map((team: any, idx) => <Trophy key={idx} team={team} />)
        : "No Trophies"}
    </div>
  );
}

function groupByTeam(data) {
  return Object.values(
    data.reduce((acc, item) => {
      const { team_id } = item;

      if (!acc[team_id]) {
        acc[team_id] = {
          team_id,
          team: item.team,
          items: [],
        };
      }

      acc[team_id].items.push(item);
      return acc;
    }, {})
  );
}
