import { AppLayout } from "@/layouts/AppLayout";
import { useState } from "react";
import Channels from "./Channels";
import { EventsInfo } from "./EventsInfo";
import Forms from "./Forms";
import { HeadToHead } from "./HeadToHead";
import { Hero } from "./Hero";
import LineupField from "./LineupField";
import PressureChart from "./PressureChart";
import { MatchMiniStandings } from "./MatchMiniStandings";
import NextFixture from "./NextFixture";
import FixtureRoundMatches from "./FixtureRoundMatches";

export default function MatchDetail() {
  const [showPlayerStatistics, setShowPlayerStatistics] = useState(false);

  return (
    <AppLayout>
      <Hero />
      <div className="mt-6 flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="basis-1/3 space-y-5">
          <div className="app-block rounded-2xl px-2 pl-3">
            <PressureChart />
          </div>

          <EventsInfo />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-5">
            <Forms />
            <NextFixture />
            <MatchMiniStandings />
            <HeadToHead />
            <Channels />
          </div>
        </div>
        <div className="basis-2/3 space-y-5">
          <LineupField
            setShowPlayerStatistics={setShowPlayerStatistics}
            showPlayerStatistics={showPlayerStatistics}
          />
        </div>
        <div>
          <FixtureRoundMatches />
        </div>
      </div>
    </AppLayout>
  );
}
