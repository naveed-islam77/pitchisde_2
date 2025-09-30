import { createContext, useContext } from "react";

export interface TeamContextProps {
  team: any;
  teamBanner: any;
}

const TeamContext = createContext<TeamContextProps | null>(null);

export function TeamProvider({ children, team }) {
  const teamBanner = team;

  console.log("team", team);
  return (
    <TeamContext.Provider value={{ team, teamBanner }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam: any = () => useContext(TeamContext);
