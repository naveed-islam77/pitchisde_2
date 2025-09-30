function GoalkeepingRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Saves (Inside Box)":
      return (
        <td className={className}>
          {playerStats?.saves} ({playerStats?.saves_inside_box})
        </td>
      );
    case "Penalities Saved":
      return <td className={className}>{playerStats?.penalties_saved || 0}</td>;
    case "Punches":
      return <td className={className}>{playerStats?.punches || 0}</td>;
    case "Good High Claim":
      return <td className={className}>{playerStats?.good_high_claim || 0}</td>;

    default:
      return null;
  }
}

export default GoalkeepingRow;
