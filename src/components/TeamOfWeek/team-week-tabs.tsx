import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect } from "react";

export function Tabs({ setSelectedTab }) {
  const tabs = ["Rating", "Age", "Country"];

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, []);

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-full bg-[#006428] p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={({ selected }) =>
              clsx(
                "w-full rounded-full py-2 px-4 text-sm focus:outline-none transition-all font-bold",
                selected
                  ? "bg-[#1F954E] text-white shadow"
                  : "text-white hover:bg-[#1F954E]"
              )
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
