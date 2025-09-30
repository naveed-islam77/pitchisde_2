import useClient from "@/hooks/useClient";
import { IconStarFilled } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "../SearchBox";
import Auth from "./Auth";
import LeftDrawer from "./LeftDrawer";
import CustomPopoverSearch from "./MobileSearch";
import NotificationsPopover from "./NotificationsPopover";

export function TopBar() {
  const client = useClient();
  return (
    <div
      className={clsx(
        "max-w-screen-2xl mx-auto relative flex bg-[#006428] items-center justify-between px-5 py-5 text-white"
      )}
    >
      {/* Left Side  */}
      <div className="flex gap-x-4">
        <LeftDrawer />
        <Link href={"/"} className="cursor-pointer">
          <Image
            width={256}
            height={96}
            src="/pitchside-logo-white.png"
            alt="PitchSide Logo"
            className="w-32 h-auto hidden md:block"
          />
        </Link>
      </div>

      {/* Center  */}
      {/* Web  */}
      <SearchBox state={"hidden md:block"} />
      {/* Mobile  */}
      <Link href={"/"}>
        <Image
          width={256}
          height={96}
          src="/pitchside-logo-white.png"
          alt="PitchSide Logo"
          className="w-32 h-auto md:hidden"
        />
      </Link>

      {/* Right Side  */}
      {/* Web  */}
      <div className="items-center gap-x-1 lg:gap-x-6 hidden md:flex">
        <div className="pr-4 border-r border-light">
          <Link href={"/about-us"} className="text-lg font-semibold">
            Who we are{" "}
          </Link>
        </div>
        <IconStarFilled className="text-warning" />
        {client && <NotificationsPopover />}

        {/* <Image
          width={250}
          height={250}
          src="/mig/user.png"
          className="size-12 rounded-full object-cover"
          alt="User Profile"
        /> */}
        <Auth />
      </div>
      {/* Mobile  */}
      <div className="flex items-center gap-x-2 md:hidden">
        <CustomPopoverSearch />
      </div>
    </div>
  );
}
