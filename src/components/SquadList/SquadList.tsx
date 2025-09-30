import Image from "next/image";
import Link from "next/link";

function SquadCell({
  player,
  type,
  coach,
}: {
  player?: any;
  type: string;
  coach?: any;
}) {
  const {
    jersey_number,
    position,
    player_id,
    player_image,
    player_name,
    player_country_name,
    player_country_flag,
    player_position,
  } = player;

  return (
    <Link
      href={`/player/${player_id}`}
      className="flex flex-col items-center shadow py-4 rounded-lg hover:bg-neutral-50 transition-all duration-200"
    >
      <Image
        src={player_image}
        width={150}
        height={150}
        alt={player_name}
        className="rounded-full size-12"
      />
      <h3 className="font-bold text-dark text-lg text-nowrap flex items-center gap-2">
        <p className="text-x-grey-1 text-sm">{jersey_number}</p>
        {`${player_name}`}
      </h3>
      <span>{player_position}</span>
      <Image
        title={player_country_name}
        height={512}
        width={512}
        src={player_country_flag}
        alt={player_country_name}
        className="rounded-full size-6 my-2"
      />
      <div>
        <div className="mb-1.5 text-sm font-semibold text-x-grey-1">
          {player_country_name}
        </div>
      </div>
    </Link>
  );
}

export function SquadList({ teams, isLoading }: any) {
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={`squad-loader-${i}`}
            className="relative overflow-x-hidden bg-gray-200 h-40 rounded-md"
          >
            <div className="shimmer-effect"></div>
          </div>
        ))}
      </div>
    );
  if (!teams) return null;

  const midfielders = teams?.filter(
    (item) => item?.player_position === "Midfielder"
  );
  const defenders = teams?.filter(
    (item) => item?.player_position === "Defender"
  );
  const attackers = teams?.filter(
    (item) => item?.player_position === "Attacker"
  );
  const goalkeepers = teams?.filter(
    (item) => item?.player_position === "Goalkeeper"
  );

  return (
    <div>
      <h1 className="font-bold text-dark text-xl mb-2">Goalkeepers</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        {goalkeepers?.map((player) => (
          <SquadCell type="player" key={player.player_id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Defenders</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        {defenders?.map((player) => (
          <SquadCell type="player" key={player.player_id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Midfielders</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        {midfielders?.map((player) => (
          <SquadCell type="player" key={player.player_id} player={player} />
        ))}
      </div>
      <h1 className="font-bold text-dark text-xl mb-2">Attackers</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        {attackers?.map((player) => (
          <SquadCell type="player" key={player.player_id} player={player} />
        ))}
      </div>
    </div>
  );
}
