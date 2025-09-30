function BattleRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Dispossessions":
      return <td className={className}>{playerStats?.dispossessed}</td>;

    case "Aerials":
      return (
        <td className={className}>
          {playerStats?.aerials_won}/{playerStats?.total_aerials} (
          {playerStats?.total_aerials > 0
            ? Math.round(
                (playerStats.aerials_won / playerStats.total_aerials) * 100
              )
            : 0}
          %)
        </td>
      );

    case "Duels":
      return (
        <td className={className}>
          {playerStats?.duels_won}/{playerStats?.duels_total} (
          {playerStats?.duels_total > 0
            ? Math.round(
                (playerStats.duels_won / playerStats.duels_total) * 100
              )
            : 0}
          %)
        </td>
      );

    case "Tackles":
      return (
        <td className={className}>
          {playerStats?.tackles_won}/{playerStats?.tackles_total} (
          {playerStats?.tackles_total > 0
            ? Math.round(
                (playerStats.tackles_won / playerStats.tackles_total) * 100
              )
            : 0}
          %)
        </td>
      );

    case "Dribbles":
      return (
        <td className={className}>
          {playerStats?.succ_dribbles}/{playerStats?.dribbles_total} (
          {playerStats?.dribbles_total > 0
            ? Math.round(
                (playerStats.succ_dribbles / playerStats.dribbles_total) * 100
              )
            : 0}
          %)
        </td>
      );

    case "Dribbled Past":
      return <td className={className}>{playerStats?.dribbled_past || 0}</td>;

    default:
      return null;
  }
}

export default BattleRow;
