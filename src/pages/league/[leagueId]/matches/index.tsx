import { LeagueProvider } from "@/contexts/League/LeagueContext";
import Matches from "@/features/LeagueDetail/Matches/Matches";
import LeagueLayout from "@/layouts/LeagueLayout";
import { supabase } from "@/supabase/supabaseClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function LeagueMatches({ league, error }) {
  return (
    <LeagueProvider league={league}>
      <LeagueLayout>
        <Matches />
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
