import Actions from "@/components/Team/TeamActions";
import Social from "@/components/Team/TeamSocial";
import Tab from "@/components/Team/TeamTab";
import TeamTitle from "@/components/Team/TeamTitle";
import { useTeam } from "@/contexts/Team/TeamContext";
import { useRouter } from "next/router";
import ActionMenu from "../LeagueDetail/Transfer/ActionMenu";

export function TeamDetail() {
  const router = useRouter();
  const { query } = router;
  const { teamId, ...restQuery } = query;
  const { teamBanner } = useTeam();

  const createLink = (pathname: string) => {
    return {
      pathname,
      query: restQuery,
    };
  };

  const tabs = [
    { label: "Overview", path: createLink(`/team/${teamId}/overview`) },
    { label: "Standings", path: createLink(`/team/${teamId}/standings`) },
    { label: "Squad", path: createLink(`/team/${teamId}/squad`) },
    { label: "Transfers", path: createLink(`/team/${teamId}/transfers`) },
    { label: "Statistics", path: createLink(`/team/${teamId}/statistics`) },
  ];

  return (
    <section className="app-block bg-[#f5f5f5] h-48 rounded-xl mb-6 p-8 pb-0">
      <div className="relative">
        <ActionMenu />
      </div>
      <div className="flex h-full justify-between">
        <Social />

        <div className="flex flex-col items-start md:items-center justify-between">
          <TeamTitle bannerData={teamBanner?.[0] || {}} seasons={teamBanner} />

          {/* Mobile Tabs */}
          <div className="w-[80vw] md:hidden">
            <div className="max-w-full gap-x-4 text-base pt-4 md:pt-2 md:gap-x-8 flex justify-center">
              {tabs.map((tab) => (
                <Tab key={tab.label} tab={tab} />
              ))}
            </div>
          </div>

          {/* Web Tabs */}
          <div className="max-w-full gap-x-4 overflow-x-auto text-base pt-7 md:pt-2 md:gap-x-8 hidden md:flex">
            {tabs.map((tab) => (
              <Tab key={tab.label} tab={tab} />
            ))}
          </div>
        </div>

        <Actions />
      </div>
    </section>
  );
}
