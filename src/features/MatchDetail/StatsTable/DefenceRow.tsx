function DefenseRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Clearances (Off Line)":
      return (
        <td className={className}>
          {playerStats?.clearances} ({playerStats?.off_line_clearances})
        </td>
      );
    case "Interceptions":
      return <td className={className}>{playerStats?.interceptions}</td>;
    // case "Ball Safe":
    //   return <td className={className}>{playerStats?.ball_recoveries}</td>;
    // case "Goals Conceded":
    //   return <td className={className}>{playerStats?.error_to_goal}</td>;
    case "Shots Blocked":
      return <td className={className}>{playerStats?.shots_blocked}</td>;
    case "Penalties Committed":
      return <td className={className}>{playerStats?.penalties_committed}</td>;
    case "Errors Leading to Shot":
      return <td className={className}>{playerStats?.error_to_shot}</td>;

    case "Errors Leading to Goal":
      return <td className={className}>{playerStats?.error_to_goal}</td>;
    case "Recoveries":
      return <td className={className}>{playerStats?.ball_recoveries}</td>;
    default:
      return null;
  }
}

export default DefenseRow;
