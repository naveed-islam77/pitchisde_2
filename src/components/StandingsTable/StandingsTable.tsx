import { Block } from "@/components/Block";
import { useLeague } from "@/contexts/League/LeagueContext";
import { useGetStandingsDropdown } from "@/features/LeagueDetail/useGetLeagues";
import { useRouter } from "next/router";
import LeagueMatchSwitch from "../Match/league-match-switch";
import StandingsTableSkeleton from "../Skeletons/StandingsTableSkeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { StandingsAccordion } from "./StandingsAccordion";
import UnGroupedStandings from "./UnGroupedStandings";
import { useStandings } from "./useStandings";

const toggleOptions = [
  { key: "overall", label: "Overall" },
  { key: "home", label: "Home" },
  { key: "away", label: "Away" },
];

export function StandingsTable({ showTitle }) {
  const {
    standings,
    isLoading,
    activeToggle,
    setActiveToggle,
    selectedRound,
    setSelectedRound,
  } = useStandings();

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
              Standings
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
      <div className="px-4 flex gap-4 items-center">
        <LeagueMatchSwitch
          activeToggle={activeToggle}
          setActiveToggle={setActiveToggle}
          toggleOptions={toggleOptions}
        />
        <div className="w-[200px] mb-4">
          <StandingDropDown onChange={setSelectedRound} value={selectedRound} />
        </div>
      </div>

      <UnGroupedStandings standings={standings} />
      <StandingsAccordion standings={standings} />

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

function StandingDropDown({ onChange, value }) {
  const { leagueBannerData } = useLeague();
  const router = useRouter();
  const { season } = router.query;
  const seasonId = season ? season : leagueBannerData?.[0]?.season_id;

  const { data: standingsDropdown } = useGetStandingsDropdown({ seasonId });

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <span
          className={`text-sm ${
            !value ? "text-[#686868]" : "text-black"
          } truncate`}
        >
          {value || "Select Round"}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {standingsDropdown?.map((item) => (
            <SelectItem key={item?.round} value={item?.round}>
              {item?.round}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
