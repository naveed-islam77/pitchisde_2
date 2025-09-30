import { useLineupData } from "@/hooks/fixture-hooks/useLineupData";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaShirt } from "react-icons/fa6";
import PlayerCard from "./lineups/PlayerCard";
import Sidelined from "./lineups/Sidelined";
import SoccerLineup from "./lineups/SoccerLineup";
import { getRatingColor, getSideLined } from "./matchHelpers";

const LineUpDetails = ({ activeToggle }: any) => {
  const router = useRouter();
  const { matchId } = router.query;
  const lineupData = useLineupData(matchId as string);

  if (!lineupData) return null;

  const {
    homeFormation,
    awayFormation,
    homeParticipant,
    awayParticipant,
    homeSubstitutes,
    awaySubstitutes,
    homeAverageRating,
    awayAverageRating,
    sidelinedPlayers,
    lineupsDetails,
  } = lineupData || {};

  return (
    <>
      <div className="bg-[#00973c] p-6">
        <div className="flex gap-6 mt-3">
          <div className="w-full h-full md:w-8/12">
            {/* Top manager and shirts part  */}
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2">
                <Image
                  src={homeParticipant?.team_logo || ""}
                  alt="home_log"
                  width={512}
                  height={512}
                  className="w-12 h-12  object-cover  rounded-full"
                />
                <span className="text-white font-semibold">
                  {homeParticipant?.formation}
                </span>
                <FaShirt
                  className="w-12 h-auto"
                  style={{ color: homeParticipant?.colours }}
                />
                <span
                  className={`px-2 rounded-full text-xs text-white ${getRatingColor(
                    homeAverageRating
                  )}`}
                >
                  {homeAverageRating?.toFixed(1) ?? "N/A"}
                </span>
                {/* <span className="px-2 bg-gray-600 rounded-full text-xs -ml-3 text-white">
                  {activeToggle === "age" && (homeAverageAge ?? "N/A")}
                </span> */}
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-white font-semibold text-right">
                    {homeParticipant?.coach_name}
                  </p>
                  <p className="text-white text-sm font-normal text-right">
                    Manager
                  </p>
                </div>
                <div>
                  <Image
                    width={512}
                    height={512}
                    unoptimized
                    src={homeParticipant?.coach_image || ""}
                    alt="Manager"
                    className="rounded-full w-12  object-cover h-auto"
                  />
                </div>
              </div>
            </div>

            <SoccerLineup
              awayFormation={awayFormation}
              homeFormation={homeFormation}
              activeToggle={activeToggle}
              lineupsDetails={lineupsDetails}
            />

            <div className="flex items-center mt-2 justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  src={awayParticipant?.team_logo || ""}
                  alt="away_log"
                  width={100}
                  height={100}
                  className="rounded-full object-cover object-center w-12 h-12"
                />
                <span className="text-white font-semibold">
                  {awayParticipant?.formation}
                </span>
                <FaShirt
                  className="w-12 h-auto"
                  style={{ color: awayParticipant?.colours }}
                />
                <span
                  className={`px-2 rounded-full text-xs text-white ${getRatingColor(
                    awayAverageRating
                  )}`}
                >
                  {awayAverageRating?.toFixed(1) ?? "N/A"}
                </span>
                {/* <span className="px-2 bg-gray-600 rounded-full text-xs -ml-3 text-white">
                  {activeToggle === "age" && (awayAverageAge ?? "N/A")}
                </span> */}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-white font-semibold text-right">
                      {awayParticipant?.coach_name}
                    </p>
                    <p className="text-white text-sm font-normal text-right">
                      Manager
                    </p>
                  </div>
                  <div>
                    <Image
                      width={512}
                      height={512}
                      unoptimized
                      src={awayParticipant?.coach_image || ""}
                      alt="Manager"
                      className="rounded-full w-12 bg-white object-cover h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative md:w-4/12 flex-col justify-between my-14 hidden md:flex">
            <PlayerCard
              substitutes={homeSubstitutes}
              // events={events}
              activeToggle={activeToggle}
            />
            <PlayerCard
              substitutes={awaySubstitutes}
              // events={events}
              activeToggle={activeToggle}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden bg-[#00973C] border-t border-[#006428] py-5">
        <div>
          <h1 className="text-center pb-5 text-xl font-semibold text-white">
            Home Subtitutes
          </h1>
          <PlayerCard
            substitutes={homeSubstitutes}
            // events={events}
            activeToggle={activeToggle}
          />
        </div>
        <div>
          <h1 className="text-center py-5 text-xl font-semibold text-white">
            Away Subtitutes
          </h1>
          <PlayerCard
            substitutes={awaySubstitutes}
            // events={events}
            activeToggle={activeToggle}
          />
        </div>
      </div>
      {/* Side Lined Players */}
      <div className="w-full">
        <div className="flex items-center justify-center py-3">
          <span className="text-[#00401A] font-semibold text-center  w-full text-lg">
            Sidelined
          </span>
        </div>

        <div className=" grid grid-cols-2">
          <Sidelined sidelined={getSideLined(sidelinedPlayers, "home")} />
          <Sidelined sidelined={getSideLined(sidelinedPlayers, "away")} />
        </div>
      </div>
    </>
  );
};

export default LineUpDetails;
