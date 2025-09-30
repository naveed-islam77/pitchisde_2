import { Block } from "@/components/Block";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetFixtureFormData } from "./useFixture";
import { useState } from "react";
import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";
import { groupByTeams } from "@/helpers/fixture";
import { cn } from "@/lib/utils";

const Forms = () => {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectState, setSelectState] = useState({
    same_team: false,
    same_venue: false,
  });
  const router = useRouter();
  const { matchId } = router.query;
  const { data: formData, isLoading } = useGetFixtureFormData(
    matchId as string,
    selectState.same_venue,
    selectState.same_team
  );

  const groupedData = groupByTeams(formData || [], selectedLeague);
  const team1: any = Object.values(groupedData || {})[0];
  const team2: any = Object.values(groupedData || {})[1];

  if (isLoading) {
    return (
      <Block title="Form" padding={false} showNextButton={false}>
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  if (!formData) {
    return (
      <Block title="Form" padding={false} showNextButton={false}>
        <div className="flex items-center justify-center h-full">
          No data found
        </div>
      </Block>
    );
  }

  console.log("selectedState", selectState);
  return (
    <Block title="Form" padding={false} showNextButton={false}>
      <div className="flex justify-between px-4 items-center">
        <LeagueSlider
          leagues={formData}
          setSelectedLeague={setSelectedLeague}
          selectedLeague={selectedLeague}
          className="!px-2 !border-none"
        />
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-2 justify-center">
            <Image
              src={"/views/double-arrow.svg"}
              alt="arrow"
              width={20}
              height={20}
              className={cn(
                "p-2 rounded-full w-10 h-10 cursor-pointer",
                selectState.same_team ? "bg-black" : "bg-gray-500"
              )}
              onClick={() => {
                setSelectState({
                  ...selectState,
                  same_team: !selectState.same_team,
                });
              }}
            />
            <span className="text-xs font-extrabold">Same Side</span>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
            <Image
              src={"/views/venue.svg"}
              alt="arrow"
              width={20}
              height={20}
              className={cn(
                "p-2 rounded-full w-10 h-10 cursor-pointer",
                selectState.same_venue ? "bg-black" : "bg-gray-500"
              )}
              onClick={() => {
                setSelectState({
                  ...selectState,
                  same_venue: !selectState.same_venue,
                });
              }}
            />
            <span className="text-xs font-extrabold">Same Venue</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="px-6 flex flex-col items-center">
          <Image
            src={team1?.[0]?.curr_team_logo}
            alt="team_logo"
            width={35}
            height={35}
            className="w-10 h-10 object-cover"
          />
          <div className="flex flex-col gap-2 mt-2">
            {team1?.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
        <span className="w-[1px] h-[300px] bg-gray-300"></span>
        <div className="px-6 flex items-center flex-col">
          <Image
            src={team2?.[0]?.curr_team_logo}
            alt="team_logo"
            width={35}
            height={35}
            className="w-10 h-10 object-cover"
          />
          <div className="flex gap-2 flex-col mt-2">
            {team2?.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </Block>
  );
};

const MatchCard = ({ match }: { match: any }) => {
  const scoreColorMap = {
    green: "bg-[#006428]",
    red: "bg-[#da291c]",
  };

  const scoreColor = match?.result === "win" ? "green" : "red";
  const scoreClass = scoreColorMap[scoreColor];

  return (
    <div className="flex items-center justify-between gap-3 min-w-[120px]">
      <Image
        src={match?.form_home_logo}
        alt="league-logo"
        width={128}
        height={128}
        className="size-7"
      />
      <div>
        <Image
          src={match?.league_logo}
          alt="league-logo"
          width={128}
          height={128}
          className="size-4 mx-auto"
        />
        <span
          className={`${
            match?.result === "draw"
              ? "text-white bg-dark"
              : `${scoreClass} text-white`
          } px-2 leading-7 py-[1px] font-semibold rounded-md mt-1`}
        >
          {match?.form_score}
        </span>
      </div>
      <Image
        src={match?.form_away_logo}
        alt={match?.form_away_name}
        width={128}
        height={128}
        className="size-7"
      />
    </div>
  );
};

export default Forms;
