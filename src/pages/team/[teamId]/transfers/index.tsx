import { TeamProvider } from "@/contexts/Team/TeamContext";
import Transfer from "@/features/TeamDetail/Transfer/Transfer";
import { AppLayout } from "@/layouts/AppLayout";
import TeamLayout from "@/layouts/TeamLayout";
import { supabase } from "@/supabase/supabaseClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function TeamTransfer({ team, error }) {
  if (error)
    return (
      <AppLayout>
        <p className="text-center py-10">
          {`Couldn't load league data: ${error}`}
        </p>
      </AppLayout>
    );

  return (
    <TeamProvider team={team}>
      <TeamLayout>
        <Transfer />
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
