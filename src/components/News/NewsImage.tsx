import { useState } from "react";
import Image from "next/image";

export function NewsImage({ src }: { src: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/mig/no_image.png");

  return (
    <Image
      width={400}
      height={400}
      src={imgSrc}
      onError={() => setImgSrc("/mig/no_image.png")}
      className="w-full rounded-[10px] h-[200px] object-cover"
      alt="news"
    />
  );
}
