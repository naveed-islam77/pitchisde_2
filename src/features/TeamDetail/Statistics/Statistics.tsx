import { TeamOfWeek } from "@/components/TeamOfWeek/TeamOfWeek";
import { TabbedStatistics } from "./TabbedStatistics";

export default function Statistics() {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
      <div className="flex-1 shrink-0 space-y-5">
        <TabbedStatistics />
      </div>
      <TeamOfWeek />
    </div>
  );
}
