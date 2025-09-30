import { HoverProvider } from "@/contexts/League/useHover";
import LeagueGrid from "./LeagueGrid";

export function Trophies() {


  return (
    <HoverProvider>
      <div className="bg-white shadow-md rounded-xl p-4 text-lg font-semibold">
        <h1>History</h1>
        <LeagueGrid />
      </div>
    </HoverProvider>
  );
}
