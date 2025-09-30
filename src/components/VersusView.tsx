import { getTagColors } from "@/helpers/home";
import { VersusRowProp, VersusRowTeam } from "@/types/dashboard";
import {
  IconBell,
  IconBellFilled,
  IconRectangleVerticalFilled,
} from "@tabler/icons-react";
import clsx from "clsx";
import { format } from "date-fns";
import { startProgress, stopProgress } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

function Scoreboard({
  team1,
  team2,
  aggregateResult,
  panelties,
}: {
  team1: VersusRowTeam;
  team2: VersusRowTeam;
  aggregateResult?: string;
  panelties?: any;
}) {
  return (
    <div>
      {aggregateResult && (
        <p className="text-center font-bold text-dark/70">{aggregateResult}</p>
      )}
      <div className="grid grid-cols-3 text-center text-xl font-bold text-dark xl:text-xl">
        <span>{team1.score}</span>
        <span> - </span>
        <span>{team2.score}</span>
      </div>
      {panelties && (
        <p className="text-center text-dark/70 text-xs">{panelties}</p>
      )}
    </div>
  );
}

function Schedule({ time }: { time: string }) {
  return (
    <div className="text-center font-bold text-dark xl:text-lg whitespace-nowrap">
      {time}
    </div>
  );
}

export function VersusRow({
  team1,
  team2,
  tag,
  tagFull,
  notification = false,
  mode,
  time,
  matchId,
  awaiting,
  aggregate,
  team1RedCards,
  team2RedCards,
  starting_at,
  state,
  pen_score,
}: VersusRowProp) {
  const [isNotify, setIsNotify] = useState(false);

  const router = useRouter();
  const toggleNotify = (e) => {
    e.stopPropagation();
    setIsNotify(!isNotify);
  };

  const navigateToFixture = () => {
    startProgress();
    router.push(`/match/${matchId}`).finally(() => stopProgress());
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const userJSON = JSON.parse(localUser);
      const { notify } = userJSON;
      const { matches } = notify || {};
      if (matches?.length) {
        if (matches.find((match) => match === matchId)) setIsNotify(true);
      }
    }
  }, [matchId]);

  const tagColor = getTagColors(tag);

  return (
    <div
      onClick={navigateToFixture}
      className={clsx(
        "flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 items-center"
      )}
    >
      {/* Tag */}
      <div className="w-8">
        {tag && (
          <p
            data-tooltip-id={`${team1.name}-${tag}-${team2.name}`}
            data-tooltip-content={tagFull}
            data-tooltip-place="left"
            data-tooltip-delay-show={200}
            data-tooltip-variant="info"
            className={clsx(
              "rounded-full py-1 text-xs hidden sm:block leading-none text-center font-semibold md:block cursor-default",
              tagColor
            )}
          >
            {tag}
          </p>
        )}
        <Tooltip id={`${team1.name}-${tag}-${team2.name}`} />
      </div>
      <div
        style={{
          gridTemplateColumns: `1fr  minmax(3rem, auto) 1fr`,
        }}
        className="flex-1 grid items-center gap-4"
      >
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div>
            {starting_at && (
              <span className="text-sm text-gray-500 hidden md:block font-semibold">
                {format(starting_at || "", "dd MMM yyyy")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/team/${team1.id}/overview`}
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                "justify-self-end text-right font-semibold text-dark text-nowrap lg:text-base text-sm hover:underline underline-offset-2",
                team1?.meta?.winner && "font-semibold"
              )}
            >
              {team1.name}
            </Link>
            <div className="flex items-center justify-end">
              {/* {starting_at && (
              <span className="text-sm text-gray-500 hidden md:block font-semibold">
                {format(starting_at || "", "dd MMM yyyy")}
              </span>
            )} */}
              {Array.from({ length: team1RedCards || 0 }, (_, i) => (
                <IconRectangleVerticalFilled
                  key={`${team1.name}-redcard-${i}`}
                  size={16}
                  className="text-danger"
                />
              ))}
            </div>
            <Image
              width={150}
              height={150}
              src={team1.logo || "/mig/teams/general.png"}
              className=" w-7 md:w-8 object-contain"
              alt={`team 1 Logo`}
            />
          </div>
        </div>

        {/* Content */}
        {mode === "schedule" && time ? (
          <Schedule time={time} />
        ) : mode === "awaiting" ? (
          <div className="font-bold text-dark xl:text-lg text-center whitespace-nowrap">
            {awaiting}
          </div>
        ) : (
          <Scoreboard
            team1={team1}
            team2={team2}
            aggregateResult={aggregate}
            panelties={pen_score}
          />
        )}
        {/* Team 2 */}
        <div className="flex items-center justify-start gap-2">
          <Image
            width={150}
            height={150}
            src={team2.logo || "/mig/teams/general.png"}
            className=" w-7 md:w-8 object-contain"
            alt={`team 2 Logo`}
          />

          <Link
            href={`/team/${team2.id}/overview`}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "font-semibold text-dark text-nowrap lg:text-base text-sm  hover:underline underline-offset-2",
              team2?.meta?.winner && "font-semibold"
            )}
          >
            {team2.name}
          </Link>
          <div className="flex items-center justify-between w-full ">
            <p>
              {Array.from({ length: team2RedCards || 0 }, (_, i) => (
                <IconRectangleVerticalFilled
                  key={`${team2.name}-redcard-${i}`}
                  size={16}
                  className="text-danger"
                />
              ))}
            </p>
            {state && (
              <span className="text-sm hidden md:block text-gray-500 font-semibold bg-gray-200 px-3 py-[2px] rounded-full">
                {state}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Notification */}
      <div className="box-content h-10">
        {notification && (
          <button
            onClick={toggleNotify}
            className="rounded-md hover:bg-gray-300 p-1"
          >
            {isNotify ? (
              <IconBellFilled className="w-6 h-6 fill-yellow-500" />
            ) : (
              <IconBell className="w-6 h-6 text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Its children must be VersusRow's
export function VersusRowList({ children }: PropsWithChildren) {
  return <div className="py-2">{children}</div>;
}
