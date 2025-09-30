import { Block } from "@/components/Block";
import MyXiIcon from "@/components/DetailView/MyXIIcon";
import { useFixture } from "@/contexts/Fixture/FixtureContext";
import {
  IconBuildingStadium,
  IconHash,
  IconUsersGroup,
} from "@tabler/icons-react";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { BiFootball } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiBellSimpleFill } from "react-icons/pi";
import ActionMenu from "../LeagueDetail/Transfer/ActionMenu";
import { RefereeInfo } from "./RefreeCard";
import { useGetFixtureWeather } from "./useFixture";
import { useRouter } from "next/router";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

function Action({ name, icon }) {
  return (
    <div className="group cursor-pointer flex flex-row-reverse items-center gap-x-4">
      {icon}
      <button className="text-right font-semibold group-hover:underline">
        {name}
      </button>
    </div>
  );
}

function Actions() {
  return (
    <div className="row-span-2 space-y-2">
      <Action name="CreatePITCHSIDE" icon={<MyXiIcon className="w-6 h-6" />} />
      <Action name="Follow" icon={<FaRegStar className="w-6 h-6" />} />
      <Action
        name="Notifications"
        icon={<PiBellSimpleFill className="w-6 h-6" />}
      />
      <Action
        name="Sync Calendar"
        icon={<MdOutlineCalendarToday className="w-6 h-6" />}
      />
    </div>
  );
}

function Venue({ venue, attendance, referee_name_country, hashtag }) {
  const router = useRouter();
  const { matchId } = router.query;

  const { data: weather } = useGetFixtureWeather(matchId as string);

  const { clouds, fixture_id, humidity, icon, temp, wind } = weather?.[0] || {};

  return (
    <ul className="space-y-2 hidden md:block">
      <li className="flex items-center gap-2">
        <IconBuildingStadium />
        <a
          href={`https://www.google.com/maps?q=${venue?.latitude},${venue?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <span>{venue?.name}</span>
        </a>
      </li>
      {attendance && (
        <li className="flex items-center gap-2">
          <IconUsersGroup />
          <span>{attendance.attendance}</span>
        </li>
      )}
      {referee_name_country && (
        <RefereeInfo referee_name_country={referee_name_country} />
      )}
      {hashtag && (
        <li className="flex items-center gap-2">
          <IconHash />
          <span>{hashtag}</span>
        </li>
      )}

      {weather?.length && (
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            alt="Weather"
            width={100}
            height={100}
            className="w-12"
          />
          <span className="flex flex-col items-center">
            <p className="text-lg font-bold">{clouds}</p>
            <p className="text-muted-foreground text-xs">Clouds</p>
          </span>

          <span className="flex flex-col items-center">
            <p className="text-lg font-bold">{humidity}</p>
            <p className="text-muted-foreground text-xs">Humidity</p>
          </span>

          <span className="flex flex-col items-center">
            <p className="text-lg font-bold">{temp}</p>
            <p className="text-muted-foreground text-xs">Temp</p>
          </span>

          <span className="flex flex-col items-center">
            <p className="text-lg font-bold">{wind}</p>
            <p className="text-muted-foreground text-xs">Wind</p>
          </span>
        </div>
      )}
    </ul>
  );
}

export function Hero() {
  const { fixtureBanner, isLoading } = useFixture();

  if (isLoading) {
    return (
      <Block padding={false} showNextButton={false}>
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  if (fixtureBanner?.length === 0) {
    return (
      <Block className="h-[200px] flex items-center justify-center">
        <h1 className="text-2xl font-bold">No Banner Data Found</h1>
      </Block>
    );
  }

  const {
    attendance,
    away_team_logo,
    away_team_name,
    follow,
    goals_away,
    goals_home,
    hashtag,
    home_team_logo,
    home_team_name,
    league,
    league_id,
    league_logo,
    notif_on,
    referee_name_country,
    result_info,
    starting_at,
    state,
    venue,
    venue_lat_long,
  } = fixtureBanner?.[0] || {};

  return (
    <div
      className={clsx(
        "relative app-block",
        "p-6 rounded-3xl",
        "bg-white text-dark",
        "font-semibold"
      )}
    >
      <div className="relative">
        <ActionMenu />
      </div>
      <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-[auto,1fr,auto] md:items-center md:gap-4">
        <Venue
          attendance={attendance}
          referee_name_country={referee_name_country}
          hashtag={hashtag}
          venue={venue}
        />
        <div>
          <div className="flex items-center justify-center">
            <Image
              width={150}
              height={150}
              src={league_logo}
              className="mr-1.5 w-6"
              alt={`${league_id} Logo`}
            />
            <p>{league}</p>
          </div>
          <div className="mt-6 flex sm:grid grid-cols-[1fr,8rem,1fr] gap-7 justify-center text-2xl font-bold items-center ">
            <div className="w-full">
              <div className="flex gap-4 items-center">
                <h2 className="flex-1 text-xl sm:text-right">
                  {home_team_name}
                </h2>
                <div className="flex flex-col gap-3 items-center">
                  <Image
                    height={250}
                    width={250}
                    src={home_team_logo}
                    className="w-8"
                    alt={`${home_team_name} Logo`}
                  />
                  <p className="text-right">{goals_home}</p>
                </div>
              </div>
              {/* <div className="text-base mt-6">
                <p className="text-right">{goals_home}</p>
              </div> */}
            </div>
            <div>
              <p className=" text-4xl text-center whitespace-nowrap">
                {`${goals_home || 0} - ${goals_away || 0}`}
              </p>
              <p className="text-center text-base">{state}</p>
              <div className="mt-2">
                <BiFootball size={20} className="mx-auto" />
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-3 items-center">
                  {" "}
                  <Image
                    height={250}
                    width={250}
                    src={away_team_logo}
                    className=" w-8"
                    alt={`${away_team_name} Logo`}
                  />
                  <p className="text-xl">{goals_away}</p>
                </div>
                <h2 className="flex-1 text-xl sm:text-left">
                  {away_team_name}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-3">
            {result_info ? <p className="text-center">{result_info}</p> : null}

            <p className="text-center">{starting_at?.slice(0, 10)}</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Actions />
        </div>
      </div>
    </div>
  );
}
