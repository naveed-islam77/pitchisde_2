import { Block } from "@/components/Block";
import { IndicatorBar } from "@/components/IndicatorBar";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetFixtureStandings } from "./useFixture";

function Row({ standing }: any) {
  const {
    goal_diff,
    grp,
    matches_played,
    points,
    position,
    team_id,
    team_logo,
    team_name,
    wins,
  } = standing;

  return (
    <div className="relative col-span-full grid grid-cols-subgrid items-center justify-items-center font-medium">
      <span>
        {grp && <IndicatorBar ruleId={grp} />}
        {position}
      </span>
      <div className="flex items-center gap-x-2 justify-self-start">
        <Image
          width={512}
          height={512}
          src={team_logo}
          className="w-7"
          alt={team_name}
        />
        <p>{team_name}</p>
      </div>
      <p className="px-1">{matches_played}</p>
      <p className="px-1">{goal_diff}</p>
      <p className="px-1">{points}</p>
      {/* {rival ? (
        <Image
          height={512}
          width={512}
          src={rival.image_path}
          className="w-5 mx-1"
          alt={rival.name}
          title={rival.name}
        />
      ) : null} */}
    </div>
  );
}

export function MatchMiniStandings() {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: standings, isLoading } = useGetFixtureStandings(
    matchId as string
  );

  if (isLoading) {
    return (
      <Block title="Standings" padding={false} showNextButton={false}>
        <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  if (standings?.length === 0) {
    return (
      <Block title="Standings" padding={false} showNextButton={false}>
        <div className="flex items-center text-2xl font-bold justify-center h-[200px]">
          No data found
        </div>
      </Block>
    );
  }

  return (
    <Block title="Standings" padding={false}>
      <div className="grid grid-cols-[2rem,1fr,auto,auto,auto,auto] gap-2 px-2 mb-5 pb-4">
        <div
          className={clsx(
            "col-span-full grid grid-cols-subgrid justify-items-center gap-x-0 py-2  font-semibold text-primary "
          )}
        >
          <h3> </h3>
          <h3 className="justify-self-start">Team</h3>
          <h3>P</h3>
          <h3>+/-</h3>
          <h3>Pts</h3>
          <h3 className="mx-1">Next</h3>
        </div>
        {standings?.map((standing: any) => (
          <Row standing={standing} />
        ))}
      </div>
    </Block>
  );
}
