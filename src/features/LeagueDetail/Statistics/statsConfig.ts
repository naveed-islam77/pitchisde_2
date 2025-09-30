export const playerStatsConfig = {
  avg_rating: {
    title: "Average Rating",
    valueKey: "avg_rating",
    valueFormatter: (p: any) => p.avg_rating?.toFixed(2),
  },
  Minutes: {
    title: "Minutes Played",
    valueKey: "Minutes",
  },
  Clearances: {
    title: "Clearances",
    valueKey: "Clearances",
  },
  Tackles: {
    title: "Tackles",
    valueKey: "Tackles",
  },
  Interceptions: {
    title: "Interceptions",
    valueKey: "Interceptions",
  },
  Blocks: {
    title: "Blocks",
    valueKey: "Blocks",
  },
  "Dribbled Past": {
    title: "Dribbled Past",
    valueKey: "Dribbled Past",
  },
  "Errors Leading to Goal": {
    title: "Errors Leading to Goal",
    valueKey: "Errors Leading to Goal",
  },
  "Penalties Committed": {
    title: "Penalties Committed",
    valueKey: "Penalties Committed",
  },
  "Goals Conceded": {
    title: "Goals Conceded",
    valueKey: "Goals Conceded",
  },
  Cleansheets: {
    title: "Clean Sheets",
    valueKey: "Cleansheets",
  },
  Goals: {
    title: "Goals",
    valueKey: "Goals",
    extra: (p: any) => `penalties: ${p["Penalties Committed"] || 0}`,
  },
  Assists: {
    title: "Assists",
    valueKey: "Assists",
  },
  "Shots On Target (%)": {
    title: "Shots On Target (%)",
    valueKey: "Shots On Target (%)",
    valueFormatter: (p: any) => `${p["Shots On Target (%)"]}%`,
  },
  "Hit Woodwork": {
    title: "Hit Woodwork",
    valueKey: "Hit Woodwork",
  },
  "Duels Won (%)": {
    title: "Duels Won (%)",
    valueKey: "Duels Won (%)",
    valueFormatter: (p: any) => `${p["Duels Won (%)"]}%`,
  },
  "Dribbles Won (%)": {
    title: "Dribbles Won (%)",
    valueKey: "Dribbles Won (%)",
    valueFormatter: (p: any) => `${p["Dribbles Won (%)"]}%`,
  },
  Dispossessed: {
    title: "Dispossessed",
    valueKey: "Dispossessed",
  },
  Offsides: {
    title: "Offsides",
    valueKey: "Offsides",
  },
  "Accurate Passes (%)": {
    title: "Accurate Passes (%)",
    valueKey: "Accurate Passes (%)",
    valueFormatter: (p: any) => `${p["Accurate Passes (%)"]}%`,
  },
  "Key Passes": {
    title: "Key Passes",
    valueKey: "Key Passes",
  },
  "Long Balls Won (%)": {
    title: "Long Balls Won (%)",
    valueKey: "Long Balls Won (%)",
    valueFormatter: (p: any) => `${p["Long Balls Won (%)"]}%`,
  },
  "Through Balls Won (%)": {
    title: "Through Balls Won (%)",
    valueKey: "Through Balls Won (%)",
    valueFormatter: (p: any) => `${p["Through Balls Won (%)"]}%`,
  },
  "Accurate Crosses (%)": {
    title: "Accurate Crosses (%)",
    valueKey: "Accurate Crosses (%)",
    valueFormatter: (p: any) => `${p["Accurate Crosses (%)"]}%`,
  },
  "Fouls Committed": {
    title: "Fouls Committed",
    valueKey: "Fouls Committed",
  },
  "Fouls Drawn": {
    title: "Fouls Drawn",
    valueKey: "Fouls Drawn",
  },
  "Yellow Cards": {
    title: "Yellow Cards",
    valueKey: "Yellow Cards",
  },
  "Red Cards": {
    title: "Red Cards",
    valueKey: "Red Cards",
  },
  Saves: {
    title: "Saves",
    valueKey: "Saves",
  },
  "Penalties Saved": {
    title: "Penalties Saved",
    valueKey: "Penalties Saved",
  },
};


export const teamStatsConfig = {
  attacks_per_match: {
    title: "Attacks per Match",
    valueKey: "attacks_per_match",
  },
  dang_attacks_per_match: {
    title: "Dangerous Attacks per Match",
    valueKey: "dang_attacks_per_match",
  },
  avg_possession: {
    title: "Average Possession",
    valueKey: "avg_possession",
    valueFormatter: (t: any) => `${t.avg_possession?.toFixed(1)}%`,
  },
  cleansheets: {
    title: "Clean Sheets",
    valueKey: "cleansheets",
  },
  corners_per_match: {
    title: "Corners per Match",
    valueKey: "corners_per_match",
    valueFormatter: (t: any) => t.corners_per_match?.toFixed(2),
  },
  fouls_per_match: {
    title: "Fouls per Match",
    valueKey: "fouls_per_match",
    valueFormatter: (t: any) => t.fouls_per_match?.toFixed(2),
  },
  fouls_per_card: {
    title: "Fouls per Card",
    valueKey: "fouls_per_card",
    valueFormatter: (t: any) => t.fouls_per_card?.toFixed(2),
  },
  goals_per_match: {
    title: "Goals per Match",
    valueKey: "goals_per_match",
    valueFormatter: (t: any) => t.goals_per_match?.toFixed(2),
  },
  goals_conceded_per_match: {
    title: "Goals Conceded per Match",
    valueKey: "goals_conceded_per_match",
    valueFormatter: (t: any) => t.goals_conceded_per_match?.toFixed(2),
  },
  comebacks: {
    title: "Comebacks",
    valueKey: "comebacks",
  },
  stoppage_time_goals: {
    title: "Stoppage Time Goals",
    valueKey: "stoppage_time_goals",
  },
  interceptions_per_match: {
    title: "Interceptions per Match",
    valueKey: "interceptions_per_match",
    valueFormatter: (t: any) => t.interceptions_per_match?.toFixed(2),
  },
  minutes_per_goals: {
    title: "Minutes per Goal",
    valueKey: "minutes_per_goals",
    valueFormatter: (t: any) => t.minutes_per_goals?.toFixed(2),
  },
  tackles_per_match: {
    title: "Tackles per Match",
    valueKey: "tackles_per_match",
    valueFormatter: (t: any) => t.tackles_per_match?.toFixed(2),
  },
  yellow_cards: {
    title: "Yellow Cards",
    valueKey: "yellow_cards",
  },
  red_cards: {
    title: "Red Cards",
    valueKey: "red_cards",
  },
};
