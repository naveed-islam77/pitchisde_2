import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SeasonSelect({ seasons, onChange }) {
  const [selectedValue, setSelectedValue] = useState(seasons?.[0] || {});

  const handleChangeSeason = (value) => {
    const selectedSeason = seasons?.find(
      (season) => season.season_id === value
    );
    setSelectedValue(selectedSeason);
    onChange(value);
  };

  useEffect(() => {
    if (seasons?.length) {
      setSelectedValue(seasons?.[0]);
    }
  }, [seasons]);

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue.season_id}>
      <SelectTrigger className="w-32 text-base rounded text-black border-0 h-8 bg-gray-100 focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue
          defaultValue={selectedValue.season_id}
          placeholder={selectedValue.season_name}
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {seasons?.map(({ season_id: id, season_name: name }) => (
          <SelectItem key={id} className="py-1 pr-1" value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
