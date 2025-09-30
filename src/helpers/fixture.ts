export function groupByStatCategory(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.stat_category]) {
      acc[item.stat_category] = [];
    }
    acc[item.stat_category].push(item);
    return acc;
  }, {});
}

export function filterChannelsByCountry(tvChannels: any[], selectedCountry: string | null) {
  if (!Array.isArray(tvChannels)) return [];

  if (!selectedCountry) return tvChannels;

  return tvChannels.filter((channel) =>
    channel?.country_name === selectedCountry
  );
}

export function groupByLineupType(players) {
  return players?.reduce((acc, player) => {
    const type = player.lineup_type || "unknown";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(player);
    return acc;
  }, {});
}


  export const groupedByRow = (lineups: any) => {
    return lineups?.reduce((acc, player) => {
    const [row] = player.formation_field.split(":").map(Number);
    if (!acc[row]) acc[row] = [];
    acc[row].push(player);
    return acc;
  }, {});
  }




export function mapPlayerDetails(players) {
  return players?.map((p) => ({
    id: p.player_id,
    name: p.player_name.trim(),
    image: p.player_image,
    player_country:  p.player_country,
    player_age: p.player_age,
    rating: p.rating,
  }));
}


export function mergePlayerData(lineupsDetails: any[], activeFilterData: any[]) {
  const lineupMap = new Map(lineupsDetails.map(p => [p.id, p]));

  return activeFilterData.map(stats => {
    const playerMeta = lineupMap.get(stats.player_id) || {};
    return {
      ...stats, 
      ...playerMeta, 
    };
  });
}


export const getNormalizedPercentages = (stats, activeOption) => {
  const homeTotal = stats
    ?.filter((s) => s.side === "home")
    ?.reduce((sum, s) => sum + (s?.[activeOption] ?? 0), 0) ?? 0;

  const awayTotal = stats
    ?.filter((s) => s.side === "away")
    ?.reduce((sum, s) => sum + (s?.[activeOption] ?? 0), 0) ?? 0;

  const total = homeTotal + awayTotal;

  if (total === 0) {
    return { home: 0, away: 0 };
  }

  return {
    home: Math.round((homeTotal / total) * 100),
    away: Math.round((awayTotal / total) * 100),
  };
};


export const getMatchesLeagues = (fixtures) => {
  const uniqueLeagues = new Map();

  fixtures?.forEach((f) => {
    if (!uniqueLeagues.has(f.league_id)) {
      uniqueLeagues.set(f.league_id, {
        league_id: f.league_id,
        league_name: f.league_name,
        league_logo: f.league_logo,
      });
    }
  });

  return Array.from(uniqueLeagues.values());
};


export const groupByLeague = (fixtures) => {
  return fixtures?.reduce((acc, fixture) => {
    if (!acc[fixture.league_id]) acc[fixture.league_id] = [];
    acc[fixture.league_id].push(fixture);
    return acc;
  }, {});
};


export const groupByTeams = (data: any, activeLeague?: string | null) => {
  const filteredData = activeLeague
    ? data?.filter((f) => f.league_id === activeLeague)
    : data;

  const result = filteredData?.reduce((acc: any, item: any) => {
    if (!acc[item.curr_team_id]) {
      acc[item.curr_team_id] = [item];
    } else {
      acc[item.curr_team_id].push(item);
    }
    return acc;
  }, {});

  return result;
};


