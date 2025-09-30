import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type RoundsDropdownProps = {
  rounds: { value: string | number; label: string }[];
  selectedRound: string | number;
  onChange: any;
};

export function RoundsDropdown({
  rounds,
  selectedRound,
  onChange,
}: RoundsDropdownProps) {
  return (
    <Select value={String(selectedRound)} onValueChange={onChange}>
      <SelectTrigger className="w-[90%] border-none text-lg text-black max-w-[300px]">
        <SelectValue placeholder="Select round">
          Team of the {selectedRound}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="border-none !font-oswald">
        {rounds?.map((round) => {
          if (!round.value) return null;
          return (
            <SelectItem key={round.value} value={String(round.value)}>
              {round.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
