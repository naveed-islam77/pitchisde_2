import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import clsx from "clsx";
import { headerKeyMap } from "../useFixture";

const FirstColumn = ({ activeToggle, sortConfig, setSortConfig }) => {
  const columns = {
    rating: "Rating",
    age: "Age",
    country: "Country",
  };

  console.log("sortConfig", sortConfig);

  const renderSortableHeader = (header) => (
    console.log("header", header),
    (
      <th
        scope="col"
        className="w-32 px-2 border-r last:border-r-0 border-gray-300 whitespace-normal break-words text-center leading-4"
        onClick={() => {
          const key = headerKeyMap[header];
          setSortConfig((prev) => ({
            key: key,
            isAscending: prev.key === key ? !prev.isAscending : true,
          }));
        }}
      >
        <div className="flex items-center justify-center flex-col">
          {columns[header]}
          {activeToggle !== "country" && (
            <IoMdArrowDropdown
              className={clsx(
                sortConfig.key === headerKeyMap[header] &&
                  sortConfig.isAscending
                  ? "rotate-180"
                  : "rotate-0"
              )}
              title="text-center"
            />
          )}
        </div>
      </th>
    )
  );

  return <>{renderSortableHeader(activeToggle)}</>;
};

export default FirstColumn;
