import clsx from "clsx";

export function StatTag({ stat = 0, className = "", compact = false }) {
  return (
    <p
      className={clsx(
        "bg-[#FF0000] text-white rounded-full",
        compact ? "px-2 py-0.5 text-fine font-bold" : "px-3 py-1 font-semibold",
        className
      )}
    >
      {stat}
    </p>
  );
}
