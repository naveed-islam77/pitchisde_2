import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function OverallStats({ stats, minutes_played }) {
  const {
    avg_rating,
    max_rating,
    min_rating,
    appearances,
    sub_in,
    sub_out,
    benched,
  } = stats || {};

  const getPer90 = (stat) => {
    if (!stat || minutes_played === 0) return "";
    return ((stat / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Overall", "Total", "Per 90"]}>
      {
        <StatsRow
          stat={[
            "Rating (Min/Max)",
            `${avg_rating} (${min_rating} / ${max_rating})`,
            getPer90(avg_rating),
          ]}
        />
      }
      {appearances && (
        <StatsRow
          stat={["Starts / Appearances", appearances, getPer90(appearances)]}
        />
      )}
      {
        <StatsRow
          stat={[
            "Substitutions in / out",
            `${sub_in} / ${sub_out}`,
            getPer90(sub_in),
          ]}
        />
      }
      {benched && (
        <StatsRow stat={["Benched", `${benched}`, getPer90(benched)]} />
      )}
      {minutes_played && (
        <StatsRow
          stat={["Minutes Played", minutes_played, getPer90(minutes_played)]}
        />
      )}
    </StatsTable>
  );
}

export default OverallStats;
