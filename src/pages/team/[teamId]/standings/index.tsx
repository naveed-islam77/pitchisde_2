import { TeamProvider } from "@/contexts/Team/TeamContext";
import Standings from "@/features/TeamDetail/Standings/Standings";
import TeamLayout from "@/layouts/TeamLayout";
import { supabase } from "@/supabase/supabaseClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function TeamStandings({ team, error }) {
  return (
    <TeamProvider team={team}>
      <TeamLayout>
        <Standings />
      </TeamLayout>
    </TeamProvider>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const teamId = params.teamId as string;

  try {
    const { data } = await supabase.rpc("team_banner", {
      input_team_id: Number(teamId),
    });

    return { props: { team: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
