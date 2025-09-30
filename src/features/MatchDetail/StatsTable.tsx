import { Block } from "@/components/Block";
import { filters } from "@/static/lineup-filters";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { filterApiMap } from "./filterApiMap";
import FirstColumnBody from "./StatsTable/FirstColumnBody";
import FirstColumn from "./StatsTable/FirstColumnHeader";
import PlayerRows from "./StatsTable/PlayerRows";
import { sortData } from "./StatsTable/StatsSorting";
import { headerKeyMap, useGetPlayerLineupDetails } from "./useFixture";
import { mapPlayerDetails, mergePlayerData } from "@/helpers/fixture";
import { DropDown } from "@/components/Dropdown/DropDown";

export function StatsTable({ activeToggle }) {
  const router = useRouter();
  const { matchId } = router.query;

  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    isAscending: boolean;
  }>({ key: "", isAscending: true });

  const headers = activeFilter.headers;

  const useActiveApi = filterApiMap[activeFilter.category];
  const { data: activeFilterData = [], isLoading } = useActiveApi(
    matchId as string
  );

  const { data: lineupsDetails } = useGetPlayerLineupDetails(matchId as string);
  const playerDetails = mapPlayerDetails(lineupsDetails);

  const mergedPlayers = useMemo(() => {
    return mergePlayerData(playerDetails || [], activeFilterData || []);
  }, [lineupsDetails, activeFilterData]);

  const sortedPlayers = useMemo(() => {
    if (!sortConfig.key) return mergedPlayers;
    return sortData(mergedPlayers, sortConfig.key, sortConfig.isAscending);
  }, [mergedPlayers, sortConfig]);

  if (isLoading) return <div>Loading...</div>;

  console.log("activeFilterData", activeFilter);

  return (
    <Block>
      <div className="flex justify-between items-center">
        <h2 className="text-left py-4 text-xl font-bold text-x-bargreen">
          Player Statistics
        </h2>
        <div className="gap-2 rounded-full bg-gray-200 p-1 hidden md:flex">
          {filters.map((filter) => (
            <FilterButton
              key={`filter-${filter.category}`}
              name={filter.category}
              isActive={filter.category === activeFilter.category}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
        {/* Mobile Filter  */}
        <div className="md:hidden">
          <DropDown
            placeholder={"Select Filter"}
            list={filters.map((filter) => filter.category)}
            onChange={(value) => {
              const filter = filters.find((f) => f.category === value);
              if (filter) setActiveFilter(filter);
            }}
            className={""}
            value={activeFilter.category}
          />
        </div>
      </div>
      <div
        className={clsx(
          "mb-6 grid grid-cols-[1fr,repeat(9,auto)] gap-y-2.5 overflow-x-auto whitespace-nowrap font-medium"
        )}
      >
        <div className="relative overflow-x-auto">
          <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* headers row */}
            <thead className="text-sm text-gray-700 capitalize bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr className="h-14 border-b border-gray-300">
                <th
                  scope="col"
                  className="px-2 w-48 text-wrap font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 sticky left-0 z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
                >
                  Player
                </th>
                <FirstColumn
                  activeToggle={activeToggle}
                  setSortConfig={setSortConfig}
                  sortConfig={sortConfig}
                />
                {headers.map(
                  (header) => (
                    console.log("header", header),
                    (
                      <th
                        key={`header-${header}`}
                        scope="col"
                        className="w-32 px-2 border-r last:border-r-0 border-gray-300 whitespace-normal break-words text-center leading-4"
                        onClick={() => {
                          const key = headerKeyMap[header];
                          setSortConfig((prev) => ({
                            key: key,
                            isAscending:
                              prev.key === key ? !prev.isAscending : true,
                          }));
                        }}
                      >
                        <div className="flex items-center justify-center font- flex-col">
                          {header}
                          <IoMdArrowDropdown
                            className={clsx(
                              sortConfig.key === headerKeyMap[header] &&
                                sortConfig.isAscending
                                ? "rotate-180"
                                : "rotate-0"
                            )}
                          />
                        </div>
                      </th>
                    )
                  )
                )}
              </tr>
            </thead>

            {/* body  */}
            <tbody>
              {sortedPlayers?.map((player) => (
                <tr
                  key={player?.fixture_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-14"
                >
                  <td
                    scope="row"
                    className="px-2 w-48 text-wrap font-medium text-gray-900  dark:text-white bg-white dark:bg-gray-800 sticky left-0 z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
                  >
                    <div className="flex gap-2">
                      <Image
                        width={512}
                        height={512}
                        src={player?.player_image}
                        alt={player?.player_name}
                        className="size-6 rounded-full"
                      />
                      {player?.player_name}
                    </div>
                  </td>
                  <FirstColumnBody
                    activeToggle={activeToggle}
                    playerStats={player}
                  />
                  {headers.map((header) => (
                    <PlayerRows
                      filter={activeFilter.category}
                      key={header}
                      playerStats={player}
                      header={header}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Block>
  );
}

function FilterButton({ name, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "text-sm px-4 py-1.5 rounded-full hover:bg-gray-50 font-semibold",
        isActive ? "bg-white text-x-bargreen" : "text-gray-600"
      )}
    >
      {name}
    </button>
  );
}
