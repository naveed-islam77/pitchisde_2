"use client";

import { Bracket } from "@/components/knockout/Bracket";
import { KnockoutProvider } from "@/contexts/knockOut/knockOutContext";
import { useGetLeagueKnockout } from "../useGetLeagues";
import { useRouter } from "next/router";
import { useLeague } from "@/contexts/League/LeagueContext";
import { getContrastColor } from "@/components/Match/HeadToHead/head-to-head-helper";
import { Block } from "@/components/Block";

export default function KnockoutPage() {
  const router = useRouter();
  const { season } = router.query;
  const { leagueBannerData } = useLeague();
  const seasonId = season ? season : leagueBannerData?.seasons?.[0]?.season_id;
  const { data: knockout, isLoading } = useGetLeagueKnockout({ seasonId });

  if (isLoading) {
    return (
      <Block>
        <div className="relative h-96 bg-gray-200 rounded-md overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );
  }

  return (
    <KnockoutProvider>
      <Block className="py-10">
        <Bracket knockoutData={knockout} />
      </Block>
    </KnockoutProvider>
  );
}
