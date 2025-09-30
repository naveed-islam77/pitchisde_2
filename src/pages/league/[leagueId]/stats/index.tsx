import { LeagueProvider } from "@/contexts/League/LeagueContext";
import Statistics from "@/features/LeagueDetail/Statistics/Statistics";
import { AppLayout } from "@/layouts/AppLayout";
import LeagueLayout from "@/layouts/LeagueLayout";
import { supabase } from "@/supabase/supabaseClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function LeagueStats({ league, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load league data: ${error}`}
        </p>
      </AppLayout>
    );
  return (
    <LeagueProvider league={league}>
      <LeagueLayout>
        <Statistics />
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
