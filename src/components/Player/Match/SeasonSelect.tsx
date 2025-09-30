import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SeasonSelect({ seasons, onChange }) {
  const router = useRouter();
  const { playerId, season } = router.query;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    season as string
  );

  const handleChangeSeason = (value: string) => {
    setSelectedValue(value);

    onChange?.(value);

    router.push(
      {
        pathname: `/player/${playerId}`,
        query: { season: value },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!season && seasons?.length > 0) {
      const first = String(seasons[0].season_id);
      setSelectedValue(first);
      handleChangeSeason(first);
    }
  }, [seasons, season]);

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue}>
      <SelectTrigger className="w-60 mt-3 text-base rounded text-black border-0 h-8 bg-gray-100 focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue
          placeholder={
            seasons?.find((s) => s.season_id == selectedValue)?.season_name
          }
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {seasons?.map(({ season_id, season_name }) => (
          <SelectItem key={season_id} value={String(season_id)}>
            {season_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
