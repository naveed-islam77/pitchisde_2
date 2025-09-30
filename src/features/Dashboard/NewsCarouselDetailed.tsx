import { Block } from "@/components/Block";
import { getFootballNews } from "@/services/core-api";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { useEffect, useState } from "react";

export function NewsCarouselDetailed({ title = "News" }) {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden bg-gray-200 h-48 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  if (newsData?.length === 0)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">News not Available</p>
        </div>
      </Block>
    );

  return (
    <div>
      <Block
        title={title}
        showNextButton={false}
        contentClassName="pb-8 w-full"
      >
        {/* ✅ Desktop Carousel */}
        <div className="hidden sm:block">
          <Splide
            options={{
              arrows: false,
              type: "loop",
              autoplay: true,
              classes: { pagination: "splide__pagination !-bottom-5 w-full" },
            }}
            className="news-carousel"
          >
            {newsData?.slice(-5).map((item: any, index) => (
              <SplideSlide key={index}>
                <div>
                  <Image
                    width={1000}
                    height={800}
                    src={item?.image}
                    unoptimized
                    onError={(e) => {
                      const traget = e.target as HTMLImageElement;
                      traget.src = "/mig/no_image.png";
                    }}
                    className="w-full rounded-lg object-contain"
                    alt={item.title}
                  />
                  <p className="font-semibold mt-4 text-sm">{item.title}</p>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </Block>

      {/* ✅ Mobile List */}
      <div className="flex flex-col gap-6 sm:hidden pb-20">
        {(showAll ? newsData : newsData.slice(0, 10)).map(
          (item: any, index) => (
            <Block key={index} contentClassName="bg-[#F2F2F2] p-4 rounded-lg">
              <Image
                width={1000}
                height={600}
                unoptimized
                src={item?.image || "/mig/no_image.png"}
                onError={(e) => {
                  const traget = e.target as HTMLImageElement;
                  traget.src = "/mig/no_image.png";
                }}
                className="w-full rounded-lg object-contain"
                alt={item.title}
              />
              <p className="font-semibold mt-2 text-xl">{item.title}</p>
              <div className="flex justify-end">
                <p className="text-gray-700">
                  {item.date_published?.split("T")[0]}
                </p>
              </div>
            </Block>
          )
        )}

        {/* ✅ "See more" Button */}
        {!showAll && newsData.length > 10 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-2 text-center text-blue-500 hover:underline"
          >
            See more
          </button>
        )}
      </div>
    </div>
  );
}
