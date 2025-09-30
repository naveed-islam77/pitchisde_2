import { TitleStripSimple } from "@/components/TitleStrip";
import { VersusRowList } from "@/components/VersusView";
import { formatDate } from "@/helpers/general";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MatchRow } from "./MatchRow";
import { cn } from "@/lib/utils";

export function MatchesTable({ fixturesData, pagesNumber, setPage, page }) {
  if (fixturesData?.length === 0)
    return <p className="text-center">No Upcoming Matches</p>;

  return (
    <div>
      <div>
        <TitleStripSimple
          title={
            <div className="flex items-center justify-between w-full gap-3">
              <ChevronLeft
                className={cn(
                  "cursor-pointer bg-gray-300 p-2 size-10 rounded-full",
                  page === 1 && "bg-gray-400 pointer-events-none"
                )}
                onClick={() => setPage(page - 1)}
              />
              <span>{formatDate(fixturesData?.[0]?.starting_at)}</span>
              <ChevronRight
                className={cn(
                  "cursor-pointer bg-gray-300 p-2 size-10 rounded-full",
                  pagesNumber === page && "bg-gray-400 pointer-events-none"
                )}
                onClick={() => setPage(page + 1)}
              />
            </div>
          }
        />
        <VersusRowList>
          {fixturesData?.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))}
        </VersusRowList>
      </div>
    </div>
  );
}
