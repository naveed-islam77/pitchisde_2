import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function TopCardCompetition({ league }) {
  const [favourite, setFavourite] = useState<number[]>([]);

  const toggleFavourite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isAlreadyFavourite = favourite.includes(league.league_id);

    if (isAlreadyFavourite) {
      setFavourite(favourite.filter((id) => id !== league.league_id));
    } else {
      setFavourite([...favourite, league.league_id]);
    }
  };

  return (
    <Link
      href={`/league/${league.league_id}/overview`}
      className="flex gap-2 items-center px-4 py-2 hover:bg-dark/10 transition duration-200"
    >
      <Image
        width={100}
        height={100}
        src={league.league_logo}
        className="size-7"
        alt={league.league}
      />
      <p className="text-base font-semibold text-dark whitespace-nowrap">
        {league?.league}
      </p>
      <button
        type="button"
        // onClick={(e) => toggleFavourite(e)}
        className="ml-auto"
      >
        {favourite.includes(league.league_id) ? (
          <IconStarFilled
            size={20}
            className="text-warning"
            onClick={toggleFavourite}
          />
        ) : (
          <IconStar
            size={20}
            className="text-dark/70"
            onClick={toggleFavourite}
          />
        )}
      </button>
    </Link>
  );
}
