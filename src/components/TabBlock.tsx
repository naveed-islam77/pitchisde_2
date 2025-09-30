import clsx from "clsx";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { PropsWithChildren } from "react";

function TabBlock_Tab({ label }) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            "flex-1 px-4 py-2.5 hover:bg-white outline-none focus:outline-none font-semibold rounded-full",
            selected ? "text-x-bargreen  bg-white" : "text-dark/70"
          )}
        >
          {label}
        </button>
      )}
    </Tab>
  );
}

export const TabButton = TabBlock_Tab;

function TabBlock_List({
  children,
  className,
  tabClassName,
}: PropsWithChildren<{ className?: string; tabClassName?: string }>) {
  return (
    <div className={clsx("px-4 py-4 md:px-10", className)}>
      <TabList
        as="div"
        className={clsx(
          "flex rounded-full px-2 py-2",
          "bg-light",
          tabClassName
        )}
      >
        {children}
      </TabList>
    </div>
  );
}

function TabBlock_Panels({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(className, "sm:px-4 py-8 md:px-10")}>
      <TabPanels>{children}</TabPanels>
    </div>
  );
}

function TabBlock({ children }) {
  return <TabGroup>{children}</TabGroup>;
}

TabBlock.Tab = TabBlock_Tab;
TabBlock.List = TabBlock_List;
TabBlock.Panels = TabBlock_Panels;
TabBlock.Panel = TabPanel;

export { TabBlock };
