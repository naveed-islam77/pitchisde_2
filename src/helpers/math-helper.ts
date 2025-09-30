export function groupFixturesByDate(array) {
  const grouped = array.reduce((acc, obj) => {
    const key = obj?.starting_at?.split(" ")[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((key) => ({
      date: key,
      matches: grouped[key],
    }));
}

// [groupFixturesByWeek]

export function groupFixturesByWeek(fixtures) {
  if (!Array.isArray(fixtures) || fixtures.length === 0) return {};
  

const getWeekStart = (dateStr) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);

  const day = date.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  return monday.toISOString().split("T")[0];
};

  const unsortedFixturesByWeek = {};

  for (const fixture of fixtures) {
    const weekKey = getWeekStart(fixture.fixture_utc_timestamp);

    if (!unsortedFixturesByWeek[weekKey ?? ""]) {
      unsortedFixturesByWeek[weekKey ?? ""] = [];
    }

    unsortedFixturesByWeek[weekKey ?? ""].push(fixture);
  }

  const sortedWeeks = Object.keys(unsortedFixturesByWeek).sort().reverse(); // Most recent first

  const fixturesByWeek = {};
  for (const week of sortedWeeks) {
    fixturesByWeek[week] = unsortedFixturesByWeek[week];
  }

  return fixturesByWeek;
}

export function groupByMatchWeeks(data) {
  if (!Array.isArray(data) || data.length === 0) return {};

  const grouped = {};

  for (const stage of data) {
    if (stage.games_in_current_week && stage?.aggregates?.length > 0) {
      for (const fixtures of stage?.aggregates) {
        if (!grouped["Current Week Matches"]) {
          grouped["Current Week Matches"] = [];
        }
        grouped["Current Week Matches"].push(...fixtures?.fixtures);
      }
    }
  }

  // Sort the fixtures by starting_at datetime (ascending)
  if (grouped["Current Week Matches"]) {
    grouped["Current Week Matches"].sort(
      (a, b) =>
        new Date(b.starting_at).getTime() - new Date(a.starting_at).getTime()
    );
  }

  return grouped;
}

export function getFixturesByRoundStage(fixtures, currentStage) {
  return fixtures.filter(fixture => fixture.round_stage === currentStage);
}

export function getCurrentWeekFixtures(fixtures: any[]) {
  if (!fixtures?.length) return [];

  // const weekNumbers = fixtures
  //   .map(f => {
  //     const match = f.round_stage?.match(/Matchweek (\d+)/);
  //     return match ? parseInt(match[1], 10) : null;
  //   })
  //   .filter((week): week is number => week !== null);

  // if (weekNumbers.length === 0) return [];

  // const currentWeek = Math.max(...weekNumbers);

  
  return fixtures.filter(f => f.round_stage === `current_week`);
}


export const updateDisplayedFixtures = (
  fixtures: any,
  weeksToShow: number,
  setDisplayedFixtures
) => {
  const weekKeys = Object.keys(fixtures).sort().reverse();
  const weeksToDisplay = weekKeys.slice(0, weeksToShow);
  const result: Record<string, any> = {};

  weeksToDisplay.forEach((week) => {
    result[week] = fixtures[week];
  });

  const values = Object.values(result);
  setDisplayedFixtures(result);
};
