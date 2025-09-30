import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function DisciplineStats({ stats, minutes_played }) {
  const {
    fouls,
    fouls_drawn: foulsDrawn,
    yellow_cards: yellowCards,
    red_cards: redCards,
  } = stats || {};

  const getPer90 = (stat) => {
    if (!stat || minutes_played === 0) return "";
    return ((stat / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Discipline", "Total", "Per 90"]}>
      {fouls && <StatsRow stat={["Fouls", `${fouls}`, getPer90(fouls)]} />}
      {foulsDrawn > 0 && (
        <StatsRow
          stat={["Fouls Drawn", `${foulsDrawn}`, getPer90(foulsDrawn)]}
        />
      )}
      {yellowCards > 0 && (
        <StatsRow
          stat={["Yellow Cards", `${yellowCards}`, getPer90(yellowCards)]}
        />
      )}
      {redCards > 0 && (
        <StatsRow stat={["Red Cards", `${redCards}`, getPer90(redCards)]} />
      )}
    </StatsTable>
  );
}

export default DisciplineStats;
