import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

function SeasonSelect({ seasons }) {
  const [selectedValue, setSelectedValue] = useState(seasons?.[0]);

  const handleChangeSeason = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (seasons?.length > 0) {
      setSelectedValue(seasons?.[0] ?? "");
    }
  }, [seasons]);

  return (
    <Select onValueChange={handleChangeSeason} value={selectedValue?.season_id}>
      <SelectTrigger className="w-32 text-base rounded text-black border-0 h-8 bg-gray-100 focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue
          defaultValue={selectedValue?.season_id}
          placeholder={selectedValue?.season_name}
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {seasons?.map(({ season_name: name, season_id: value }) => (
          <SelectItem key={value} className="py-1 pr-1" value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
