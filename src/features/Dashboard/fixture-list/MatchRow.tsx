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
      aggregate={aggregate}
      pen_score={match?.pen_score}
      key={match.id}
      mode={"score"}
      time={dayjs(match.fixture_utc_timestamp).format("HH:mm")}
      matchId={match?.fixture_id.toString()}
      notification
      awaiting={"awaiting && state.short_name"}
      tag={match?.state}
      tagFull={state?.name}
      team1={homeTeam}
      team2={awayTeam}
      team1RedCards={match?.home_red_cards}
      team2RedCards={match?.away_red_cards}
    />
  );
}
