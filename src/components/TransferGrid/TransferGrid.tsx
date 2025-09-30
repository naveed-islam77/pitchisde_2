import { useEffect, useState } from "react";
import { CheckedDropdown } from "../Transfers/CheckedDropdown";
import TransferCell from "./TransferCell";
import {
  filterTransfers,
  getPositions,
  getTeams,
  getTypes,
} from "@/helpers/transfers-helper";

export function TransferGrid({ transfers, teamId, teamsData }) {
  const [selectedTeam, setSelectedTeam] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<any>([]);
  const [selectedPosition, setSelectedPosition] = useState<any>([]);

  // [positions]
  const positions = getPositions(transfers);
  const directions = getTypes(transfers);
  const teams = getTeams(transfers);

  useEffect(() => {
    if (positions?.length > 0) {
      const positionids = positions?.map((position: any) => position);
      setSelectedPosition(positionids);
    }

    if (directions?.length > 0) {
      const positionids = directions?.map((dir: any) => dir);
      console.log("positionids", positionids);
      setSelectedType(positionids);
    }

    if (teamsData?.length > 0) {
      const teamData = teamsData?.map((team: any) => team?.from_team);
      setSelectedTeam(teamData);
    }
  }, []);

  const filteredTransfers = filterTransfers({
    transfers,
    selectedTeam,
    selectedType,
    selectedPosition,
  });

  return (
    <>
      <div className="flex gap-3 items-center my-5">
        <CheckedDropdown
          placeholder={"Select Team"}
          options={teams}
          setSelectedOption={setSelectedTeam}
          selectedOptions={selectedTeam}
        />
        <CheckedDropdown
          placeholder={"Select Position"}
          options={positions}
          setSelectedOption={setSelectedPosition}
          selectedOptions={selectedPosition}
        />
        <CheckedDropdown
          placeholder={"Select Direction"}
          options={directions}
          setSelectedOption={setSelectedType}
          selectedOptions={selectedType}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTransfers?.map((transfer, index) => (
          <TransferCell key={index} transfer={transfer} />
        ))}
      </div>
    </>
  );
}
