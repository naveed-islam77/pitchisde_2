import { useState } from "react";
import { Block } from "../Block";
import { IconSearch } from "@tabler/icons-react";
import CountryAccordion from "@/features/Dashboard/Competitions";
import useAllCountries from "../../features/Core/useAllCountries";
import { groupLeaguesByCountry } from "@/helpers/home";

export function AllCompetitions() {
  const { allCountries: countries, isLoading } = useAllCountries();
  const [query, setQuery] = useState("");


  const countryByLeagues = groupLeaguesByCountry(countries || []);

  if (isLoading)
    return (
      <Block
        title="All Competitions"
        showNextButton={false}
        padding={false}
        className="overflow-x-hidden"
        contentClassName="border-t border-x-grey-3 p-6 "
      >
        <div className="relative h-48 bg-gray-200 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );


  if (!countries) return <p className="text-center">No data available.</p>;


  // [Filtered list of leagues by search query]
  const lowerQuery = query.toLowerCase();

  const filterLeagues = countryByLeagues?.filter((country: any) => {
    return country.leagues.some((league) => {
      return (
         country.country.toLowerCase().includes(lowerQuery) ||
        league.league.toLowerCase().includes(lowerQuery)
      );
    });
  });

  return (
    <Block
      title="All Competitions"
      showNextButton={false}
      padding={false}
      className="overflow-x-hidden"
    >
      <div className="relative px-4 mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search Competitions"
          className="border rounded-lg w-full py-1.5 px-4 pl-10 placeholder:text-dark/70 focus:outline-none focus:border-primary"
        />
        <IconSearch
          className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/70"
          size={20}
        />
      </div>
      {filterLeagues?.map((country, index) => {
          return <CountryAccordion country={country} key={index} />;
        })}
       
    </Block>
  );
}
