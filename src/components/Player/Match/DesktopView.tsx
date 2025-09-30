import { LeagueSlider } from "@/components/LeagueSlider/LeagueSlider";
import { useRouter } from "next/router";
import { useState } from "react";
import DesktopRow from "./DesktopRow";

function DesktopView({ lineups }) {
  const router = useRouter();
  const [selectedLeague, setSelectedLeague] = useState("");

  return (
    <>
      <div className="px-4 py-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">Matches</h2>
      </div>

      <LeagueSlider
        leagues={lineups}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
      />
      <div className="max-h-[24rem] overflow-y-auto">
        {lineups?.length
          ? lineups?.map((match) => <DesktopRow key={match.id} match={match} />)
          : null}
      </div>
    </>
  );
}

export default DesktopView;
