import SeasonSelect from "@/components/Player/Match/SeasonSelect";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

export default function PlayerTitle({ playerDetails, seasons }) {
  const [selectedSeason, setSelectedSeason] = useState("");
  return (
    <div className="flex flex-col h-full items-center gap-x-3 text-neutral-600">
      <div className="p-1 rounded-lg bg-white">
        <Image
          width={250}
          height={250}
          className="object-contain size-16 rounded-full border"
          src={playerDetails?.player_image}
          alt={playerDetails?.player_name}
        />
      </div>
      <div className="text-center">
        <h2 className=" text-lg font-bold sm:text-xl">
          {playerDetails?.player_name}
        </h2>
        <div className="flex items-center gap-2">
          <Image
            src={playerDetails?.team_logo}
            className="size-8 object-contain"
            width={250}
            height={250}
            alt={`team-${playerDetails?.team_name}`}
          />
          <h5 className="font-semibold">
            {playerDetails?.team_name} #{playerDetails?.jersey_number}
          </h5>
        </div>
      </div>
      <PlayerInfo info={playerDetails} />
      <SeasonSelect
        seasons={seasons}
        onChange={(value) => setSelectedSeason(value)}
      />
    </div>
  );
}

function PlayerInfo({ info }) {
  const { height, weight, date_of_birth, height_imp, weight_imp } = info || {};

  return (
    <>
      <ul
        className={clsx(
          " h-full flex items-center gap-8 text-center max-xl:pt-10 sm:grid-cols-3 mt-2 [&_h2]:font-bold max-w-4xl"
        )}
      >
        <li>
          <h2>{dayjs().diff(dayjs(date_of_birth), "year")}</h2>
          <h4>{dayjs(date_of_birth).format("DD MMM YYYY")}</h4>
        </li>

        <li>
          <h2>{height ? `${height}` : ""}</h2>
          <h4>{height_imp ? `${height_imp}` : ""}</h4>
        </li>
        <li>
          <h2>{weight ? `${weight}` : ""}</h2>
          <h4>{weight_imp ? `${weight_imp}` : ""}</h4>
        </li>
      </ul>
    </>
  );
}
