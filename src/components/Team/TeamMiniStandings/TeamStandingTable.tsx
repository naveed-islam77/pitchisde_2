import { Block } from "@/components/Block";
import LeagueMatchSwitch from "@/components/Match/league-match-switch";
import StandingsTableSkeleton from "@/components/Skeletons/StandingsTableSkeleton";
import { StandingsAccordion } from "@/components/StandingsTable/StandingsAccordion";
import UnGroupedStandings from "@/components/StandingsTable/UnGroupedStandings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTeamStandings } from "./useTeamStandings";
import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";

const toggleOptions = [
  { key: "overall", label: "Overall" },
  { key: "home", label: "Home" },
  { key: "away", label: "Away" },
];

export function TeamStandingsTable({ showTitle }) {
  const {
    standings,
    isLoading,
    activeToggle,
    setActiveToggle,
    selectedRound,
    setSelectedRound,
    rounds,
    standingsByRound,
    selectedLeague,
    setSelectedLeague,
  } = useTeamStandings();

  if (isLoading) return <StandingsTableSkeleton />;

  const newsShadow = "0px 2px 10px 0px #00000040";

  if (!standings)
    return (
      <Block
        className="h-48 flex items-center justify-center"
        style={{ boxShadow: newsShadow }}
      >
        <h1 className="text-center text-xl text-dark/70 font-semibold">
          {"No standings for this season"}
        </h1>
      </Block>
    );

  return (
    <Block padding={false} style={{ boxShadow: newsShadow }}>
      {showTitle && (
        <div>
          <div className="items-center gap-2 px-4 py-2 text-primary rounded-t-lg hidden md:flex">
            <span className="text-lg font-semibold text-[#00401A]">
              Team Standings
            </span>
          </div>
          <div className="grid grid-cols-[20%_60%_20%] items-center gap-2 px-4 py-2 text-primary rounded-t-lg md:hidden">
            <span className="text-lg text-[#00401A] font-bold">Team</span>

            <div className="flex items-center justify-center gap-10 text-[#00401A] font-bold">
              <span className="text-lg font-semibold">P</span>
              <span className="text-lg font-semibold">GD</span>
              <span className="text-lg font-semibold">Pts</span>
            </div>

            <div></div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <LeagueSlider
          leagues={standings}
          hideAll={true}
          className="!border-none"
          setSelectedLeague={setSelectedLeague}
          selectedLeague={selectedLeague}
        />

        <div className="px-4 flex gap-4 items-center mt-4">
          <LeagueMatchSwitch
            activeToggle={activeToggle}
            setActiveToggle={setActiveToggle}
            toggleOptions={toggleOptions}
          />
          <div className="w-[200px] mb-4">
            <StandingDropDown
              onChange={setSelectedRound}
              value={selectedRound}
              standingsDropdown={rounds}
            />
          </div>
        </div>
      </div>

      <UnGroupedStandings standings={standingsByRound} />
      <StandingsAccordion standings={standingsByRound} />

      <div className="flex flex-wrap gap-4 mt-4 text-sm pl-5 py-5">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          Champions League
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-orange-500"></span>
          Europa League
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-500"></span>
          Promotion Play-off
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
          Relegation Play-off
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          Relegation
        </div>
      </div>
    </Block>
  );
}

function StandingDropDown({ onChange, value, standingsDropdown }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <span
          className={`text-sm font-oswald ${
            !value ? "text-[#686868]" : "text-black"
          } truncate`}
        >
          {value || "Select Round"}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {standingsDropdown?.map((item, index) => (
            <SelectItem key={index} value={item?.round} className="font-oswald">
              {item?.round}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
