function Row({ match }) {
  const {
    fixture_date,
    home_team_name,
    away_team_name,
    home_team_logo,
    away_team_logo,
    league_name,
    league_logo,
    score,
  } = match;
  return (
    <div className="text-sm grid grid-cols-3 items-center">
      <p className=" leading-tight text-x-grey-1">{fixture_date}</p>
      <div className="font-semibold text-x-grey-1 grid grid-cols-3 gap-3 items-center">
        <img
          src={home_team_logo}
          className="size-8 mx-auto"
          alt={home_team_name}
        />
        <p className="text-center text-base">{score}</p>
        <img
          src={away_team_logo}
          className="size-8 mx-auto"
          alt={away_team_name}
        />
      </div>
      <div className=" text-x-grey-1 flex justify-end items-center space-x-1">
        <p className="text-right">{league_name}</p>
        <img src={league_logo} className="size-6" alt={league_name} />
      </div>
    </div>
  );
}

export default Row;
