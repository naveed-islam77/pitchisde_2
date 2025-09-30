import LeagueTitle from "@/components/League/LeagueTitle";
import { useRouter } from "next/router";
import ActionMenu from "./Transfer/ActionMenu";
import Actions from "./Transfer/Actions";
import SocialLinks from "./Transfer/SocialLinks";
import Tab from "./Transfer/Tab";
import { useGetLeagueBannerData } from "../Fixtures/useFixturesByDate";

export function LeagueDetail() {
  const router = useRouter();
  const { query } = router;

  const { leagueBannerData } = useGetLeagueBannerData(query.leagueId as string);

  const bannerData = leagueBannerData?.[0] || {};

  const { leagueId, ...restQuery } = query;

  if (!bannerData) return null;

  const createLink = (pathname) => {
    return {
      pathname,
      query: restQuery,
    };
  };

  const tabs = [
    {
      label: "Overview",
      path: createLink(`/league/${leagueId}/overview`),
      hidden: bannerData?.overview === false,
    },
    { label: "Matches", path: createLink(`/league/${leagueId}/matches`) },
    {
      label: "Knockout",
      path: createLink(`/league/${leagueId}/playoff`),
      hidden: bannerData?.knockout === false,
    },
    { label: "Statistics", path: createLink(`/league/${leagueId}/stats`) },
    {
      label: "Transfers",
      path: createLink(`/league/${leagueId}/transfer`),
      hidden: bannerData?.transfers === false,
    },
    { label: "News", path: createLink(`/league/${leagueId}/news`) },
  ];

  const visibleTabs = tabs.filter((tab) => !tab.hidden);

  const newsShadow = "0px 2px 10px 0px #00000040";
  return (
    <section
      className="app-block bg-[#f5f5f5] h-48 rounded-xl mb-6 p-8 pb-0 "
      style={{ boxShadow: newsShadow }}
    >
      <div className="relative">
        <ActionMenu />
      </div>
      <div className="flex h-full justify-between ">
        <SocialLinks />
        <div className=" flex flex-col items-start md:items-center justify-between">
          <LeagueTitle leagueId={leagueId} />
          {/* Mobile Tabs */}
          <div className="w-[80vw] md:hidden">
            <div className="max-w-full gap-x-4 text-base pt-4 md:pt-2 md:gap-x-8 flex justify-center ">
              {visibleTabs?.map((tab) => (
                <Tab key={tab.label} tab={tab} />
              ))}
            </div>
          </div>
          {/* Web Tabs  */}
          <div className="max-w-full gap-x-4 overflow-x-auto text-base pt-7 md:pt-2 md:gap-x-8 hidden md:flex">
            {visibleTabs.map((tab) => (
              <Tab key={tab.label} tab={tab} />
            ))}
          </div>
        </div>

        <Actions />
      </div>
    </section>
  );
}
