import { GoalStatCard } from "@/components/stat/GoalStatCard";

function Team({ seasonId, key, config }) {
  return (
    <div>
      <GoalStatCard seasonId={seasonId} key={key} config={config} />
    </div>
  );
}

export default Team;
