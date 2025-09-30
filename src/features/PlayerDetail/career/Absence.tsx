import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

type Absence = {
  player_id: number;
  absence_id: number;
  absence_type: string;
  team_id: number;
  team_name: string;
  season_name: string;
  league_name: string;
  league_logo: string;
  matches_missed: number;
  absence_name: string;
  start_date: string;
  end_date: string;
};

type TeamGroup = {
  team_id: number;
  team_name: string;
  matches_missed: number;
  absences: Absence[];
  absence_name: string;
  start_date: string;
  end_date: string;
  absence_type: string;
};

function Absence({ playerAbsence }) {
  const headerIcons = [
    "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/rating-black.png",
  ];
  const Icons = {
    injury:
      "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/injured.png",
    suspended:
      "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/suspended.png",
  };

  const groupedAbsences = groupAbsencesByTeam(playerAbsence);

  if (!groupedAbsences?.length) {
    return <div className="text-center font-bold">No Absences</div>;
  }

  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <div>
          <div className="flex items-center justify-between px-4 py-3 pr-12">
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
        </div>

        {groupedAbsences?.map((item) => (
          <AccordionItem
            key={item.team_id}
            value={item.team_id.toString()}
            className="border-b border-gray-100 last:border-b-0"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <img
                    src={"/mig/teams/chelsea.png"}
                    alt={`${item.team_name} logo`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-left">
                    <div
                      className="font-bold text-base text-gray-900"
                      title={item.team_name}
                    >
                      {item.team_name}
                    </div>
                    <div className="text-gray-700 font-semibold flex items-center gap-3">
                      <Image
                        src={
                          item?.absence_type === "Injury"
                            ? Icons.injury
                            : Icons.suspended
                        }
                        alt="injury"
                        width={100}
                        height={100}
                        className="w-4 h-4"
                      />
                      {item?.absence_name}
                    </div>

                    <p className="text-xs font-semibold text-gray-500">
                      {item?.start_date} - {item?.end_date}
                    </p>
                  </div>
                </div>
                <h1 className="font-bold text-2xl pr-5">
                  {item?.matches_missed}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-3">
              {item?.absences && item.absences.length > 0 ? (
                <div className="space-y-2">
                  {item?.absences.map((comp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 pl-2"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={comp.league_logo || "/placeholder.svg"}
                          alt={`${comp.league_name} logo`}
                          className="w-5 h-5"
                        />
                        <div className="text-left">
                          <div
                            className="font-bold text-base text-gray-900 w-[100px] truncate"
                            title={comp.league_name}
                          >
                            {comp.league_name}
                          </div>
                          <div className="text-sm font-semibold text-gray-700">
                            {comp.season_name}
                          </div>
                        </div>
                      </div>
                      <h1 className="font-semibold text-base pr-10">
                        {comp?.matches_missed}
                      </h1>
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
    </div>
  );
}

export default Absence;

function groupAbsencesByTeam(data: Absence[]): TeamGroup[] {
  const teamsMap: Record<number, TeamGroup> = {};

  data.forEach((item) => {
    if (!teamsMap[item.team_id]) {
      teamsMap[item.team_id] = {
        team_id: item.team_id,
        team_name: item.team_name,
        matches_missed: 0,
        start_date: item.start_date,
        end_date: item.end_date,
        absence_type: item.absence_type,
        absence_name: item.absence_name,
        absences: [],
      };
    }

    teamsMap[item.team_id].matches_missed += item.matches_missed;

    teamsMap[item.team_id].absences.push(item);
  });

  return Object.values(teamsMap);
}
