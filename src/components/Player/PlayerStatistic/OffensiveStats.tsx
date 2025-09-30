import StatsRow from "./StatsRow";
import StatsTable from "./StatsTable";

function OffensiveStats({ stats, minutes_played }) {
  const {
    goals,
    penalties_total,
    penalties_scored: penaltiesScored,
    penalties_scored: penaltiesWon,
    assists,
    shots_on_target: shotsOnTarget,
    shots: totalShots,
    shots_blocked: shotsBlocked,
    hit_woodwork: hitWoodwork,
    key_passes: keyPasses,
    long_balls: longBalls,
    long_balls_won: longBallsWon,
    through_balls: throughBalls,
    through_balls_won: throughBallsWon,
    total_crosses: totalCrosses,
    acc_crosses: accurateCrosses,
    total_duels: totalDuels,
    duels_won: duelsWon,
    total_dribbles: dribbleAttemps,
    succ_dribbles: successfulDribbles,
    offsides,
    dispossessed,
  } = stats || {};

  const getPer90 = (stat) => {
    if (!stat || minutes_played === 0) return "";
    return ((stat / minutes_played) * 90).toFixed(1);
  };

  return (
    <StatsTable headers={["Offensive", "Total", "Per 90"]}>
      {goals > 0 && (
        <StatsRow
          stat={[
            "Goals (Penalties)",
            `${goals} (${penalties_total})`,
            getPer90(goals),
          ]}
        />
      )}
      {penaltiesScored > 0 && (
        <StatsRow
          stat={[
            "Penalties Scored",
            `${penaltiesScored}`,
            getPer90(penaltiesScored),
          ]}
        />
      )}
      {penaltiesWon > 0 && (
        <StatsRow
          stat={["Penalties Won", `${penaltiesWon}`, getPer90(penaltiesWon)]}
        />
      )}
      {assists > 0 && (
        <StatsRow stat={["Assists", `${assists}`, getPer90(assists)]} />
      )}
      {shotsOnTarget && totalShots && (
        <StatsRow
          stat={[
            "On Target / Total Shots (%)",
            `${shotsOnTarget} / ${totalShots} (${(
              (shotsOnTarget / totalShots) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(totalShots)} / ${getPer90(totalShots)}`,
          ]}
        />
      )}
      {shotsBlocked > 0 && (
        <StatsRow
          stat={["Shots Blocked", `${shotsBlocked}`, getPer90(shotsBlocked)]}
        />
      )}
      {hitWoodwork > 0 && (
        <StatsRow
          stat={["Hit Woodwork", `${hitWoodwork}`, getPer90(hitWoodwork)]}
        />
      )}
      {keyPasses && (
        <StatsRow stat={["Key Passes", `${keyPasses}`, getPer90(keyPasses)]} />
      )}
      {longBalls && longBallsWon && (
        <StatsRow
          stat={[
            "Long Balls Won / Total (%)",
            `${longBallsWon} / ${longBalls} (${(
              (longBallsWon / longBalls) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(longBalls)} / ${getPer90(longBallsWon)}`,
          ]}
        />
      )}
      {throughBalls && throughBallsWon && (
        <StatsRow
          stat={[
            "Through Balls Won / Total (%)",
            `${throughBallsWon} / ${throughBalls} (${(
              (throughBallsWon / throughBalls) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(throughBalls)} / ${getPer90(throughBallsWon)}`,
          ]}
        />
      )}
      {accurateCrosses && totalCrosses && (
        <StatsRow
          stat={[
            "Accurate / Total Crosses (%)",
            `${accurateCrosses} / ${totalCrosses} (${(
              (accurateCrosses / totalCrosses) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(accurateCrosses)} / ${getPer90(totalCrosses)}`,
          ]}
        />
      )}
      {duelsWon && totalDuels && (
        <StatsRow
          stat={[
            "Duels Won / Total (%)",
            `${duelsWon} / ${totalDuels} (${(
              (duelsWon / totalDuels) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(duelsWon)}/ ${getPer90(totalDuels)}`,
          ]}
        />
      )}
      {successfulDribbles && dribbleAttemps && (
        <StatsRow
          stat={[
            "Successful / Attempted Dribbles (%)",
            `${successfulDribbles} / ${dribbleAttemps} (${(
              (successfulDribbles / dribbleAttemps) *
              100
            ).toFixed(1)}%)`,
            `${getPer90(successfulDribbles)} / ${getPer90(dribbleAttemps)}`,
          ]}
        />
      )}
      {offsides > 0 && (
        <StatsRow stat={["Offsides", `${offsides}`, getPer90(offsides)]} />
      )}
      {dispossessed > 0 && (
        <StatsRow
          stat={["Dispossessed", `${dispossessed}`, getPer90(dispossessed)]}
        />
      )}
    </StatsTable>
  );
}

export default OffensiveStats;
