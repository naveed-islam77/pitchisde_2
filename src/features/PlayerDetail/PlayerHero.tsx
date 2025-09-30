import { Actions } from "@/components/DetailView/DetailView";
import Image from "next/image";
import PlayerTitle from "./PlayerTitle";
import { Block } from "@/components/Block";
import ActionMenu from "../LeagueDetail/Transfer/ActionMenu";

export default function PlayerHero({ playerBanner, isLoading }) {
  const playerDetails = playerBanner?.[0];

  if (isLoading) {
    return (
      <Block padding={false} showNextButton={false} className="my-3 shadow-md">
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  return (
    <div className="shadow-md rounded-3xl p-6 mb-8">
      <div className="relative">
        <ActionMenu />
      </div>
      <div className="flex flex-col justify-center md:grid grid-cols-3 items-center">
        <PositionInfo info={playerDetails} />
        <PlayerTitle playerDetails={playerDetails} seasons={playerBanner} />
        <Actions />
      </div>
    </div>
  );
}

function PositionInfo({ info }) {
  return (
    <div className="gap-2 text-neutral-700 hidden md:flex">
      <div className="hidden md:block w-full max-w-36">
        <PositionVisualizer detailedPosition={info?.player_detailed_position} />
      </div>
      <ul className="flex flex-col justify-between [&_h4]:font-semibold">
        <li>
          <h2 className="">{info?.player_position}</h2>
          <h4>{info?.player_detailed_position}</h4>
        </li>
        <li className="flex gap-2 items-center">
          {info?.preferred_foot ? (
            <Image
              width={100}
              height={100}
              src={`/mig/icons/${
                info?.preferred_foot === "Right Foot" ? "left" : "right"
              }-foot.svg`}
              className="h-8 w-auto "
              alt="Feet"
            />
          ) : (
            <span></span>
          )}
          <h4 className="capitalize w-16 leading-5">{info?.preferred_foot}</h4>
        </li>
        <li>
          <Image
            title={info?.player_country_name}
            width={512}
            height={512}
            style={{
              boxShadow: "0px 1px 4px 0px #00000040",
            }}
            src={info?.player_country_flag}
            className=" w-8 rounded-sm sm:w-10"
            alt={info?.player_country_name}
          />
          <h4>{info?.player_country_name}</h4>
        </li>
      </ul>
    </div>
  );
}

const PositionVisualizer = ({ detailedPosition }) => {
  console.log("detailedPosition", detailedPosition);
  // Position mapping with grid coordinates
  const positionMap = {
    // Goalkeeper
    Goalkeeper: "GK",

    // Defenders
    "Left Back": "LB",
    "Centre Back": "CB",
    "Right Back": "RB",

    // Midfielders
    "Defensive Midfield": "DM",
    "Centre Midfield": "CM",
    "Left Midfield": "LM",
    "Right Midfield": "RM",
    "Attacking Midfield": "AM",

    // Forwards
    "Centre Forward": "CF",
    "Left Wing": "LW",
    "Right Wing": "RW",
    "Second Striker": "ST",
  };

  const getPosition = (position) => {
    return positionMap[position] || "GK";
  };

  return (
    <div className="relative w-full max-w-lg mx-auto ">
      <Image
        src={`/mig/positions/${getPosition(detailedPosition)}.png`}
        alt="Player Position"
        width={722}
        height={1055}
        className="h-48 w-auto"
      />
    </div>
  );
};
