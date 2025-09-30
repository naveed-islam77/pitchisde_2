import { Block } from "@/components/Block";
import { cn } from "@/lib/utils";

import { Player } from "./team-week-player";
import { RoundsDropdown } from "./team-week-rounds-option";
import { TeamWeekShareModal } from "./team-week-share-modal";
import { Tabs } from "./team-week-tabs";
import { useTeamOfWeek } from "./useTeamOfWeek";
import Image from "next/image";

export function TeamOfWeek() {
  const {
    rounds,
    selectedRound,
    setSelectedRound,
    selectedFormation,
    setSelectedFormation,
    selectedTab,
    setSelectedTab,
    formations,
    grouped,
    isEmpty,
    coach,
    avg_rating,
  } = useTeamOfWeek();

  const newsShadow = "0px 2px 10px 0px #00000040";

  const { rows, gk } = grouped || {};
  const coachDetails = coach?.[0];

  if (isEmpty) {
    return (
      <Block
        title={
          <div className="flex items-center gap-2">
            <RoundsDropdown
              rounds={rounds || []}
              selectedRound={selectedRound}
              onChange={setSelectedRound}
            />
          </div>
        }
        titleClassNaeme="!text-[#00401A] !text-[20px] font-semibold"
        contentClassName="!pb-2"
        style={{ boxShadow: newsShadow }}
      >
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md w-[370px]">
          <p className="text-center text-xl font-medium">No Team of the Week</p>
        </div>
      </Block>
    );
  }

  return (
    <Block
      title={
        <div className="flex items-center justify-center gap-2">
          <RoundsDropdown
            rounds={rounds || []}
            selectedRound={selectedRound}
            onChange={setSelectedRound}
          />
          <TeamWeekShareModal
            round={selectedRound}
            formation={selectedFormation}
            avg_rating={avg_rating}
            grouped={grouped}
            leagueTotsCoach={coach}
            selectedTab={selectedTab}
          />
        </div>
      }
      padding={false}
      style={{ boxShadow: newsShadow }}
      titleClassNaeme="!text-[#00401A] !text-[20px] font-semibold"
      showNextButton={false}
    >
      <div className="xl:w-[400px]">
        <div className="flex gap-2 py-2 px-2 overflow-x-auto scrollbar-hide">
          {formations.map((formation, index) => (
            <div
              key={index}
              className={cn(
                "bg-white flex items-center justify-center gap-2 px-2 py-1 border rounded-full whitespace-nowrap cursor-pointer min-w-[80px]",
                formation?.formation === selectedFormation &&
                  "bg-primary text-white"
              )}
              onClick={() => setSelectedFormation(formation?.formation)}
            >
              {formation?.is_best && (
                <Image
                  src={
                    selectedFormation === formation?.formation
                      ? "/mig/icons/pitchside-icon-white.png"
                      : "/mig/icons/pitchside-icon-black.png"
                  }
                  alt="pitchside-icon"
                  width={20}
                  height={20}
                  className="w-4 h-4 object-cover"
                />
              )}
              <span>{formation?.formation}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 bg-[#1F954E] rounded-b-xl">
          {/* board  */}
          <div className="bg-[#006428] flex justify-between items-center py-3">
            <Tabs setSelectedTab={setSelectedTab} />
            <div className="flex items-center pr-3 gap-2">
              <div>
                <h1 className="font-bold text-white">
                  {coachDetails?.coach_name}
                </h1>
                <p className="text-sm text-white">Manager</p>
              </div>
              <Image
                src={coachDetails?.coach_image}
                alt="coach"
                width={100}
                height={100}
                className="rounded-full w-10 h-10 object-cover"
              />
            </div>
          </div>
          {/* details  */}
          <div
            className="px-6 bg-center bg-contain bg-no-repeat py-4 h-[530px] grid"
            style={{
              backgroundImage: `url('/mig/positions/week_pitch.png')`,
              gridTemplateRows: `repeat(${rows?.length + 1}, 1fr)`,
            }}
          >
            {/* Outfield rows */}
            {rows?.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="grid justify-center gap-6 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                }}
              >
                {row.map((player, index) => (
                  <div
                    key={`row-${rowIndex}-player-${index}`}
                    className="flex justify-center"
                  >
                    <Player player={player} selectedTab={selectedTab} />
                  </div>
                ))}
              </div>
            ))}

            {/* GK row */}
            <div className="grid grid-cols-3 items-center">
              <div></div>
              <div className="flex justify-center">
                {gk && <Player player={gk} selectedTab={selectedTab} />}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
}
