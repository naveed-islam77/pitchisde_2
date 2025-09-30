import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function DefensiveStats({ stats, minutes_played }) {
  const getPer90 = (stat) => {
    if (!stat || minutes_played === 0) return "";
    return ((stat / minutes_played) * 90).toFixed(1);
  };

  const {
    clearances,
    tackles,
    interceptions,
    dribbled_past,
    shots_blocked,
    errors_lead_to_goal,
    penalties_committed,
    goals_conceded,
    cleansheets,
  } = stats || {};

  console.log("errors_lead_to_goal", errors_lead_to_goal);

  return (
    <StatsTable headers={["Defensive", "Total", "Per 90"]}>
      {clearances && (
        <StatsRow
          stat={["Clearances", `${clearances}`, getPer90(clearances)]}
        />
      )}
      {tackles && (
        <StatsRow stat={["Tackles", `${tackles}`, getPer90(tackles)]} />
      )}
      {interceptions && (
        <StatsRow
          stat={["Interceptions", `${interceptions}`, getPer90(interceptions)]}
        />
      )}
      {shots_blocked && (
        <StatsRow
          stat={["Blocked Shots", `${shots_blocked}`, getPer90(shots_blocked)]}
        />
      )}
      {dribbled_past && (
        <StatsRow
          stat={["Dribbled Past", `${dribbled_past}`, getPer90(dribbled_past)]}
        />
      )}
      {errors_lead_to_goal > 0 && (
        <StatsRow
          stat={[
            "Errors Lead to Goal",
            `${errors_lead_to_goal}`,
            getPer90(errors_lead_to_goal),
          ]}
        />
      )}
      {penalties_committed > 0 && (
        <StatsRow
          stat={[
            "Penalties Given",
            `${penalties_committed}`,
            getPer90(penalties_committed),
          ]}
        />
      )}
      {goals_conceded && (
        <StatsRow
          stat={[
            "Goals Conceded",
            `${goals_conceded}`,
            getPer90(goals_conceded),
          ]}
        />
      )}
      {cleansheets && (
        <StatsRow
          stat={["Clean Sheets", `${cleansheets}`, getPer90(cleansheets)]}
        />
      )}
    </StatsTable>
  );
}

export default DefensiveStats;
