import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import { getFootballNews } from "@/services/core-api";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function News() {
  const [newsData, setNewsData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
      setLoading(false);
    };

    loadNews();
  }, []);

  const boxShadow = "0px 2px 10px 0px #00000040";

  if (loading)
    return (
      <Block padding={false} style={{ boxShadow }}>
        <div className="grid md:grid-cols-2 wl:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="relative bg-gray-200 rounded-lg h-48">
              <div className="shimmer-effect"></div>
            </div>
          ))}
        </div>
      </Block>
    );

  if (newsData?.length === 0)
    return (
      <Block style={{ boxShadow }}>
        <div className="py-20">
          <p className="text-xl text-center font-semibold text-x-grey-1">
            No news for this season
          </p>
        </div>
      </Block>
    );
  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <Block className="bg-[#F2F2F2]">
          <div className={clsx("rounded-[20px] font-medium")}>
            <Image
              width={512}
              height={600}
              src={newsData[0]?.image || "/mig/news/news1.png"}
              className="w-full max-w-full rounded-[10px] h-[200px] object-cover"
              alt={"news"}
            />
            <p className="mt-2.5 w-[80%] py-2 text-lg font-semibold">
              {newsData[0]?.title}
            </p>
            <p className="text-left text-sm text-x-grey-1">
              {newsData[0]?.date_published
                ? formatDate(newsData[0]?.date_published)
                : ""}
            </p>
          </div>
        </Block>
      </div>
      <div className="">
        <NewsCard
          fill
          newsData={newsData}
          seeMore={false}
          showFullNews={true}
          className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </div>
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
