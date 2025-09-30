import { cn } from "@/lib/utils";
import { getRelations } from "./knockOutHelper";
import { MatchBox } from "./MatchBox";

export const BracketSide = ({ side, target, source }) => {
  console.log("target", target);
  return (
    <div className="w-full flex justify-center flex-col screen-1300:flex-row items-center gap-8 mt-14">
      <StageColumn
        matches={side.round16}
        stage="Round of 16"
        target={target}
        source={source}
        className={target === "left" ? "order-1" : "order-2"}
      />

      <StageColumn
        matches={side.quarterFinals}
        stage="Quarter-finals"
        target={target}
        source={source}
        className={target === "left" ? "order-2" : "order-1"}
      />
    </div>
  );
};

export const StageColumn = ({ matches, stage, target, source, className }) => (
  <div className={cn("flex screen-1300:flex-col flex-row gap-8", className)}>
    {matches.map((m) => (
      <MatchBox
        key={m.id}
        match={m}
        relations={getRelations(stage, m.next_match_num, target, source)}
      />
    ))}
  </div>
);
