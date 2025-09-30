import { Fixture, GroupedByLeague } from "@/types/dashboard";

export function groupLeaguesByCountry(data) {
  const countryMap = {};

  data.forEach(item => {
    const {
      country,
      country_logo,
      league_id,
      league,
      league_logo,
      is_favourite
    } = item;

    if (!countryMap[country]) {
      countryMap[country] = {
        country,
        countryLogo: country_logo,
        leagues: []
      };
    }

    countryMap[country].leagues.push({
      leagueId: league_id,
      league,
      leagueLogo: league_logo,
      isFavourite: is_favourite
    });
  });

  return Object.values(countryMap);
}





export function groupFixturesByLeague(fixtures: Fixture[]): GroupedByLeague[] {
  if (!fixtures) return [];
  const groupedMap = new Map<number, GroupedByLeague>();

  for (const fixture of fixtures) {
    if (!groupedMap.has(fixture.league_id)) {
      groupedMap.set(fixture.league_id, {
        league_id: fixture.league_id,
        league: fixture.league,
        league_logo: fixture.league_logo,
        country: fixture.country,
        country_logo: fixture.country_logo,
        matches: [],
      });
    }

    groupedMap.get(fixture.league_id)!.matches.push(fixture);
  }

  return Array.from(groupedMap.values());
}



export function getTagColors(state: any) {
  
  const grayStates = [
    "FT",
    "NS",
    "FTP",
    "POST",
    "SUSP",
    "CANC",
    "TBA",
    "WO",
    "ABAN",
    "DELA",
    "AWAR",
    "AU",
    "DEL",
  ];

  if (grayStates.includes(state)) {
    return "bg-gray-200 text-gray-600";
  }

  return "bg-primary text-white";
}
