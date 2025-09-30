import { Block } from "@/components/Block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNormalizedPercentages } from "@/helpers/fixture";
import { getContrastYIQ } from "@/lib/utils";
import clsx from "clsx";
import { useState } from "react";

const options = [
  { value: "overall_value", name: "Overall" },
  { value: "first_half_value", name: "1st Half" },
  { value: "second_half_value", name: "2nd Half" },
  { value: "extra_time_value", name: "Extra Time" },
];

export default function MatchStatistics({ statistics }) {
  const [activeOption, setActiveOption] = useState<
    | "overall_value"
    | "first_half_value"
    | "second_half_value"
    | "extra_time_value"
  >("overall_value");
  if (!statistics) return null;

  return (
    <Block>
      <div className="divide-y max-h-[700px] overflow-y-auto px-3">
        <DropDownStatistics
          activeOption={activeOption}
          setActiveOption={setActiveOption}
          options={options}
        />
        <Accordion type="single" collapsible className="w-full">
          {/* OverAll  */}
          <AccordionItem value="overall">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Overall
            </AccordionTrigger>
            <AccordionContent>
              <OverallStatistics
                statistics={statistics}
                activeOption={activeOption}
              />
            </AccordionContent>
          </AccordionItem>
          {/* Attack  */}
          <AccordionItem value="attack">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Attack
            </AccordionTrigger>
            <AccordionContent>
              <AttackStatistics statistics={statistics} />
            </AccordionContent>
          </AccordionItem>
          {/* Defense */}
          <AccordionItem value="defense">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Defense
            </AccordionTrigger>
            <AccordionContent>
              <DefenseStatistics statistics={statistics} />
            </AccordionContent>
          </AccordionItem>
          {/* Battle */}
          <AccordionItem value="battle">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Battle
            </AccordionTrigger>
            <AccordionContent>
              <BattleStatistics statistics={statistics} />
            </AccordionContent>
          </AccordionItem>
          {/* Discipline */}
          <AccordionItem value="discipline">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Discipline
            </AccordionTrigger>
            <AccordionContent>
              <DisciplineTypes statistics={statistics} />
            </AccordionContent>
          </AccordionItem>
          {/* Passes  */}
          <AccordionItem value="passes">
            <AccordionTrigger className="text-center text-lg font-bold text-x-green-2">
              Passes
            </AccordionTrigger>
            <AccordionContent>
              <PassesStatistics statistics={statistics} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Block>
  );
}

function OverallStatistics({ statistics, activeOption }) {
  const overAllStats = statistics?.filter(
    (stat) => stat?.stat_category === "Overall"
  );
  const homeColor = statistics?.find((stat) => stat?.side === "home")?.colour;
  const awayColor = statistics?.find((stat) => stat?.side === "away")?.colour;

  const { home, away } = getNormalizedPercentages(statistics, activeOption);

  const renderBallPossession = () => {
    return (
      <div>
        <h1 className=" text-center mb-2 font-semibold">Ball Possession %</h1>
        <div className="rounded-full font-semibold flex gap-1">
          <div
            style={{
              width: `${home ? home : 50}%`,
              backgroundColor: homeColor,
              color: getContrastYIQ(homeColor),
            }}
            className="h-full  rounded-l-full px-4 py-2.5 transition-all duration-500 ease-in-out"
          >{`${home}%`}</div>
          <div
            style={{
              width: `${away ? away : 50}%`,
              backgroundColor: awayColor,
              color: getContrastYIQ(awayColor),
            }}
            className="h-full  text-right rounded-r-full px-4 py-2.5 transition-all duration-500 ease-in-out"
          >
            {`${away}%`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">Overall</h4> */}
      <div className="space-y-4">
        {renderBallPossession()}
        {overAllStats?.map((stat, index) => (
          <StatRow
            key={`overall-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function AttackStatistics({ statistics }) {
  const attackStats = statistics?.filter(
    (stat) => stat?.stat_category === "Attack"
  );

  return (
    <div className="space-y-6 px-4 pb-4">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">Attack</h4> */}
      <div className="space-y-4">
        {attackStats.map((stat, index) => (
          <StatRow
            key={`attack-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function DefenseStatistics({ statistics }) {
  const defenseStats = statistics?.filter(
    (stat) => stat?.stat_category === "Defense"
  );

  return (
    <div className="space-y-6 pt-4">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">Defense</h4> */}
      <div className="space-y-4">
        {defenseStats.map((stat, index) => (
          <StatRow
            key={`defense-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function PassesStatistics({ statistics }) {
  const passesStats = statistics?.filter(
    (stat) => stat?.stat_category === "Passes"
  );

  return (
    <div className="space-y-6 p-4 ">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">Passes</h4> */}
      <div className="space-y-4">
        {passesStats.map((stat, index) => (
          <StatRow
            key={`passes-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function BattleStatistics({ statistics }) {
  const battleStats = statistics?.filter(
    (stat) => stat?.stat_category === "Battle"
  );

  return (
    <div className="space-y-6 p-4 ">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">Battle</h4> */}
      <div className="space-y-4">
        {battleStats.map((stat, index) => (
          <StatRow
            key={`battle-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function DisciplineTypes({ statistics }) {
  const disciplineStats = statistics?.filter(
    (stat) => stat?.stat_category === "Discipline"
  );

  return (
    <div className="space-y-6 p-4 ">
      {/* <h4 className="text-center text-lg font-bold text-x-green-2">
        Discipline
      </h4> */}
      <div className="space-y-4">
        {disciplineStats.map((stat, index) => (
          <StatRow
            key={`discipline-${index + 1}`}
            stat={stat}
            lowerBetter={false}
          />
        ))}
      </div>
    </div>
  );
}

function DropDownStatistics({ options, activeOption, setActiveOption }) {
  return (
    <div className="flex justify-end py-2">
      <Select value={activeOption} onValueChange={setActiveOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter stats" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StatRow({ stat, lowerBetter }) {
  const homeValue = stat?.side === "home" ? stat?.overall_value : "";
  const awayValue = stat?.side === "away" ? stat?.overall_value : "";
  const homeWin = homeValue > awayValue;
  const draw = homeValue === awayValue;

  const homeColor = stat?.side === "home" ? stat?.colour : "#000000";
  const awayColor = stat?.side === "away" ? stat?.colour : "#000000";

  return (
    <div className="flex items-center justify-between">
      <span
        style={
          homeColor && homeWin && !draw
            ? { backgroundColor: homeColor, color: getContrastYIQ(homeColor) }
            : {}
        }
        className={clsx(
          homeWin ? "bg-gray-100 " : "",
          "px-2 rounded-full font-medium "
        )}
      >
        {stat?.side === "home" && stat?.overall_value}
      </span>
      <span className="font-medium">{stat?.name}</span>
      <span
        style={
          awayColor && !homeWin && !draw
            ? { backgroundColor: awayColor, color: getContrastYIQ(awayColor) }
            : {}
        }
        className={clsx("px-2 rounded-full font-medium ")}
      >
        {stat?.side === "away" && stat?.overall_value}
      </span>
    </div>
  );
}
