import { LeagueProvider } from "@/contexts/League/LeagueContext";
import Overview from "@/features/LeagueDetail/Overview/Overview";
import LeagueLayout from "@/layouts/LeagueLayout";
import {
  getFixturesByDate,
  getLeagueBannerData,
} from "@/services/fixtures-api";
import { supabase } from "@/supabase/supabaseClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function LeagueOverview({ league, error }) {
  return (
    <LeagueProvider league={league}>
      <LeagueLayout>
        <Overview />
      </LeagueLayout>
    </LeagueProvider>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const leagueId = params.leagueId as string;

  try {
    const { data } = await supabase.rpc("league_banner", {
      input_league_id: Number(leagueId),
    });

    return { props: { league: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
