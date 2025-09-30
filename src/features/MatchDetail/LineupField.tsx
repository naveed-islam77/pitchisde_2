import { Block } from "@/components/Block";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import LineUpDetails from "./LineUpDetails";
import { StatsTable } from "./StatsTable";

const CustomTitle = ({
  activeToggle,
  setActiveToggle,
  setShowPlayerStatistics,
  showPlayerStatistics,
  leftLineupText = "Lineups",
  rightLineupText = "Statistics",
}) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center space-x-2">
      <p>{leftLineupText}</p>
      <Switch
        id="airplane-mode"
        style={{ backgroundColor: "#333" }}
        checked={showPlayerStatistics}
        onCheckedChange={setShowPlayerStatistics}
      />
      <p>{rightLineupText}</p>
    </div>
    <div className="flex gap-2 bg-gray-200 rounded-full p-1">
      <button
        className={`text-sm px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors duration-300 ease-in-out ${
          activeToggle === "rating"
            ? "bg-white text-x-bargreen"
            : "text-gray-600"
        }`}
        onClick={() => setActiveToggle("rating")}
      >
        Rating
      </button>
      <button
        className={`text-sm px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors duration-300 ease-in-out ${
          activeToggle === "age" ? "bg-white text-x-bargreen" : "text-gray-600"
        }`}
        onClick={() => setActiveToggle("age")}
      >
        Age
      </button>
      <button
        className={`text-sm px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors duration-300 ease-in-out ${
          activeToggle === "country"
            ? "bg-white text-x-bargreen"
            : "text-gray-600"
        }`}
        onClick={() => setActiveToggle("country")}
      >
        Country
      </button>
    </div>
  </div>
);

export default function LineupField({
  setShowPlayerStatistics,
  showPlayerStatistics,
  lineupText = "Lineups",
}) {
  const [activeToggle, setActiveToggle] = useState<
    "rating" | "age" | "country"
  >("rating");

  return (
    <Block
      title={
        <CustomTitle
          activeToggle={activeToggle}
          setActiveToggle={setActiveToggle}
          setShowPlayerStatistics={setShowPlayerStatistics}
          showPlayerStatistics={showPlayerStatistics}
          leftLineupText={lineupText}
        />
      }
      showNextButton={false}
      padding={false}
    >
      {!showPlayerStatistics ? (
        <LineUpDetails activeToggle={activeToggle} />
      ) : showPlayerStatistics ? (
        <StatsTable activeToggle={activeToggle} />
      ) : null}
    </Block>
  );
}
