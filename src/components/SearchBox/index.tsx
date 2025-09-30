import useClickOutside from "@/hooks/useClickOutSide";
import useDebounce from "@/hooks/useDebounce";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { SearchResultsBox } from "./SearchResultsBox";

export default function SearchBox({ state }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(query.trim(), 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useClickOutside(searchBoxRef, () => setOpen(false));

  return (
    <div className={`relative ${state}`} ref={searchBoxRef}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          className="px-5 pl-10 rounded-full py-2.5 focus:outline-none focus-visible:ring-1 ring-primary-light bg-primary-light/50 placeholder:text-light/80 placeholder:font-medium w-80 peer"
        />
        <IconSearch
          className="peer-focus:text-light text-light/80 absolute top-1/2 -translate-y-1/2 left-2.5"
          size={20}
        />
        {query && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2"
            type="button"
            onClick={() => setQuery("")}
          >
            <IconX size={16} />
          </button>
        )}
      </div>
      {open && (
        <div className="rounded-lg absolute top-14 -left-[60%] md:-left-20 w-[32rem] z-30 shadow bg-white text-dark">
          <SearchResultsBox debouncedQuery={debouncedSearchQuery} />
        </div>
      )}
    </div>
  );
}
