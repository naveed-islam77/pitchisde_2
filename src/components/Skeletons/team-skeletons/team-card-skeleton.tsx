import { Block } from "@/components/Block";
import { Skeleton } from "@/components/ui/skeleton";

export function TeamCardSkeleton() {
  return (
    <Block className="">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
            <Skeleton className="h-4 w-4 rounded-full bg-gray-300" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full bg-gray-300" />
        </div>
      ))}
    </Block>
  );
}
