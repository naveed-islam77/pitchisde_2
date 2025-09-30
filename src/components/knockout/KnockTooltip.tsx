import { cn } from "@/lib/utils";

const Tooltip = ({
  position,
  visible,
  children,
}: {
  position: "top" | "bottom";
  visible: boolean;
  children: React.ReactNode;
}) => {
  const baseClasses =
    "absolute bg-[#F0F0F0] shadow-md rounded p-2 text-xs w-max z-10 transform transition-all duration-300 flex gap-2 items-center";
  const posClasses =
    position === "top"
      ? "-top-12 left-1/2 -translate-x-1/2"
      : "-bottom-10 left-1/2 -translate-x-1/2";
  const animClasses = visible
    ? "opacity-100 translate-y-0 scale-100"
    : position === "top"
    ? "opacity-0 -translate-y-2 scale-95 pointer-events-none"
    : "opacity-0 translate-y-2 scale-95 pointer-events-none";

  return (
    <div className={cn(baseClasses, posClasses, animClasses)}>{children}</div>
  );
};

export default Tooltip;
