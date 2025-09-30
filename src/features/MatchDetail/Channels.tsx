import { Block } from "@/components/Block";
import { filterChannelsByCountry } from "@/helpers/fixture";
import useClickOutside from "@/hooks/useClickOutSide";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useGetFixtureChannels } from "./useFixture";

const CountryFilter = ({ countries, selectedCountry, onCountryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  if (!countries) return null;

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        {selectedCountry ? (
          <>
            <img
              src={
                countries?.find((c) => c.country_name === selectedCountry)
                  ?.country_flag
              }
              alt={selectedCountry}
              className="h-4 w-4 object-contain"
            />
            <span>{selectedCountry}</span>
          </>
        ) : (
          <span>All Countries</span>
        )}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {countries?.map((country, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
              onClick={() => {
                onCountryChange(country.country_name);
                setIsOpen(false);
              }}
            >
              {country.country_flag && (
                <img
                  src={country.country_flag}
                  alt={country.country_name}
                  className="h-4 w-4 object-contain"
                />
              )}
              <span>{country.country_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Channels = () => {
  const router = useRouter();
  const { matchId } = router.query;
  const {
    data: Channels,
    isError,
    isLoading,
  } = useGetFixtureChannels(matchId as string);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredChannels = filterChannelsByCountry(Channels, selectedCountry);

  useEffect(() => {
    setSelectedCountry(
      Channels?.length > 0 ? Channels?.[0].country_name : null
    );
  }, [Channels]);

  if (isError) {
    return <div>Error fetching TV channels. Please try again later.</div>;
  }

  const uniqueCountries = Array.from(
    new Map(
      Channels?.map((c) => [
        c.country_name,
        { country_name: c.country_name, country_flag: c.country_flag },
      ])
    ).values()
  );

  const CustomTitle = () => (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-x-bargreen">Channels</h2>
      <CountryFilter
        countries={uniqueCountries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
    </div>
  );

  return (
    <Block title={<CustomTitle />} showNextButton={false} padding={false}>
      {isLoading ? (
        <div className="gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="ml-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4">
          {filteredChannels?.length > 0 ? (
            filteredChannels.map((channel) => (
              <div
                key={channel.channel_id}
                className="flex items-center px-2 py-4"
              >
                {channel.channel_logo && (
                  <img
                    src={channel.channel_logo}
                    alt={channel.channel_name}
                    className="w-6"
                  />
                )}
                <p className="ml-2">{channel?.channel_name}</p>
              </div>
            ))
          ) : (
            <p className="px-2 py-4">No channels available</p>
          )}
        </div>
      )}
    </Block>
  );
};

export default Channels;
