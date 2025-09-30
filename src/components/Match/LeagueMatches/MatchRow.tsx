import { VersusRow } from "@/components/VersusView";
import dayjs from "dayjs";

export function MatchRow({ match }) {
  const { state, aggregate } = match;
  const homeTeam = {
    id: match.home_team_id,
    name: match.home_team,
    logo: match.home_team_logo,
    score: match.goals_home,
  };

  const awayTeam = {
    id: match.away_team_id,
    name: match.away_team,
    logo: match.away_team_logo,
    score: match.goals_away,
  };

  return (
    <VersusRow
      aggregate={aggregate?.result}
      key={match.id}
      mode={"score"}
      time={dayjs(match?.starting_at).format("HH:mm")}
      matchId={match?.fixture_id.toString()}
      tagFull={state?.name}
      team1={homeTeam}
      team2={awayTeam}
      team1RedCards={match?.home_red_cards}
      team2RedCards={match?.away_red_cards}
      starting_at={match?.starting_at}
      state={match?.state}
    />
  );
}
