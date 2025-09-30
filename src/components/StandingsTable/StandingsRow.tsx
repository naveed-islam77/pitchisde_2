import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FormSquare } from "./FormSquare";

export default function StandingsRow({ standing }) {
  const {
    form,
    losses,
    wins,
    matches_played,
    draws,
    goals_for_against,
    goal_diff,
    points,
    rule,
    team_logo,
    team_name,
    team_id,
    form_fixtures,
    form_detail,
  } = standing;

  return (
    <tr
      className={clsx(
        " hover:bg-[#F2F2F2] [&_td]:py-1.5",
        rule?.type_id === 267 ? "bg-amber-400" : ""
      )}
    >
      <td
        className={clsx(
          "relative text-white rounded-full w-10 h-10 ml-3 flex items-center justify-center",
          getStandingColor(standing?.standing_rule)
        )}
      >
        {/* <IndicatorBar ruleId={rule ? rule.type_id : "000"} /> */}
        {standing.position}
      </td>
      <td className="w-[90%] px-4">
        <span className="flex items-center gap-x-2">
          <Image
            width={100}
            height={100}
            src={team_logo}
            className="w-7"
            alt={`${team_name} logo`}
          />
          <Link
            className="hover:underline underline-offset-2"
            href={`/team/${team_id}/overview`}
          >
            {team_name}
          </Link>
        </span>
      </td>
      <td>{matches_played}</td>
      <td>{wins}</td>
      <td>{draws}</td>
      <td>{losses}</td>
      <td>{goals_for_against}</td>
      <td>{goal_diff}</td>
      <td>{points}</td>
      <td>
        <span className="flex gap-x-1">
          {form?.map((form, index) => (
            <FormSquare
              key={index}
              form={form}
              form_fixtures={form_fixtures}
              form_detail={form_detail}
              index={index}
            />
          ))}
        </span>
      </td>
      {standing?.next_fixture && (
        <td className="pl-2 pr-6 ">
          <Link href={`/match/${standing?.next_fixture}`}>
            <div>
              <Image
                width={250}
                height={250}
                src={standing?.next_team_logo || ""}
                className="mx-auto w-7 hover:opacity-50"
                alt={standing?.next_team_name}
              />
            </div>
          </Link>
        </td>
      )}
    </tr>
  );
}

export function getStandingColor(rule: string): string {
  switch (rule) {
    case "Relegation":
      return "bg-[#da291c]";
    case "UEFA Champions League":
      return "bg-[#5691fb]";
    case "UEFA Europa League":
      return "bg-[#ee7510]";
    case "Promotion Play-off":
      return "bg-green-500";
    case "Relegation Play-off":
      return "bg-[#ffc000]";
    default:
      return "!text-black";
  }
}
