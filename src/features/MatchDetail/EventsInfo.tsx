import { Block } from "@/components/Block";
import Divider from "@/components/Divider";
import CommentaryInfo from "@/components/Match/EventsInfo/CommentaryInfo";
import { TabButton } from "@/components/TabBlock";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  GoalEvent,
  RedCardEvent,
  SubstituteEvent,
  YellowCardEvent,
} from "./Events";
import { getPeriodLabel } from "./matchHelpers";
import MatchStatistics from "./MatchStatistics";
import {
  useGetFixtureComments,
  useGetFixtureEvents,
  useGetFixtureStatistics,
} from "./useFixture";

export function EventsInfo() {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: fixtureEvents, isLoading } = useGetFixtureEvents(
    matchId as string
  );
  const { data: fixtureStatistics } = useGetFixtureStatistics(
    matchId as string
  );
  const { data: comments } = useGetFixtureComments(matchId as string);

  if (isLoading) {
    return (
      <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
        <div className="shimmer-effect"></div>
      </div>
    );
  }

  return (
    <Block padding={false} className="shrink-0">
      <TabGroup as="div" className="overflow-auto">
        <TabList
          as="div"
          className="flex gap-1 p-1 px-1.5 bg-light rounded-full m-4"
        >
          {fixtureEvents ? <TabButton label="Events" /> : null}
          {fixtureStatistics && <TabButton label="Stats" />}
          {comments && comments.length ? (
            <TabButton label="Commentary" />
          ) : null}
        </TabList>
        <TabPanels>
          {/* events */}
          <TabPanel>
            <div className="space-y-6 mb-4 px-4 max-h-[700px] overflow-y-auto">
              {fixtureEvents?.map((event: any) => {
                return (
                  <div key={event?.id}>
                    <Divider label={getPeriodLabel(event?.event_type)} />
                    <div className="space-y-4">
                      <div className="text-center py-2 text-sm text-x-darkgreen">
                        +{event.minute} minutes
                      </div>
                      <Event
                        isHomeTeam={event?.side === "home"}
                        event={event}
                      />
                    </div>
                  </div>
                );
              })}
              ;
            </div>
          </TabPanel>
          {/* statistics */}
          <TabPanel>
            <MatchStatistics statistics={fixtureStatistics} />
          </TabPanel>
          {/* comments  */}

          <CommentaryInfo comments={comments} />
        </TabPanels>
      </TabGroup>
    </Block>
  );
}

function Event({ event, isHomeTeam }) {
  return (
    <>
      {event?.event_type === "Yellowcard" ? (
        <YellowCardEvent home={isHomeTeam} event={event} />
      ) : event?.event_type === "Substitution" ? (
        <SubstituteEvent home={isHomeTeam} event={event} />
      ) : event?.event_type === "Goal" || event?.event_type === "Own Goal" ? (
        <GoalEvent home={isHomeTeam} event={event} />
      ) : event?.event_type === "Redcard" ? (
        <RedCardEvent home={isHomeTeam} event={event} />
      ) : null}
    </>
  );
}
