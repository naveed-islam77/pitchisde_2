function DisciplineRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Yellow Cards":
      return <td className={className}>{playerStats?.yellow_cards}</td>;
    case "Red Cards":
      return <td className={className}>{playerStats?.red_cards}</td>;
    case "Fouls Committed":
      return <td className={className}>{playerStats?.fouls}</td>;
    case "Fouls Drawn":
      return <td className={className}>{playerStats?.fouls_drawn}</td>;
    case "Possession Lost":
      return <td className={className}>{playerStats?.possession_lost}</td>;
    case "Turnovers":
      return <td className={className}>{playerStats?.turnovers}</td>;
    case "Offside Committed":
      return <td className={className}>{playerStats?.offsides}</td>;
    case "Offside Provoked":
      return <td className={className}>{playerStats?.offsides_provoked}</td>;
    default:
      return null;
  }
}

export default DisciplineRow;
