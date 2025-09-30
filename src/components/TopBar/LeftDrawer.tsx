import {
  IconMenu2,
  IconMessageCircleQuestion,
  IconScoreboard,
  IconSettings,
  IconSoccerField,
  IconSwords,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Drawer from "react-modern-drawer";
import { IoPersonCircleSharp } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";

function LeftDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <button onClick={open} className="feedback rounded-lg p-3">
        <IconMenu2 />
      </button>
      {client &&
        createPortal(
          <Drawer
            open={isOpen}
            onClose={close}
            direction="left"
            overlayOpacity={0.6}
            duration={200}
            className="font-display"
            lockBackgroundScroll
          >
            <div className="h-full flex flex-col  bg-primary p-4 text-white">
              <header className="flex items-center justify-between ">
                <Image
                  width={256}
                  height={96}
                  src="/pitchside-logo-white.png"
                  className="w-32"
                  alt="PitchSide Logo"
                />
                <button onClick={close} className="feedback p-2">
                  <IconX />
                </button>
              </header>

              <div className="mt-20 space-y-2">
                <Link
                  href={"/"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10"
                >
                  <IconScoreboard size={32} />
                  <span className="text-lg font-bold uppercase italic font-display">
                    PITCHSIDE
                  </span>
                </Link>
                <Link
                  href={"/create"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2.5 hover:bg-light/10"
                >
                  <IconSoccerField size={32} />
                  <span className="text-lg font-sans">
                    create
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>
                <Link
                  href={"/play"}
                  className=" flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10"
                >
                  <IconSwords size={32} />
                  <span className="text-lg font-sans">
                    play
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>{" "}
                <Link
                  href={"/profile"}
                  className=" items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10 flex md:hidden"
                >
                  <IoPersonCircleSharp size={32} />
                  <span className="text-lg font-sans">
                    <span className="font-bold font-display italic">
                      Profile
                    </span>
                  </span>
                </Link>
                <Link
                  href={"/following"}
                  className=" items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10 flex md:hidden"
                >
                  <SlUserFollowing size={28} />
                  <span className="text-lg font-sans">
                    <span className="font-bold font-display italic">
                      Following
                    </span>
                  </span>
                </Link>
              </div>
              <div className="mt-auto">
                <button className="w-full flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10">
                  <IconMessageCircleQuestion size={32} />
                  <p className="text-lg font-bold">Contact Us</p>
                </button>
                <button className="w-full flex items-center gap-x-5 rounded-lg px-2 py-2 hover:bg-light/10">
                  <IconSettings size={32} />
                  <p className="text-lg font-bold">Settings</p>
                </button>
              </div>
            </div>
          </Drawer>,
          document.getElementById("main") || document.body
        )}
    </>
  );
}

export default LeftDrawer;
