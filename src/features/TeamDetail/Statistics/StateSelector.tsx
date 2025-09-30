import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StateSelector = ({
  uniqueLeagues,
  setActiveState,
  activeState,
  leagues,
  setActiveLeague,
  activeLeague,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Domestic  */}
      <div
        className={cn(
          "bg-white border rounded-full flex items-center w-max px-3 py-1 font-semibold my-5 cursor-pointer text-gray-600",
          activeState === "domestic" && "bg-gray-200"
        )}
        onClick={() => setActiveState("domestic")}
      >
        <div className="flex items-center">
          {uniqueLeagues?.map((league: any) => (
            <Image
              src={league?.league_logo}
              alt={league?.league}
              key={league?.league}
              width={50}
              height={50}
              className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold mr-3"
            />
          ))}
        </div>
        Domestic
      </div>
      {/* League Selector  */}
      {leagues?.map((league: any) => (
        <div
          className={cn(
            "bg-white border rounded-full flex items-center p-2 font-semibold my-5 cursor-pointer text-gray-600",
            activeState === "league" &&
              activeLeague === league?.league_id &&
              "bg-gray-200"
          )}
          onClick={() => {
            setActiveState("league");
            setActiveLeague(league?.league_id);
          }}
        >
          <Image
            src={league?.league_logo}
            alt={league?.league}
            width={50}
            height={50}
            className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
          />
          {league?.league}
        </div>
      ))}
    </div>
  );
};

export default StateSelector;
