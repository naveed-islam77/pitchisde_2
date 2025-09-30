import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PlayerProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-6">
          {/* Left side - Position indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-24 bg-green-100 rounded-lg flex items-center justify-center">
              <Skeleton className="w-8 h-6" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="w-3 h-3 rounded-full" />
              </div>
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-12 h-4" />
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-3 rounded-sm" />
                <Skeleton className="w-12 h-4" />
              </div>
            </div>
          </div>

          {/* Center - Player info and photo */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="text-center space-y-2">
              <Skeleton className="w-48 h-6" />
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-4">
              <div className="text-center">
                <Skeleton className="w-8 h-8 mx-auto mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
              <div className="text-center">
                <Skeleton className="w-12 h-4 mx-auto mb-1" />
                <Skeleton className="w-8 h-3 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="w-8 h-4 mx-auto mb-1" />
                <Skeleton className="w-8 h-3 mx-auto" />
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>

            {/* Social media icons */}
            <div className="flex gap-2 mt-4">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
