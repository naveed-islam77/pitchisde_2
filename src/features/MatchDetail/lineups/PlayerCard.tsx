import Image from "next/image";
import Link from "next/link";
import { getEventTags, getRatingColor, getStatTags } from "../matchHelpers";

const PlayerCard = ({ substitutes, activeToggle }) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
      {substitutes?.map((substitute) => {
        const rating = substitute?.rating;
        const playerAge = substitute?.player_age;
        const statTags = getStatTags([substitute]);
        const eventTags = getEventTags([substitute]);

        return (
          <Link
            href={`/player/${substitute?.player_id}`}
            key={substitute.id}
            className="flex flex-col justify-center items-center text-white"
          >
            <div className="bg-white rounded-full relative">
              <Image
                width={512}
                height={512}
                unoptimized
                src={substitute?.player_image}
                alt={substitute?.player_name}
                className=" w-14 rounded-full object-cover h-auto"
              />
              {/* Event Tags */}
              {eventTags.length > 0 && (
                <div className="absolute -left-0 bottom-0 flex flex-col gap-1">
                  {eventTags.map((tag, index) => (
                    <div key={`event-${substitute.id}-${index}`}>
                      <Image
                        width={50}
                        height={50}
                        src={tag.icon}
                        alt="event"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Stat Tags */}
              {statTags.map((tag, index) => (
                <div
                  key={`${substitute.id}-${tag.icon}-${index}`}
                  className={`absolute ${
                    tag.position === "top-center"
                      ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      : tag.position === "bottom-left"
                      ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                      : tag.position === "bottom-center"
                      ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                      : tag.position === "middle-left"
                      ? "top-1/2 -left-1 -translate-x-1/2 -translate-y-1/2"
                      : tag.position === "top-left"
                      ? "-top-0 -left-2"
                      : tag.position === "top-right"
                      ? "-top-0 -right-1"
                      : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  }`}
                >
                  <Image
                    width={16}
                    height={16}
                    src={tag.icon}
                    alt={tag.icon}
                    className="w-5 h-5 object-contain"
                  />
                </div>
              ))}
              {activeToggle === "country" && substitute?.player_country && (
                <Image
                  width={20}
                  height={20}
                  unoptimized
                  src={substitute?.player_country}
                  alt={substitute?.player_name}
                  className="absolute -bottom-4 left-5 rounded-full border-white border-[1px] w-5 h-5 object-cover"
                />
              )}
              {activeToggle === "rating" && rating !== null && (
                <span
                  className={`absolute top-4 -right-5 translate-x-2 w-8 h-5 ${getRatingColor(
                    rating
                  )} rounded-full text-xs flex items-center justify-center font-bold`}
                >
                  {rating}
                </span>
              )}
              {activeToggle === "age" && playerAge && (
                <span className="absolute top-4 -right-5 translate-x-2 w-8 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {playerAge}
                </span>
              )}
            </div>
            <span className="text-xs text-center max-w-[100px] pt-4">
              {substitute?.player_name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default PlayerCard;
