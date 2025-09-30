import Image from "next/image";

import { useRouter } from "next/router";
import SeasonSelect from "./TeamSeasonSelect";
import { getSeasons } from "@/helpers/league";

export default function TeamTitle({ bannerData, seasons }) {
  const router = useRouter();
  const { pathname } = router;
  const onTransfersPage = pathname.includes("transfers");
  const onNewsPage = pathname.includes("news");
  const onHistorypage = pathname.includes("history");
  const showSeasonSelect = !onNewsPage && !onTransfersPage && !onHistorypage;

  return (
    <div className="flex h-full items-center gap-x-3 font-display">
      <Image
        width={250}
        height={250}
        className="object-contain w-20 h-20"
        src={bannerData?.team_logo}
        alt={bannerData?.team_name}
      />

      <div>
        <h2 className="xs:text-xl text-lg font-bold sm:text-2xl">
          {bannerData?.team_name}
        </h2>
        <div className="mt-1.5 flex items-center gap-x-2">
          <Image
            width={600}
            height={512}
            src={bannerData?.country_logo || ""}
            className="rounded-full object-cover aspect-square  w-8"
            alt={bannerData?.country_name}
          />
          <p className="text-sm font-semibold sm:text-base">
            {bannerData?.country_name}
          </p>
        </div>
        <SeasonSelect teamSeasons={seasons} />
      </div>
    </div>
  );
}
