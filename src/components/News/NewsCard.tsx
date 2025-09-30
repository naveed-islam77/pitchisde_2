import clsx from "clsx";
import Image from "next/image";
import { Block } from "../Block";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NewsImage } from "./NewsImage";

const shadowVariants = {
  dense: "0px 2px 10px 0px #00000040",
  thin: "0px 1px 5px 0px #00000040",
};

type ShadowKey = keyof typeof shadowVariants;

export function NewsCard({
  fill = false,
  newsData,
  className,
  mobClassName,
  seeMore = true,
  showFullNews = false,
}: {
  fill?: boolean;
  newsData: any;
  className?: string;
  mobClassName?: string;
  seeMore?: boolean;
  showFullNews?: boolean;
}) {
  const router = useRouter();
  const { leagueId } = router.query;

  const newsShadow = "0px 2px 10px 0px #00000040";

  const newsToShow = showFullNews ? newsData : newsData?.slice(0, 3);
  return (
    <Block
      title="News"
      centerTitle
      showNextButton={false}
      contentClassName="flex flex-col"
      style={{ boxShadow: newsShadow }}
      titleClassNaeme="!text-3xl p-3 !text-[#00401A]"
    >
      {/* Web Card  */}
      <div
        className={cn(
          "md:grid-cols-2 lg:grid-cols-3 gap-4 hidden md:grid",
          className
        )}
      >
        {newsToShow?.map((news: any) => (
          <Link
            href={news?.url}
            target="_blank"
            className={clsx(
              "rounded-[20px] font-medium ",
              !fill && "max-w-[330px]"
            )}
          >
            <NewsImage src={news?.image || "/mig/no_image.png"} />
            <p className="mt-2.5 truncate">{news?.title}</p>
            <p className="text-right text-xs text-x-grey-1">
              {news?.date ? formatDate(news?.date) : ""}
            </p>
          </Link>
        ))}
      </div>
      {/* Mobile Card  */}
      <div className={cn("space-y-4 md:hidden", mobClassName)}>
        {newsToShow?.map((news: any) => (
          <Link
            href={news?.url}
            target="_blank"
            className={clsx(
              "rounded-[20px] font-medium  flex justify-between gap-7",
              !fill && "max-w-full"
            )}
          >
            <div className="flex flex-col gap-6 flex-1">
              <p className="mt-2.5 font-semibold text-lg">
                {news?.title || "Title"}
              </p>
              <p className="text-left text-sm text-x-grey-1 ">
                {news?.date ? formatDate(news?.date) : "19/08/2023"}
              </p>
            </div>

            <div className="flex-1">
              <NewsImage src={news?.image || "/mig/no_image.png"} />
            </div>
          </Link>
        ))}
      </div>
      {seeMore && (
        <button
          onClick={() => router.push(`/league/${leagueId}/news`)}
          className=" mt-4 self-center text-primary hover:underline"
        >
          See More
        </button>
      )}
    </Block>
  );
}

function formatDate(date: Date) {
  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  return formattedDate;
}
