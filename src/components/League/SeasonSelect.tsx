import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SeasonSelect({seasons}) {

  const router = useRouter();
  const { pathname, query } = router;

  const handleChangeSeason = (value) => {
    router.push({ pathname, query: { ...query, season: value } }, undefined, {
      shallow: true,
    });
  };

  const selectedSeason = query.season
    ? seasons?.find((season) => season.season_id === Number(query.season))
    : seasons?.find((season) => season.is_current);

  const selectedValue =
    selectedSeason || seasons?.find((season) => !season.is_current) || {};

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue.id || ""}>
      <SelectTrigger className="w-20 text-sm px-0 border-0 bg-transparent font-display text-dark  focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0 pr-8">
        <SelectValue
          placeholder={selectedValue.season_name || "Select Season"}
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {seasons?.map(({ season_id, season_name }) => (
          <SelectItem
            key={season_id}
            className="py-1 pr-1 font-display"
            value={season_id}
          >
            {season_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
