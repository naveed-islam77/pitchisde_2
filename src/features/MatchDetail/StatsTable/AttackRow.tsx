function AttackRow({ playerStats, header }) {
  const className =
    "w-32 px-2 border-r border-gray-300 whitespace-normal break-words text-center leading-4 font-semibold last:border-r-0";
  switch (header) {
    case "Goals":
      return <td className={className}>{playerStats?.goals}</td>;
    case "Key Passes":
      return <td className={className}>{playerStats?.key_passes}</td>;

    case "Assists":
      return <td className={className}>{playerStats?.assists}</td>;
    case "Shots":
      return <td className={className}>{playerStats?.total_shots}%</td>;
    // case "Crosses":
    //   return <td className={className}>{playerStats?.penalties_scored} %</td>;
    case "Big Chances Created":
      return <td className={className}>{playerStats?.big_chances_created}</td>;
    case "Big Chances Missed":
      return <td className={className}>{playerStats?.big_chances_missed}</td>;
    case "Hit Woodwork":
      return <td className={className}>{playerStats?.hit_woodwork}</td>;

    default:
      return null;
  }
}

export default AttackRow;
