import { useGetLeagueBannerData } from "@/features/Fixtures/useFixturesByDate";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

type LeagueContextType = {
  leagueBannerData: any;
};

const LeagueContext = createContext<LeagueContextType | null>(null);

export function LeagueProvider({ children, league }) {
  const leagueBannerData = league;

  console.log("league", league);
  return (
    <LeagueContext.Provider value={{ leagueBannerData }}>
      {children}
    </LeagueContext.Provider>
  );
}

export const useLeague = () => {
  const context = useContext(LeagueContext);
  if (!context)
    throw new Error("useLeague must be used within a LeagueProvider");
  return context;
};
