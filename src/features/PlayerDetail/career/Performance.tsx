import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ratingColor = (ratingValue) => {
  return ratingValue >= 9.0
    ? "bg-info"
    : ratingValue >= 7.5
    ? "bg-primary"
    : ratingValue >= 6.0
    ? "bg-warning"
    : ratingValue >= 5.0
    ? "bg-danger"
    : "bg-dark";
};

const headerIcons = [
  "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/appearance-black.png",
  "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/ball-black.png",
  "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/assist-black.png",
  "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/rating-black.png",
];

function Performance({ playerPerformance }) {
  const groupedPerformance = groupBySeason(playerPerformance);
  const seasonsTotal = getTotalsBySeason(playerPerformance);
  console.log("seasonsTotal", seasonsTotal);

  return (
    <Accordion type="multiple">
      <div className="flex items-center justify-between px-4 py-3 pr-14">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-3">
          {headerIcons.map((icon, index) => (
            <div className="w-[25px]">
              <img
                key={index}
                src={icon}
                alt={`Header icon ${index + 1}`}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      </div>

      {playerPerformance?.map((item) => (
        <AccordionItem
          key={item.season_id}
          value={item.season_id}
          className="border-b border-gray-100 last:border-b-0"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3">
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center gap-3">
                <img
                  src={item.team_logo || "/placeholder.svg"}
                  alt={`${item.team_name} logo`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div
                    className="font-bold text-base text-gray-900 truncate"
                    title={item.team_name}
                  >
                    {item.team_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.season_name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mr-2">
                <div className="flex gap-4 text-sm font-medium text-gray-700">
                  <span className="w-[25px]">
                    {seasonsTotal?.[item.season_name]?.appearances}
                  </span>
                  <span className="w-[25px]">
                    {seasonsTotal?.[item.season_name]?.goals_saves}
                  </span>
                  <span className="w-[25px]">
                    {seasonsTotal?.[item.season_name]?.assists_cleansheets}
                  </span>
                </div>
                <div
                  className={`${ratingColor(
                    item.avg_rating
                  )} text-white text-xs px-2 py-1 min-w-[32px] rounded-md justify-center`}
                >
                  {seasonsTotal?.[item.season_name]?.avg_rating?.toFixed(1)}
                </div>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-3">
            {groupedPerformance?.[item.season_name] &&
            groupedPerformance?.[item.season_name]?.length > 0 ? (
              <div className="space-y-2">
                {groupedPerformance?.[item.season_name]?.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 pl-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={comp?.league_logo || "/placeholder.svg"}
                        alt={`${comp.name} logo`}
                        className="w-5 h-5"
                      />
                      <span className="text-sm text-gray-700">
                        {comp?.league_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mr-8">
                      <div className="flex gap-4 text-sm font-medium text-gray-700">
                        <span className="w-[25px] text-center">
                          {item?.appearances}
                        </span>
                        <span className="w-[25px] text-center">
                          {item?.goals_saves}
                        </span>
                        <span className="w-[25px] text-center">
                          {item?.assists_cleansheets}
                        </span>
                      </div>
                      <div
                        className={`${ratingColor(
                          item.avg_rating
                        )} text-white text-xs px-2 py-1 min-w-[32px] rounded-md flex justify-center`}
                      >
                        {item.avg_rating?.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center">
                No competitions
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Performance;

function groupBySeason(items) {
  return items?.reduce((acc, item) => {
    const { season_name } = item;
    if (!acc[season_name]) {
      acc[season_name] = [];
    }
    acc[season_name].push(item);
    return acc;
  }, {});
}

function getTotalsBySeason(data) {
  return data.reduce((acc, item) => {
    const { season_name } = item;
    if (!acc[season_name]) {
      acc[season_name] = {
        appearances: 0,
        goals_saves: 0,
        assists_cleansheets: 0,
        avg_rating: 0,
      };
    }
    acc[season_name].appearances += item.appearances || 0;
    acc[season_name].goals_saves += item.goals_saves || 0;
    acc[season_name].assists_cleansheets += item.assists_cleansheets || 0;
    acc[season_name].avg_rating += item.avg_rating || 0;
    return acc;
  }, {});
}
