import Image from "next/image";

const TeamLogo = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    width={100}
    height={100}
    alt={alt}
    className="object-cover w-5 h-5"
  />
);

export default TeamLogo;
