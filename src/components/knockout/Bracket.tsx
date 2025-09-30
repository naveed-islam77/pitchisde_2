"use client";
import { ArcherContainer } from "react-archer";
import { TfiCup } from "react-icons/tfi";
import { MatchBox } from "./MatchBox";
import { buildBracket, getRelations, getStageMatches } from "./knockOutHelper";
import { useScreen } from "./useScreen";

export const Bracket = ({ knockoutData }) => {
  const { final, left, right } = buildBracket(knockoutData);
  const isRound16Exist =
    left?.round16?.length > 0 && right?.round16?.length > 0;
  const isQuaterFinalsExist =
    left?.quarterFinals?.length > 0 && right?.quarterFinals?.length > 0;

  if (!isRound16Exist && !isQuaterFinalsExist) {
    return (
      <div className="flex justify-center items-center h-[200px] text-2xl font-semibold">
        No data found
      </div>
    );
  }

  const isWide = useScreen(1300);
  const defaultTarget = isWide ? "left" : "top";
  const defaultSource = isWide ? "right" : "bottom";
  const defaultTargetG2 = isWide ? "right" : "top";
  const defaultSourceG2 = isWide ? "left" : "bottom";

  return (
    <ArcherContainer strokeColor="green" strokeWidth={2} endMarker={false}>
      <div className="relative flex items-center flex-col screen-1300:flex-row gap-8">
        <TfiCup className="absolute top-0 left-[47%] size-20 hidden screen-1300:block text-yellow-300" />

        {/* left side */}
        <div className="w-full flex justify-center flex-col screen-1300:flex-row items-center gap-8 mt-14">
          <div className="flex screen-1300:flex-col flex-row gap-6 md:gap-8 screen-900:gap-16">
            {left?.round16?.map((m) => (
              <MatchBox
                key={m.id}
                match={m}
                relations={getRelations(
                  "Round of 16",
                  m?.next_match_num,
                  defaultTarget,
                  defaultSource
                )}
              />
            ))}
          </div>

          <div className="flex screen-1300:flex-col flex-row gap-40 screen-900:gap-80 screen-1300:gap-48">
            {left?.quarterFinals?.map((m) => (
              <MatchBox
                key={m.id}
                match={m}
                relations={getRelations(
                  "Quarter-finals",
                  m?.next_match_num,
                  defaultTarget,
                  defaultSource
                )}
              />
            ))}
          </div>
        </div>

        {/* middle  */}
        <div className="flex flex-col screen-1300:flex-col items-center gap-8">
          {isWide && (
            <MatchBox
              key={final?.stage_id}
              match={final}
              relations={getRelations("Final", final?.next_match_num)}
            />
          )}

          <div className="flex gap-20 flex-col screen-1300:flex-row items-center order-1 screen-1300:order-2">
            <div className="flex flex-col gap-8 justify-center">
              {left?.semiFinal && (
                <MatchBox
                  match={left?.semiFinal}
                  relations={getRelations(
                    "Semi-finals",
                    left?.semiFinal?.next_match_num,
                    "top",
                    "top"
                  )}
                />
              )}
            </div>

            {!isWide && (
              <MatchBox
                key={final?.stage_id}
                match={final}
                relations={getRelations("Final", final?.next_match_num)}
              />
            )}

            <div className="flex flex-col gap-8 justify-center">
              {right?.semiFinal && (
                <MatchBox
                  match={right?.semiFinal}
                  relations={getRelations(
                    "Semi-finals",
                    right?.semiFinal?.next_match_num,
                    "top",
                    "top"
                  )}
                />
              )}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full flex justify-center flex-col screen-1300:flex-row items-center gap-8 mt-14">
          <div className="flex screen-1300:flex-col flex-row gap-40 screen-900:gap-80 screen-1300:gap-48">
            {right?.quarterFinals?.map((m) => (
              <MatchBox
                key={m.id}
                match={m}
                relations={getRelations(
                  "Quarter-finals",
                  m?.next_match_num,
                  defaultTargetG2,
                  defaultSourceG2
                )}
              />
            ))}
          </div>

          <div className="flex screen-1300:flex-col flex-row gap-6 md:gap-8 screen-900:gap-16">
            {right?.round16?.map((m) => (
              <MatchBox
                key={m.id}
                match={m}
                relations={getRelations(
                  "Round of 16",
                  m?.next_match_num,
                  defaultTargetG2,
                  defaultSourceG2
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </ArcherContainer>
  );
};
