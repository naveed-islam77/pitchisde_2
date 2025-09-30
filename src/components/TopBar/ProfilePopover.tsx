"use client";

import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/supabase/supabaseClient";
import { useRouter } from "next/router";

interface ProfilePopoverProps {
  user?: {
    full_name?: string;
    email?: string;
    avatar?: string;
  };
}

export function ProfilePopover({
  user = { full_name: "John Doe", email: "john@example.com" },
}: ProfilePopoverProps) {
  const router = useRouter();

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  const handleLogout = () => {
    supabase.auth.signOut();
    localStorage.removeItem("user");
    window.location.reload();
  };

  const onProfileClick = () => {
    router.push("/profile");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-sports-green text-white bg-gray-500 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-sm">
            <div className="font-medium">{user.full_name}</div>
            <div className="text-muted-foreground text-xs">{user.email}</div>
          </div>
          <div className="h-px bg-border my-1" />
          <Button
            variant="ghost"
            className="w-full justify-start h-9 px-2 hover:bg-sports-green/10 hover:text-sports-green"
            onClick={onProfileClick}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-9 px-2 hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
