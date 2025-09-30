import { searchQuery } from "@/features/LeagueDetail/useGetLeagues";
import { extractCategories } from "@/helpers/league";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SearchResultsBox({ debouncedQuery = "" }) {
  const [tab, setTab] = useState("");
  const { data: searchResults, isLoading } = searchQuery(debouncedQuery);

  const list = searchResults?.filter((item) => item?.category === tab);
  const noResults = !isLoading && !list && debouncedQuery;

  const categories: any = extractCategories(searchResults);

  useEffect(() => {
    if (categories.length > 0 && !tab) {
      setTab(categories[0]);
    }
  }, [categories, tab]);

  return (
    <div className="font-sans text-left rounded-lg overflow-auto h-72 transition-all bg-white z-50 space-y-4 scrollbar-thin">
      <div className="bg-white border-b p-2 sticky top-0 flex gap-2">
        {categories?.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-semibold",
              item === tab ? "bg-primary text-light" : "bg-light text-dark"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      {!debouncedQuery && (
        <div className="">
          <p className="text-center text-lg px-6 text-dark/70 font-medium pt-20 ">
            Start typing to search...
          </p>
        </div>
      )}

      {noResults ? (
        <div>
          <p className="text-center py-20 px-2 text-lg ">
            No teams or leagues matched &nbsp;
            <span className="font-semibold text-dark/80">
              &apos;{debouncedQuery}&apos;
            </span>
          </p>
        </div>
      ) : null}

      {isLoading && (
        <div className="px-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="relative overflow-hidden mt-2 h-8 rounded-md bg-dark/2 0"
            >
              {/* <div className="shimmer-effect"></div> */}
            </div>
          ))}
        </div>
      )}

      {list ? (
        <div className="basis-full">
          <ul>
            {list.map((item) => (
              <li key={item.id} className={`rounded-md hover:bg-light`}>
                <Link
                  href={`/${
                    tab === "Teams"
                      ? "team"
                      : tab === "Competition"
                      ? "league"
                      : tab === "Players"
                      ? "player"
                      : ""
                  }/${item.id}/overview`}
                  className="p-2 rounded-md flex items-center gap-x-2"
                >
                  <Image
                    width={150}
                    height={150}
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    className="w-8 object-contain"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
