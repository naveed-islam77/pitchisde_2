export function reformatLeagueSeasonData(data) {
  const leagueMap = {};

  data?.forEach(item => {
    const key = `${item.league_id}-${item.season_id}`;

    if (!leagueMap[key]) {
      leagueMap[key] = {
        league_id: item.league_id,
        league_name: item.league_name,
        league_logo: item.league_logo,
        season_id: item.season_id,
        season_name: item.season_name,
        teams: [],
      };
    }

    leagueMap[key].teams.push({
      team_id: item.team_id,
      team_name: item.team_name,
      team_logo: item.team_logo,
      position: item.position,
      points: item.points,
      wins: item.wins,
      draws: item.draws,
      losses: item.losses,
    });
  });

  return Object.values(leagueMap);
}


export function getPositionSuffix(position: number): string {
  const j = position % 10;
  const k = position % 100;

  if (k >= 11 && k <= 13) {
    return "th";
  }

  const positionEndMap: { [key: number]: string } = {
    1: "st",
    2: "nd",
    3: "rd",
  };

  return positionEndMap[j] || "th";
}


export function extractRoundStages(fixtures) {
  const roundStages = Array.from(
    new Set(
      fixtures
        ?.map(fixture => fixture.round_stage)
        .filter(Boolean)
    )
  );

  const sortedRoundStages = roundStages.sort((a: any, b: any) => a?.split(" ")[1] - b?.split(" ")[1]);

  return sortedRoundStages;
}

export function extractCategories(data) {
  const roundStages = Array.from(
    new Set(
      data
        ?.map(d => d.category)
        .filter(Boolean)
    )
  );

  return roundStages;
}


export function groupBySeason(data: any) {
  if (!Array.isArray(data)) return {};

  return data.reduce((acc, item) => {
    const season = item.season_name;

    if (!acc[season]) {
      acc[season] = [];
    }


    const existingTeam = acc[season].find(
      (team: any) => team.team_id === item.team_id
    );

    if (existingTeam) {
      existingTeam.points += item.points || 0;
      existingTeam.wins += item.wins || 0;
      existingTeam.draws += item.draws || 0;
      existingTeam.losses += item.losses || 0;
    } else {
      acc[season].push({
        ...item,
        points: item.points || 0,
        wins: item.wins || 0,
        draws: item.draws || 0,
        losses: item.losses || 0,
      });
    }

    return acc;
  }, {} as Record<string, any[]>);
}


export function getSeasons(data: any) {
  if (!Array.isArray(data)) return [];
  
  const seasons = [...new Set(data.map(item => item.season_name))];
  return seasons.sort((a, b) => b.localeCompare(a));
}


function parseFormation(formation: string) {
  return formation.split("-").map(Number);
}


export function arrangePlayersByFormation(players: any[], formation: string | null) {
  if (!formation) return { gk: null, rows: [] };
  const numbers = parseFormation(formation);


  const gk = players.find((p) => p.role_name === "GK");
  const outfield = players
    .filter((p) => p.role_name !== "GK")

  let index = 0;
  const rows: any[][] = [];

  numbers.forEach((count) => {
    rows.push(outfield.slice(index, index + count));
    index += count;
  });

  const reversedRows = rows.reverse();

  return { gk, rows: reversedRows };
}



export function getFormations(data: any) {
  if (!Array.isArray(data)) return [];

  const formationsMap = new Map<string, boolean>();

  data.forEach(item => {
    if (item?.formation) {
      const existingBest = formationsMap.get(item.formation) || false;
      formationsMap.set(item.formation, existingBest || item.is_best === true);
    }
  });

  return Array.from(formationsMap.entries())
    .map(([formation, is_best]) => ({ formation, is_best }))
    .sort((a, b) => b.formation.localeCompare(a.formation));
}