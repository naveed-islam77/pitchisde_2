import { TabDef } from "@/components/DetailView/DetailView";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

function Tab({ tab }: { tab: TabDef }) {
  const router = useRouter();
  const { asPath } = router;

  const isActive = asPath.includes(tab.path.pathname as string);

  return (
    <Link
      className={clsx(
        "detail-view-tab",
        "group relative rounded-[0.1rem] border-b-4 pb-2 text-lg text-dark font-display",
        isActive
          ? "active border-[--dv-accent]"
          : "border-transparent opacity-75"
      )}
      href={tab.path}
    >
      <span className="invisible font-semibold">{tab.label}</span>
      <span className="absolute left-1/2 -translate-x-1/2 group-[.active]:font-semibold">
        {tab.label}
      </span>
    </Link>
  );
}

export default Tab;
