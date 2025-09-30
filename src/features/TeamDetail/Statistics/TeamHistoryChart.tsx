import Image from "next/image";
import React from "react";
import {
  getChartDataConfig,
  getChartOptions,
  getUniqueLeagues,
} from "./helper";
import { Line } from "react-chartjs-2";
import {
  leagueSectionsPlugin,
  positionNumberPlugin,
} from "./leagueBackgroundPlugin";

const TeamHistoryChart = ({ data }) => {
  const uniqueLeagues = getUniqueLeagues(data);

  const chartDataConfig = getChartDataConfig(data || []);

  const chartHeight = uniqueLeagues.length * 150 + 100;
  const chartOptions: any = getChartOptions(uniqueLeagues.length);
  return (
    <div className="flex">
      <div className="w-32 flex flex-col justify-center space-y-8 mr-4 mt-20">
        {uniqueLeagues?.map((league: any) => (
          <div key={league.league} className="flex items-center h-[100px]">
            <Image
              src={league?.league_logo}
              alt={league?.league}
              width={50}
              height={50}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3"
            />
            <div>
              <div className="text-sm font-semibold text-purple-900">
                {league.league}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 relative">
        <div className="relative" style={{ height: `${chartHeight}px` }}>
          <Line
            data={chartDataConfig}
            options={chartOptions}
            plugins={[positionNumberPlugin, leagueSectionsPlugin]}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamHistoryChart;
