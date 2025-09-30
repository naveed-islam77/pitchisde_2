import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLeague } from "@/contexts/League/LeagueContext";
import { getRatingColor } from "@/features/MatchDetail/matchHelpers";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { Player } from "./team-week-player";
import { useTeamOfWeek } from "./useTeamOfWeek";
import { useLeagueBanner } from "../League/useLeagueBanner";

type TeamWeekShareModalProps = {
  data?: any;
  round?: string;
  formation?: string | null;
  grouped?: any;
  leagueTotsCoach?: any;
  avg_rating?: number;
  selectedTab?: any;
};

export function TeamWeekShareModal({
  round,
  formation,
  grouped,
  leagueTotsCoach,
  avg_rating,
  selectedTab,
}: TeamWeekShareModalProps) {
  const router = useRouter();
  const { season: seasonId, teamId } = router.query;
  const [open, setOpen] = useState(false);
  const { leagueBannerData, teamBanner } = useLeagueBanner();
  const printRef = useRef<HTMLDivElement>(null);

  const bannerData = teamId ? teamBanner : leagueBannerData;

  const season = seasonId
    ? bannerData?.find((season) => season?.season_id == seasonId)
    : bannerData?.[0];

  const { coach_image, coach_name } = leagueTotsCoach?.[0] || {};
  const { rows, gk } = grouped || {};

  const handleDownload = async () => {
    if (!printRef.current) return;

    try {
      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `team-of-week-${round}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IoMdShare className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="max-w-lg" isCrossShow={true}>
        <div ref={printRef}>
          <DialogHeader className="flex flex-row items-center gap-3 bg-white pb-2">
            <img
              src={
                season?.league_logo ? season?.league_logo : season?.team_logo
              }
              alt="league logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <DialogTitle>
                {season?.season_name} {season?.league_name}
              </DialogTitle>
              <DialogDescription className="text-sm">
                Team of the {round}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="bg-[#1F954E]  rounded-lg">
            {/* top  */}
            <div className="bg-[#006428] flex justify-between items-center py-2 px-4">
              <div className="flex gap-2">
                <div className="bg-[#1F954E] px-4 py-1 rounded-full text-white font-bold">
                  {formation}
                </div>
                <div
                  className={`${getRatingColor(
                    avg_rating
                  )} px-4 py-1 rounded-full text-white font-bold`}
                >
                  {avg_rating?.toFixed(1)}
                </div>
              </div>
              <div className="flex items-center pr-3 gap-2">
                <div>
                  <h1 className="font-bold text-white">{coach_name}</h1>
                  <p className="text-sm text-white">Manager</p>
                </div>
                <img
                  src={coach_image}
                  alt="coach"
                  width={40}
                  height={40}
                  className="rounded-full bg-cover bg-center"
                />
              </div>
            </div>
            {/* pitch  */}
            <div
              className="px-6 bg-center bg-contain bg-no-repeat py-4 h-[70vh] grid"
              style={{
                backgroundImage: `url('/mig/positions/week_pitch.png')`,
                gridTemplateRows: `repeat(${rows?.length + 1}, 1fr)`, // ✅ rows + GK
              }}
            >
              {/* Outfield rows */}
              {rows?.map((row, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="grid justify-center gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                  }}
                >
                  {row.map((player, index) => (
                    <div
                      key={`row-${rowIndex}-player-${index}`}
                      className="flex justify-center"
                    >
                      <Player player={player} selectedTab={selectedTab} />
                    </div>
                  ))}
                </div>
              ))}

              {/* GK row */}
              <div className="grid grid-cols-3 items-center">
                <div></div>
                <div className="flex justify-center">
                  {gk && <Player player={gk} selectedTab={selectedTab} />}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
