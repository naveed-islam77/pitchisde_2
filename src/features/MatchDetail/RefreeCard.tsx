import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { GiWhistle } from "react-icons/gi";
import { useGetFixtureRefreeDetails } from "./useFixture";
import { useRouter } from "next/router";
import Image from "next/image";

export function RefereeInfo({
  referee_name_country,
}: {
  referee_name_country: string;
}) {
  const router = useRouter();
  const { matchId } = router.query;

  const { data: refereeDetails } = useGetFixtureRefreeDetails(
    matchId as string
  );

  const referee = refereeDetails?.find((r) => r.referee_type === "Referee");
  const assistants = refereeDetails?.filter(
    (r) => r.referee_type !== "Referee"
  );

  if (!referee_name_country) return null;

  const stats = [
    { value: referee?.matches, label: "Matches" },
    { value: referee?.fouls, perMatch: referee?.fouls_pm, label: "Fouls" },
    {
      value: referee?.yellow_cards,
      perMatch: referee?.yellow_cards_pm,
      label: "Yellow Cards",
    },
    {
      value: referee?.red_cards,
      perMatch: referee?.red_cards_pm,
      label: "Red Cards",
    },
    {
      value: referee?.penalties,
      perMatch: referee?.penalties_pm,
      label: "Penalties",
    },
    {
      value: referee?.var_checks,
      perMatch: referee?.var_checks_pm,
      label: "VAR Checks",
    },
  ];

  return (
    <li className="flex items-center gap-2">
      <GiWhistle size={24} />

      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="cursor-pointer underline decoration-dotted">
            {referee_name_country}
          </span>
        </HoverCardTrigger>

        <HoverCardContent className="w-full max-w-md" side="right">
          {/* Header */}
          <div className="flex items-center gap-2">
            {referee?.ref_image && (
              <Image
                src={referee.ref_image}
                alt="Referee"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold">{referee?.name}</h4>
              <p className="text-xs text-muted-foreground">
                {referee?.referee_type}
              </p>
            </div>
            {referee?.ref_country_flag && (
              <Image
                src={referee.ref_country_flag}
                alt="Country flag"
                width={50}
                height={50}
                className="w-7 h-7 rounded-full ml-auto"
              />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-2 mt-5">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <p className="text-lg font-bold">{s.value ?? 0}</p>
                {s.perMatch && (
                  <p className="text-xs text-muted-foreground">{s.perMatch}</p>
                )}
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 h-[1px] w-full bg-gray-200" />

          {/* Assistants */}
          {assistants?.length > 0 && (
            <div className="mt-2 flex justify-between gap-4">
              {assistants.map((a) => (
                <div key={a.name} className="flex flex-col">
                  <p className="text-sm font-bold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.referee_type}
                  </p>
                </div>
              ))}
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </li>
  );
}
