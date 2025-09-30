import { useState, useRef } from "react";
import { Search } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutSide";
import SearchBox from "../SearchBox";
import Image from "next/image";

export default function CustomPopoverSearch() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Attach outside click to the container (not just icon)
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div ref={containerRef} className="z-50 md:hidden">
      <div className="flex items-center gap-x-2">
        <Image
          width={30}
          height={30}
          src="/views/search.svg"
          alt="PitchSide Logo"
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        />
      </div>

      {open && (
        <div className="absolute top-[75px] right-0 mt-2 mx-4 bg-white rounded-full shadow-lg p-3 z-50">
          <SearchBox state={"block md:hidden"} />
        </div>
      )}
    </div>
  );
}
