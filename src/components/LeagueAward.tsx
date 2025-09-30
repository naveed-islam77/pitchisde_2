import { Block } from "@/components/Block";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function LeagueAwardPlayer({ stat, award }) {
  return (
    <div className="flex py-2 text-x-bargreen">
      <div className="relative">
        <Image
          height={150}
          width={150}
          src={stat?.player_image}
          className="h-11 w-11 shrink-0 rounded-full bg-x-grey-3"
          alt={stat.player_name}
        />
        <Image
          height={150}
          width={150}
          src={stat?.team_logo}
          className="h-4 w-4 shrink-0 rounded-full bg-white shadow-md absolute top-6 -right-2"
          alt={stat.team_name}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-y-0.5 pl-4">
        <Link
          href={`/stat/${stat.player_id}`}
          className="font-bold leading-none"
        >
          {stat.player_name}
        </Link>
        <span className="text-sm font-medium">{award}</span>
      </div>
      <p className="mr-2 self-center text-xl font-bold">{stat.value}</p>
    </div>
  );
}

export function LeagueAward({ awards, isLoading }) {
  const router = useRouter();
  const { query } = router;
  const { leagueId } = query;

  const goldenBoot = awards?.find((stat) => stat.award === "Golden Boot");
  const playmaker = awards?.find((stat) => stat.award === "Playmaker");
  const goldenGlove = awards?.find((stat) => stat.award === "Golden Glove");

  const newsShadow = "0px 2px 10px 0px #00000040";

  if (isLoading) {
    return (
      <Block>
        <div className="relative h-48 bg-gray-200 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  if (!goldenBoot && !playmaker && !goldenGlove)
    return (
      <Block
        title="League Awards"
        titleClassNaeme="!text-[#00401A] !text-[20px] font-semibold"
        contentClassName="!pb-2"
        style={{ boxShadow: newsShadow }}
      >
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">No League Awards</p>
        </div>
      </Block>
    );

  return (
    <Block
      title="League Awards"
      titleClassNaeme="!text-[#00401A] !text-[20px] font-semibold"
      contentClassName="!pb-2"
      style={{ boxShadow: newsShadow }}
      onNextClick={() =>
        router.push({
          pathname: `/league/${leagueId}/stats`,
          query,
        })
      }
    >
      {goldenBoot && (
        <LeagueAwardPlayer stat={goldenBoot} award={"Golden Boot"} />
      )}
      {playmaker && <LeagueAwardPlayer stat={playmaker} award={"Playmaker"} />}
      {goldenGlove && (
        <LeagueAwardPlayer stat={goldenGlove} award={"Golden Glove"} />
      )}
    </Block>
  );
}
