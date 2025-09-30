import useFixtureById from "@/features/Fixtures/useFixtureById";
import dayjs from "dayjs";
import Link from "next/link";

export function FixtureRow({ fixtureId }: { fixtureId: any }) {
  const { fixture, isLoading } = useFixtureById({ id: fixtureId });
  if (isLoading)
    return (
      <div className="h-5 animate-pulse bg-dark/20 overflow-hidden my-2"></div>
    );

  if (!fixture) return null;

  const { participants, starting_at, id, league } = fixture?.data;
  const homeTeam = participants.find((p) => p.meta.location === "home");
  const awayTeam = participants.find((p) => p.meta.location === "away");
  const time = dayjs(starting_at).format("hh:mm a");

  return (
    <Link
      href={`/match/${id}`}
      className="border-b py-2 text-sm flex gap-2 divide-x hover:bg-light px-4"
    >
      <div className="self-end">
        <img
          src={league.image_path}
          alt={league.name}
          className="size-8 object-contain mx-auto"
        />
        <span>{time}</span>
      </div>
      <div className="px-2">
        <span className="inline-flex items-center gap-2">
          <img
            src={homeTeam.image_path}
            className="size-6 object-contain"
            alt={homeTeam.title}
          />
          <span>{homeTeam.name}</span>
        </span>
        <br />
        <span className="inline-flex items-center gap-2">
          <img
            src={awayTeam.image_path}
            alt={awayTeam.title}
            className="size-6 object-contain"
          />
          <span>{awayTeam.name}</span>
        </span>
      </div>
    </Link>
  );
}
