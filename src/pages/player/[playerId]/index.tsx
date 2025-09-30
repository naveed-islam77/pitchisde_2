import { PlayerProvider } from "@/contexts/Player/PlayerContext";
import { PlayerDetail } from "@/features/PlayerDetail/PlayerDetail";
import { getPlayerById } from "@/services/players-api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Player({ player, error }) {
  return (
    <PlayerProvider player={player}>
      <PlayerDetail />
    </PlayerProvider>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { params } = context;

  if (!params) return { notFound: true };

  const playerId = params.playerId as string;

  const queryParams = {
    includes:
      "transfers.toTeam;transfers.type;trophies.trophy;trophies.team.country;trophies.league;trophies.season;position;detailedPosition;country;statistics.details.type;statistics.season.league;metadata;teams.team;lineups.fixture.participants;lineups.fixture.league;lineups.details.type;lineups.fixture.scores;lineups.fixture.state;lineups.fixture.season",
    filters: "transferTypes:218,219,220",
  };

  try {
    const data = await getPlayerById(playerId, queryParams);
    return { props: { player: data } };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
} satisfies GetServerSideProps;
