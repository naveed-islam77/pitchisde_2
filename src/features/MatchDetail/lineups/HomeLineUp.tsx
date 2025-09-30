import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getRatingColor, getStatTags } from "../matchHelpers";
import { groupedByRow } from "@/helpers/fixture";

const HomeLineUp = ({ homeLineups, activeToggle, formation }) => {
  if (!homeLineups || !formation) return null;

  const formationRows = formation?.split("-").map(Number);
  const fullFormation = [1, ...formationRows];
  const totalRows = fullFormation?.length;
  const groupedRows = groupedByRow(homeLineups);

  return (
    <div className="basis-1/2 relative w-full h-full">
      {fullFormation.map((playersInRow, rowIndex) => {
        const rowPlayers = groupedRows[rowIndex + 1] || [];
        const top = ((rowIndex + 0.5) / totalRows) * 100;

        return rowPlayers.map((lineup, colIndex) => {
          const rating = lineup?.rating;
          const playerAge = lineup?.player_age;
          const left = ((colIndex + 0.5) / playersInRow) * 100;
          const statTags = getStatTags([lineup]);

          return (
            <Link
              href={`/player/${lineup.player_id}`}
              key={lineup.player_id}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="z-10 absolute transition duration-300 flex flex-col justify-center items-center text-white"
            >
              <div className="bg-white rounded-full relative">
                <Image
                  width={512}
                  height={512}
                  unoptimized
                  src={lineup?.player_image}
                  alt={lineup.player_name}
                  className="rounded-full w-14 object-cover h-auto"
                />
                {statTags?.map((tag, index) => (
                  <div
                    key={`${lineup.id}-${tag.icon}-${index}`}
                    className={`absolute ${
                      tag.position === "top-center"
                        ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        : tag.position === "bottom-left"
                        ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                        : tag.position === "bottom-center"
                        ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                        : "top-1 right-0 translate-x-1/2 -translate-y-1/2"
                    }`}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={tag.icon}
                      alt={tag.icon}
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                ))}
                {activeToggle === "country" && lineup?.player_country && (
                  <Image
                    width={20}
                    height={20}
                    unoptimized
                    src={lineup?.player_country}
                    alt={lineup.player_name}
                    className="absolute -bottom-4 left-5 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                  />
                )}
                {activeToggle === "rating" && rating !== null && (
                  <span
                    className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                      rating
                    )} rounded-full text-xs flex items-center justify-center font-bold`}
                  >
                    {rating.toFixed(1)}
                  </span>
                )}
                {activeToggle === "age" && playerAge && (
                  <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {playerAge}
                  </span>
                )}
              </div>

              <span className="text-sm text-center max-w-[100px] pt-4">
                {lineup.jersey_number} {lineup?.player_name}
              </span>
            </Link>
          );
        });
      })}
    </div>
  );
};

export default HomeLineUp;
