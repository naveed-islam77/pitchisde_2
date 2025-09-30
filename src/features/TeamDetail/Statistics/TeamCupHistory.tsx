import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { GiQueenCrown } from "react-icons/gi";

export const stages = [
  "Final",
  "Semi-final",
  "Quarter-final",
  "Early Knockouts",
  "Group / League",
  "Qualifying",
];

const StageTimeline = ({ seasonPerformance }) => {
  // Static seasons list
  const seasons = [
    { season_name: "2024+" },
    { season_name: "2023+" },
    { season_name: "2022+" },
    { season_name: "2021+" },
    { season_name: "2020+" },
    { season_name: "2019+" },
    { season_name: "2018+" },
    { season_name: "2017+" },
    { season_name: "2016+" },
    { season_name: "2015+" },
    { season_name: "2014+" },
    { season_name: "2013+" },
    { season_name: "2012+" },
  ];

  return (
    <div className="p-4 overflow-x-auto max-w-[900px]">
      <ArcherContainer strokeColor="blue" strokeWidth={2}>
        <div
          className="grid"
          style={{
            gridTemplateRows: `auto 20px repeat(${stages.length}, 60px)`,
            gridTemplateColumns: `auto repeat(${seasons.length}, 100px)`,
          }}
        >
          {/* Header row */}
          <div />
          {seasons.map((season) => (
            <div
              key={season.season_name}
              className="flex items-center justify-center font-bold text-sm"
            >
              {season.season_name}
            </div>
          ))}

          {/* Spacer row */}
          <div />
          {seasons.map((_, idx) => (
            <div key={`spacer-${idx}`} />
          ))}

          {/* Stage rows */}
          {stages.map((stage) => (
            <React.Fragment key={stage}>
              {/* Stage label */}
              <div className="flex items-center border-b border-r border-gray-200 justify-end pr-2 text-sm font-medium text-gray-600">
                {stage}
              </div>

              {/* Stage cells for each season */}
              {seasons.map((season, idx) => {
                const perf = seasonPerformance?.find(
                  (p) => p.season_name === season.season_name
                );
                const isHere = perf?.stage_type === stage;

                return (
                  <div
                    key={`${stage}-${season.season_name}`}
                    className="flex items-center justify-center border-b-2 border-gray-200"
                  >
                    {isHere && (
                      <ArcherElement
                        id={`season-${idx}`}
                        relations={
                          idx < seasons.length - 1
                            ? [
                                {
                                  targetId: `season-${idx + 1}`,
                                  targetAnchor: "left",
                                  sourceAnchor: "right",
                                  style: { endMarker: false },
                                },
                              ]
                            : []
                        }
                      >
                        <div className="relative flex items-center justify-center">
                          {idx === 1 && (
                            <div className="absolute -top-4 flex items-center justify-center">
                              <GiQueenCrown className="text-[#EFC007]" />
                            </div>
                          )}

                          <div className="rounded-full  w-10 h-10 flex items-center justify-center">
                            <img
                              src={perf?.away_team_logo}
                              alt="team"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                        </div>
                      </ArcherElement>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default StageTimeline;
