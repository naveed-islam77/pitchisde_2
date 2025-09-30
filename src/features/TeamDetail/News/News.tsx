import { Block } from "@/components/Block";
import { NewsCard } from "@/components/News/NewsCard";
import { getFootballNews } from "@/services/core-api";
import { useEffect, useState } from "react";

export default function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await getFootballNews();
      if (data) setNewsData(data);
    };

    loadNews();
  }, []);
  return (
    <Block padding={false}>
      <div className="grid md:grid-cols-2 wl:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <NewsCard fill newsData={newsData} />
      </div>
      <button className="mx-auto mt-2 mb-6 block app-btn-light">
        See More
      </button>
    </Block>
  );
}
