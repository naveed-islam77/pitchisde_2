import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function GoalkeepingStats({ stats, minutes_played }) {
  const goalsData = Object.fromEntries(
    Object.entries(GoalkeepingStats)?.map(([key, type]) => [
      key,
      stats?.details?.find((stat) => stat?.type_id === type),
    ])
  );

  const { saves, savesInsideBox, penaltiesSaved } = goalsData;

  const getPer90 = (stat) => {
    if (!stat?.value?.total || minutes_played === 0) return "";
    return ((stat.value.total / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Goalkeeping", "Total", "Per 90"]}>
      {saves && (
        <StatsRow stat={["Saves", saves.value.total, getPer90(saves)]} />
      )}
      {savesInsideBox && (
        <StatsRow
          stat={[
            "Saves Inside Box",
            savesInsideBox.value.total,
            getPer90(savesInsideBox),
          ]}
        />
      )}
      {penaltiesSaved && (
        <StatsRow
          stat={[
            "Penalties Saved",
            `${penaltiesSaved.value.total}`,
            getPer90(penaltiesSaved),
          ]}
        />
      )}
    </StatsTable>
  );
}

export default GoalkeepingStats;
