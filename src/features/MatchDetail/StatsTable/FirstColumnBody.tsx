import Image from "next/image";

const FirstColumnBody = ({ activeToggle, playerStats }) => {
  let content: React.ReactNode;

  if (activeToggle === "rating") {
    content = playerStats?.rating ?? "-";
  } else if (activeToggle === "age") {
    content = playerStats?.player_age ?? "-";
  } else if (activeToggle === "country") {
    content = (
      <div className="flex items-center gap-2">
        {playerStats?.player_country && (
          <Image
            src={playerStats.player_country}
            alt={playerStats?.player_name || "country flag"}
            width={50}
            height={50}
            className="object-contain rounded-sm border w-6 h-4"
          />
        )}
      </div>
    );
  }

  return (
    <td
      scope="row"
      className="px-2 w-48 text-wrap font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 sticky left-0 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-gray-300 dark:after:bg-gray-700"
    >
      <div className="flex gap-2 justify-center">{content}</div>
    </td>
  );
};

export default FirstColumnBody;
