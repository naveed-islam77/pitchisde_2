export const getSeasonsFromPerformance = (performance: any[]) => {
  return performance?.map((p) => p.season).reverse();
};

export const getPositionsFromPerformance = (performance: any[]) => {
  return performance?.map((p) => p.rank).reverse();
};

export const getChartDataConfig = (performance: any) => {
  const sortedPerformance =
    performance &&
    [...performance].sort((a, b) => {
      return parseInt(b.season_name) - parseInt(a.season_name);
    });

  const seasons = Array.from(
    new Set(sortedPerformance.map((p: any) => p.season_name))
  );

  const uniqueLeagues = Array.from(
    new Set(sortedPerformance.map((p: any) => p.league_name))
  );

  const leagueZoneHeight = 100;
  const leagueZonePadding = 50;
  const maxRanks = 20;

  const leagueYMapping: any = uniqueLeagues.reduce(
    (acc: any, league: any, index) => {
      acc[league] = {
        yStart: index * (leagueZoneHeight + leagueZonePadding),
        maxRank: maxRanks,
      };
      return acc;
    },
    {} as Record<string, { yStart: number; maxRank: number }>
  );

  const dataPoints = sortedPerformance.map((p: any) => {
    const leagueInfo = leagueYMapping[p.league_name];
    const rank = p.team_position;
    const yPos =
      leagueInfo?.yStart +
      ((rank - 1) / (leagueInfo.maxRank - 1)) * leagueZoneHeight;

    return {
      x: p.season_name, 
      y: yPos,
      ...p,
    };
  });

  return {
    labels: seasons,
    clip: false,
    datasets: [
      {
        label: "League Position",
        data: dataPoints, 
        parsing: {
          xAxisKey: "x",
          yAxisKey: "y",
        },
        rawRanks: sortedPerformance.map((p: any) => p.team_position),
        borderColor: "#1f77b4",
        backgroundColor: "#1f77b4",
        borderWidth: 3,
        pointRadius: 15,
        pointHoverRadius: 15,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1f77b4",
        pointBorderWidth: 1,
        tension: 0.4,
        spanGaps: false,
      },
    ],
  };
};


export const getUniqueLeagues = (team: any) => {
  const uniqueLeagues = Array.from(
    new Map(
      team?.map((p: any) => [
        p.league_name,
        { league: p.league_name, league_logo: p.league_logo },
      ])
    ).values()
  );

  return uniqueLeagues;
};

export const getChartOptions = (leagueCount: number) => {
  const leagueZoneHeight = 150;
  const leagueZonePadding = -40;
  const chartHeight = leagueCount * (leagueZoneHeight + leagueZonePadding + 20);

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 70,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (context: any) => {
          const { chart, tooltip } = context;



          let tooltipEl =
            chart.canvas.parentNode.querySelector("#custom-tooltip");

          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";
            tooltipEl.className =
              "bg-white shadow-lg rounded-xl p-4 border border-gray-200";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.transition = "all .1s ease";
            chart.canvas.parentNode.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const dataPoint = tooltip.dataPoints[0];
          const raw = dataPoint.raw;

          tooltipEl.innerHTML = `
              <div class="flex items-center space-x-2 mb-2">
                <img src="${raw.league_logo}" alt="" class="w-6 h-6" />
                <div>
                  <div class="font-semibold text-purple-900">${raw.league_name}</div>
                  <div class="text-xs text-gray-500">${raw.season_name}</div>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-2 text-center mb-2">
                <div class="bg-[#006428] font-bold text-white rounded-sm">${raw.team_wins}</div>
                <div class="bg-[#a1a1a1] font-bold text-white rounded-sm">${raw.team_draws}</div>
                <div class="bg-[#da291c] font-bold text-white rounded-sm">${raw.team_losses}</div>
                <div class="font-bold">${raw.team_points}</div>
                <div class="font-bold">${raw.team_wins}</div>
                <div class="font-bold">${raw.team_ppg}</div>
                <div class="text-xs">W</div>
                <div class="text-xs">D</div>
                <div class="text-xs">L</div>
                <div class="text-xs">Pts</div>
                <div class="text-xs">Win%</div>
                <div class="text-xs">PPG</div>
              </div>
              <div class="h-[2px] bg-gray-200"></div>
              <div class="flex items-center space-x-2 mt-2">
                <img src="${raw.coach_image}" alt="" class="w-8 h-8 rounded-full border" />
                <div>
                  <div class="text-sm font-semibold">${raw.coach_name}</div>
                  <div class="text-xs text-gray-500">${raw.coach_wins}W ${raw.coach_draws}D ${raw.coach_losses}L</div>
                </div>
              </div>
            `;

          // Tooltip size
          const { offsetWidth: ttWidth, offsetHeight: ttHeight } = tooltipEl;

          // Base position relative to chartArea
          const chartArea = chart.chartArea;
          let left = tooltip.caretX + 20;
          let top = tooltip.caretY;

          // Clamp inside chart area
          if (left + ttWidth > chartArea.right) {
            left = chartArea.right - ttWidth - 10;
          }
          if (left < chartArea.left) {
            left = chartArea.left + 10;
          }
          if (top + ttHeight > chartArea.bottom) {
            top = chartArea.bottom - ttHeight - 10;
          }
          if (top < chartArea.top) {
            top = chartArea.top + 10;
          }

          tooltipEl.style.opacity = "1";
          tooltipEl.style.left = left + "px";
          tooltipEl.style.top = top + "px";
        },
      },
      leagueZones: {
        count: leagueCount,
        height: leagueZoneHeight,
        padding: leagueZonePadding,
      },
    },
    scales: {
      x: {
        position: "top",
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
          padding: 10,
        },
      },
      y: {
        reverse: true,
        min: -1,
        max: chartHeight,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        afterFit: function (scale: any) {
          scale.height = scale?.chart?.height - scale?.chart?.chartArea?.top;
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 12,
        radius: 20,
      },
    },
    clip: false,
  };
};
