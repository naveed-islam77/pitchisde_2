import Image from "next/image";
import React from "react";

const DashboardMobileFooter = ({ selectedTab, setSelectedTab }) => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-green-700 text-white shadow-lg sm:hidden">
      <div className="flex justify-around items-center h-16">
        {/* Matches Item */}
        <a
          href="#"
          className={`flex flex-col items-center justify-center flex-1 py-2 text-center text-sm font-semibold ${
            selectedTab === "matches" ? "bg-green-600" : "hover:bg-green-600"
          } transition-colors`}
          onClick={() => setSelectedTab("matches")}
        >
          <Image
            src={"/views/matches.svg"}
            alt="Matches"
            width={24}
            height={24}
            className=""
          />
          <span className="mt-1">Matches</span>
        </a>

        {/* Leagues Item */}
        <a
          href="#"
          className={`flex flex-col items-center justify-center flex-1 py-2 text-center text-sm font-semibold ${
            selectedTab === "leagues" ? "bg-green-600" : "hover:bg-green-600"
          } transition-colors`}
          onClick={() => setSelectedTab("leagues")}
        >
          <Image
            src={"/views/league.svg"}
            alt="Leagues"
            width={24}
            height={24}
            className=""
          />
          <span className="mt-1">Leagues</span>
        </a>

        {/* News Item */}
        <a
          href="#"
          className={`flex flex-col items-center justify-center flex-1 py-2 text-center text-sm font-semibold ${
            selectedTab === "news" ? "bg-green-600" : "hover:bg-green-600"
          } transition-colors`}
          onClick={() => setSelectedTab("news")}
        >
          <Image
            src={"/views/news.svg"}
            alt="News"
            width={24}
            height={24}
            className=""
          />
          <span className="mt-1">News</span>
        </a>
      </div>
    </footer>
  );
};

export default DashboardMobileFooter;
