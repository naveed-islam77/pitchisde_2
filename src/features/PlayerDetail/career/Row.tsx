import Image from "next/image";
import Link from "next/link";

function Row({ transfer }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center gap-x-8 font-medium text-fine">
      <div className="flex items-center gap-x-3">
        {
          <Image
            width={250}
            height={250}
            src={transfer?.team_logo}
            className="w-12"
            alt={transfer?.team_name}
          />
        }
        <Link href={`/team/${transfer?.to_team_id}/overview`}>
          {transfer?.team_name}
        </Link>
      </div>
      <span className="justify-self-center text-center">
        {transfer?.transfer_date_age}
      </span>
      <span className="justify-self-center text-center">
        {/* {type.name} <br /> */}
        <span>{transfer.value ? `${transfer.value}` : ""}</span>
      </span>
    </div>
  );
}

export default Row;
