import { cn } from "@/lib/utils";

export function Player({ player, selectedTab }: any) {
  return (
    <div className="feedback mx-auto flex h-fit w-fit flex-col items-center rounded-md p-2">
      <div className="relative ">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white">
          <img
            src={player?.player_image}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11"
          />
        </div>
        <p
          className={cn(
            "absolute -right-4 -top-0 rounded-full px-2 text-sm font-bold text-white",
            selectedTab !== "Country" && "bg-[#1EC853] -top-2"
          )}
        >
          {selectedTab === "Age" ? (
            player?.player_age
          ) : selectedTab === "Country" ? (
            <img
              src={player?.player_country_flag}
              alt={player?.player_country}
              className="w-4 h-4 object-cover rounded-full"
            />
          ) : (
            player?.avg_rating?.toFixed(1)
          )}
        </p>
        <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
          <img src={player?.team_logo} className="relative top-[1px] w-4" />
        </div>
      </div>
      <h4 className="mt-2 text-sm font-bold leading-none text-white text-center">
        {player?.player_name}
      </h4>
    </div>
  );
}
