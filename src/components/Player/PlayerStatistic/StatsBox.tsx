import DefensiveStats from "./DefensiveStats";
import DisciplineStats from "./DisciplineStats";
import GoalkeepingStats from "./GoalkeepingStats";
import OffensiveStats from "./OffensiveStats";
import OverallStats from "./OverallStats";

function StatsBox({ stats, role }) {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Left Column */}
      <div className="flex-1 space-y-10">
        <OverallStats stats={stats} minutes_played={stats?.minutes} />
        {role === "Goalkeeper" && (
          <GoalkeepingStats stats={stats} minutes_played={stats?.minutes} />
        )}
        <DefensiveStats stats={stats} minutes_played={stats?.minutes} />
      </div>

      {/* Right Column */}
      <div className="flex-1 space-y-10">
        <OffensiveStats stats={stats} minutes_played={stats?.minutes} />
        <DisciplineStats stats={stats} minutes_played={stats?.minutes} />
      </div>
    </div>
  );
}

export default StatsBox;
