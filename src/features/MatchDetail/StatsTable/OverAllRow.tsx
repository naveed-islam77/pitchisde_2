function OverallRow({ playerStats, header }) {
  const { shots_on_target, total_shots } = playerStats;
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Rating":
      return <td className={className}>{playerStats?.rating}</td>;
    case "Minutes":
      return <td className={className}>{playerStats?.minutes}</td>;
    case "Goals":
      return <td className={className}>{playerStats?.goals}</td>;
    case "Assists":
      return <td className={className}>{playerStats?.assists}</td>;
    case "Shots":
      return (
        <td className={className}>
          {shots_on_target}/{total_shots} (
          {total_shots > 0
            ? ((shots_on_target / total_shots) * 100).toFixed(1)
            : 0}
          %)
        </td>
      );
    case "Passes":
      return (
        <td className={className}>
          {playerStats?.accurate_passes}/{playerStats?.total_passes} (
          {playerStats?.total_passes > 0
            ? Math.round(
                (playerStats.accurate_passes / playerStats.total_passes) * 100
              )
            : 0}
          %)
        </td>
      );
    case "Touches":
      return <td className={className}>{playerStats?.touches}</td>;

    default:
      return null;
  }
}

export default OverallRow;
