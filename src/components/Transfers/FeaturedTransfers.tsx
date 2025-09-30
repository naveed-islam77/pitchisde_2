import useTransfersByTeams from "@/features/Transfers/useTransfersByTeams";
import { Block } from "../Block";
import { getTopTransfersFromTeams } from "@/helpers/transfers-helper";
import { formatCurrencyShort } from "@/helpers/general";

export function FeaturedTransfers({ TransfersData }) {
  const featuredTransfers = TransfersData?.filter(
    (t) => getAmountValue(t.amount) > 0
  )
    ?.sort((a, b) => getAmountValue(b.amount) - getAmountValue(a.amount))
    ?.slice(0, 3);

  return (
    <Block
      title="Featured Transfers"
      showNextButton={false}
      contentClassName="!pb-2"
    >
      {featuredTransfers?.length > 0 &&
        featuredTransfers?.map((t, i) => (
          <FeaturedTransfer key={i} transfer={t} />
        ))}
    </Block>
  );
}

function FeaturedTransfer({ transfer }) {
  return (
    <div className="flex py-2 text-primary">
      <img
        src={transfer?.player_image}
        className="h-11 w-11 shrink-0 rounded-full bg-dark/50"
      />
      <div className="flex flex-1 flex-col justify-center gap-y-0.5 pl-4">
        <p className="font-bold leading-none">{transfer?.player_name}</p>
        <div className="flex items-center mt-1">
          <img className="w-4" src={transfer?.from_team_logo} />
          <img
            className="w-3.5 mx-1"
            src="/mig/icons/arrow-right-bg-green.svg"
          />
          <img className="w-4" src={transfer?.to_team_logo} />
        </div>
      </div>

      <p className="bg-primary rounded-full self-center px-2 py-[0.1rem] text-xs font-bold text-white">
        {formatCurrencyShort(transfer?.amount)}
      </p>
    </div>
  );
}

function getAmountValue(amount: string): number {
  if (!amount) return 0;

  const lower = amount.toLowerCase();

  if (lower.includes("loan") || lower.includes("free")) return 0;

  const num = parseFloat(lower.replace(/[^\d.]/g, ""));

  if (lower.includes("m")) return num * 1_000_000;
  if (lower.includes("k")) return num * 1_000;

  return num;
}
