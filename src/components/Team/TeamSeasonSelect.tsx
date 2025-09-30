import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TeamSeason = {
  season_id: string;
  season_name: string;
  league_logo: string;
  league_name: string;
};

function SeasonSelect({ teamSeasons }: { teamSeasons: TeamSeason[] }) {
  const router = useRouter();
  const { pathname, query } = router;

  if (!teamSeasons) return null;

  const currentSeason = query.season?.toString() || teamSeasons[0]?.season_id;

  const handleChangeSeason = (value: string) => {
    router.push({ pathname, query: { ...query, season: value } }, undefined, {
      shallow: true,
    });
  };

  const selected = teamSeasons?.find((s) => s.season_id == currentSeason);

  return (
    <Select onValueChange={handleChangeSeason} value={selected?.season_id}>
      <SelectTrigger className="px-0 border-0 bg-transparent font-display font-medium text-dark focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Select Season" />
      </SelectTrigger>
      <SelectContent position="popper" className="w-60">
        {teamSeasons.map((league) => (
          <SelectItem
            key={league.season_id}
            className="py-1 pr-1 font-display"
            value={league.season_id}
          >
            <span className="inline-flex gap-2 items-center">
              <span>{league.season_name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
