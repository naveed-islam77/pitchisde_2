import MatchSkeleton from "@/components/Skeletons/MatchSkeleton";
import { TitleStrip } from "@/components/TitleStrip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { VersusRowList } from "@/components/VersusView";
import { groupFixturesByLeague } from "@/helpers/home";
import { useRouter } from "next/router";
import { useGetLiveMatches } from "../useDashboard";
import { MatchRow } from "./MatchRow";
import NoResults from "./NoResults";

export function MatchListInner({ fixturesData }) {
  const { isLoading, isFetchingNextPage } = fixturesData;
  const { query: searchParams } = useRouter();
  const { liveMatches, isLoading: liveMatchesLoading } = useGetLiveMatches({
    isLive: searchParams.live === "yes",
  });

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <MatchSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!searchParams.live && fixturesData?.fixtures?.length === 0) {
    return <NoResults message="No matches available" />;
  }

  if (
    searchParams.live === "yes" &&
    !liveMatchesLoading &&
    liveMatches?.length === 0
  ) {
    return <NoResults message="No Live Matches" />;
  }

  const leagues = groupFixturesByLeague(fixturesData?.fixtures);
  const liveFixtures = groupFixturesByLeague(liveMatches);
  const leagueMatches = searchParams.live === "yes" ? liveFixtures : leagues;

  return (
    <section>
      <Accordion
        key={searchParams.live === "yes" ? "live" : "normal"}
        defaultValue={leagueMatches?.map((league) => String(league.league_id))}
        type="multiple"
      >
        {leagueMatches?.map((league) => (
          <AccordionItem
            value={String(league.league_id)}
            key={league.league_id}
          >
            <TitleStrip
              matches={league.matches}
              leagueId={String(league?.league_id)}
              icon={league?.league_logo}
              title={`${league?.country} - ${league?.league}`}
            />

            <AccordionContent className="pb-0">
              <VersusRowList>
                {league.matches.map((match) => (
                  <MatchRow key={match.fixture_id} match={match} />
                ))}
              </VersusRowList>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {isFetchingNextPage && (
        <div>
          {Array.from({ length: 2 }, (_, i) => (
            <MatchSkeleton key={i} />
          ))}
        </div>
      )}
    </section>
  );
}
