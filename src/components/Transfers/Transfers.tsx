import useTransfersByTeams from "@/features/Transfers/useTransfersByTeams";
import { Block } from "../Block";
import { TitleStripSimple } from "../TitleStrip";
import { TransferGrid } from "../TransferGrid/TransferGrid";

function Transfers({ teamsData, isLoading }) {
  if (isLoading)
    return (
      <Block padding={false}>
        <TitleStripSimple title="Transfer" />
        <div className="relative h-[32rem] bg-gray-200 overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  return (
    <TransferGrid transfers={teamsData} teamId={null} teamsData={teamsData} />
  );
}

export default Transfers;
