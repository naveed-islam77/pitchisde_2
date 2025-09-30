// export const sortPlayerStats = (
//   playerStatsArray,
//   statCode,
//   isAscending = true
// ) => {
//   return [...playerStatsArray].sort((a, b) => {
//     const aValue = getStatValue(a[1], statCode);
//     const bValue = getStatValue(b[1], statCode);

//     if (aValue === null || aValue === undefined) return 1;
//     if (bValue === null || bValue === undefined) return -1;

//     return isAscending ? aValue - bValue : bValue - aValue;
//   });
// };

// const getStatValue = (statsArray, code) => {
//   const stat = statsArray.find((stat) => {
//     let statCode = stat.type.code?.toLowerCase();

//     switch (statCode) {
//       case "minutes-played":
//         statCode = "minutes";
//         break;
//       case "shots-on-target":
//         statCode = "shots";
//         break;
//       case "key-passes":
//         statCode = "key passes";
//         break;
//       case "accurate-crosses":
//         statCode = "crosses";
//         break;
//       case "big-chances-created":
//         statCode = "big chances created";
//         break;
//       case "big-chances-missed":
//         statCode = "big chances missed";
//         break;
//       case "goals-conceded":
//         statCode = "goals conceded";
//         break;
//       default:
//         return statCode;
//     }

//     const isStat = statCode === code?.toLowerCase();
//     return isStat;
//   });

//   return stat?.data?.value ?? null;
// };

// 1. Generic sorting helper
export function sortData<T>(
  data: T[],
  key: keyof T | string,
  isAscending: boolean
): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[key as keyof T];
    const bValue = b[key as keyof T];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return isAscending ? aValue - bValue : bValue - aValue;
    }

    return isAscending
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
}
