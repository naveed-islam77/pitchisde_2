import { groupByLineupType } from "@/helpers/fixture";
import GoalField from "../GoalField";
import AwayLineUp from "./AwayLineUp";
import HomeLineUp from "./HomeLineUp";

const SoccerLineup = ({
  awayFormation,
  homeFormation,
  activeToggle,
  lineupsDetails,
}) => {
  const groupedData = groupByLineupType(lineupsDetails || []);
  const homeLineups = groupedData["starter"]?.filter(
    (lineup: any) => lineup?.side === "home"
  );
  const awayLineups = groupedData["starter"]?.filter(
    (lineup: any) => lineup?.side === "away"
  );

  return (
    <div className="relative w-full flex gap-10">
      <div className="flex-1 lg:h-[960px] md:h-[968px] h-[1000px] relative border-[5px] border-[#006428] lineup-field-container">
        <div className="absolute mt-0 left-1/2 -translate-x-1/2 w-1/2">
          <GoalField className="-mt-[5px]" />
        </div>

        <div className="player-field-container basis-full h-full flex flex-col justify-center divide-y-4 divide-[#006428]">
          <HomeLineUp
            homeLineups={homeLineups}
            activeToggle={activeToggle}
            formation={homeFormation}
          />
          <AwayLineUp
            activeToggle={activeToggle}
            awayLineups={awayLineups}
            formation={awayFormation}
          />
        </div>
        <div className="goal-field-container absolute left-1/2 bottom-0 -translate-x-1/2 w-1/2">
          <GoalField className="-mb-[5px] rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default SoccerLineup;
