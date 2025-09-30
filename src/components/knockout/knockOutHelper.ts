export function getRelations(
  stage: string,
  next_match_num: number,
  targetAnchor?: string,
  sourceAnchor?: string
) {
  return next_match_num
    ? [
        {
          targetId: `${next_match_num}`,
          targetAnchor: targetAnchor || "left",
          sourceAnchor: sourceAnchor || "right",
        },
      ]
    : [];
}


export function getStageMatches(
  knockoutData: any[],
  stageName: string,
  parentMatches: any[] = []
) {
  if (!knockoutData) return [];

  let matches = knockoutData?.filter((m) => m.stage_name === stageName);

  if (parentMatches.length > 0) {
    const parentMatchNums = parentMatches?.map((pm) => pm?.match_num);

    matches = matches.filter((m) => parentMatchNums.includes(m?.next_match_num));

    matches.sort((a, b) => {
      const parentIndexA = parentMatchNums.indexOf(a.next_match_num);
      const parentIndexB = parentMatchNums.indexOf(b.next_match_num);
      if (parentIndexA !== parentIndexB) {
        return parentIndexA - parentIndexB;
      }
      return a.match_num - b.match_num;
    });
  } else {
    const sortField =
      stageName === "Semi-finals" ||
      stageName === "Quarter-finals" ||
      stageName === "Round of 16"
        ? "match_num"
        : "next_match_num";

    matches.sort((a, b) => a[sortField] - b[sortField]);
  }

  return matches;
}


export function buildBracket(knockoutData: any[]) {
  const final = knockoutData?.find(m => m.stage_name === "Final");
  const semiFinals = getStageMatches(knockoutData, "Semi-finals", [final]);
  const quarterFinals = getStageMatches(knockoutData, "Quarter-finals", semiFinals);
  const round16 = getStageMatches(knockoutData, "Round of 16", quarterFinals);

  return {
    final,
    left: {
      semiFinal: semiFinals[0],
      quarterFinals: quarterFinals.slice(0, 2),
      round16: round16.slice(0, 4),
    },
    right: {
      semiFinal: semiFinals[1],
      quarterFinals: quarterFinals.slice(2, 4),
      round16: round16.slice(4, 8),
    }
  };
}

