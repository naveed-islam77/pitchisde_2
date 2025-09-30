import { NewsCarouselDetailed } from "./NewsCarouselDetailed";
import { AllCompetitions } from "../../components/Dashboard/AllCompetitions";
import { TopCompetitions } from "../../components/Dashboard/TopCompetitions";
import { FeaturedMatches } from "@/components/Dashboard/NewsCarousel";
import { MatchList } from "./MatchList";
import useFixturesByDate from "../Fixtures/useFixturesByDate";
import { useRef, useState } from "react";
import DashboardMobileFooter from "@/components/Footer/DashboardMobileFooter";

export function Dashboard() {
  const { fixtures, isError, error, isLoading, isFetching } =
    useFixturesByDate();

  const [selectedTab, setSelectedTab] = useState<
    "matches" | "leagues" | "news"
  >("matches");

  const fixturesData = {
    fixtures,
    isError,
    error,
    isLoading,
    isFetching,
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex screen-1145:flex-row flex-col gap-4">
      {/* LEFT: News */}
      <div className="basis-3/12 screen-1145:order-1 order-3 space-y-4">
        <div className="hidden sm:grid grid-cols-1 gap-4 md:grid-cols-2 screen-1145:grid-cols-1">
          <FeaturedMatches />
          <NewsCarouselDetailed />
        </div>
        {/* Mobile News View */}
        {selectedTab === "news" && (
          <div className="sm:hidden space-y-4">
            <FeaturedMatches />
            <NewsCarouselDetailed />
          </div>
        )}
      </div>

      {/* CENTER: Matches */}
      <div className="flex-1 screen-1145:order-2 order-1 relative">
        <div
          className={selectedTab === "matches" ? "block" : "hidden sm:block"}
        >
          <MatchList fixturesData={fixturesData} />
          <div ref={bottomRef} className="h-px"></div>
        </div>
      </div>

      {/* RIGHT: Leagues */}
      <div className="basis-3/12 screen-1145:order-3 order-2 space-y-4">
        <div className="hidden sm:block space-y-4">
          <TopCompetitions />
          <AllCompetitions />
        </div>
        {/* Mobile Leagues View */}
        {selectedTab === "leagues" && (
          <div className="sm:hidden space-y-4">
            <TopCompetitions />
            <AllCompetitions />
          </div>
        )}
      </div>

      {/* Mobile Footer Navigation */}
      <DashboardMobileFooter
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}
