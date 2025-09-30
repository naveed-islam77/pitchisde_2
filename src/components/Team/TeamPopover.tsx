"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";

interface TeamPopoverProps {
  team: {
    team_id: string;
    team_name: string;
    team_logo: string;
    wins: number;
    draws: number;
    losses: number;
    points: number;
  };
  children: React.ReactNode;
}

const TeamPopover = ({ team, children }: TeamPopoverProps) => {
  const router = useRouter();

  const handleNavigate = (teamId: string) => {
    router.push(`/team/${teamId}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="py-2 flex justify-center items-center">
        <div>
          <h3
            className="font-semibold text-xl text-center cursor-pointer hover:underline"
            onClick={() => handleNavigate(team?.team_id)}
          >
            {team?.team_name}
          </h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-white bg-green-600  text-center px-2 rounded-sm">
                {team?.wins}
              </p>
              <p>w</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-white bg-gray-500 text-center px-2 rounded-sm">
                {team?.draws}
              </p>
              <p>d</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-white bg-red-600 text-center px-2 rounded-sm">
                {team?.losses}
              </p>
              <p>L</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold w-[30px] text-center px-2 rounded-sm">
                {team?.points}
              </p>
              <p>Pts</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TeamPopover;
