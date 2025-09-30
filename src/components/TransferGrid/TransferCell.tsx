import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa6";

function TransferCell({ transfer }) {
  if (!transfer) return null;

  return (
    <Link
      href={`/player/${transfer?.player_id}`}
      className="app-block py-4 rounded-xl text-dark  hover:bg-neutral-50 transition-all duration-200"
    >
      <div className="flex justify-between px-4">
        <Image
          src={
            "https://caqijcexfdbdjxrqbrqm.supabase.co/storage/v1/object/public/pitchside-icons/transfer.png"
          }
          width={200}
          height={200}
          alt="transfer"
          className="w-5 h-5"
        />
        <div className="relative">
          <Image
            width={200}
            height={200}
            src={transfer?.player_image}
            className="object-cover w-16 h-16 rounded-full"
            alt={transfer?.name}
            title={transfer?.name}
          />
          <Image
            width={100}
            height={100}
            src={transfer?.country_logo}
            className="object-cover w-4 h-4 rounded-full absolute bottom-0 right-0"
            alt={transfer?.name}
            title={transfer?.name}
          />
        </div>
        <FaRegStar size={20} />
      </div>

      <h5 className="mt-2 block text-center text-xl font-semibold leading-tight text-dark hover:underline text-nowrap">
        {transfer?.player_name}
        <br />
        <div className="py-2">
          <span className="text-sm text-center">
            {transfer?.detailed_position}
          </span>{" "}
          |{" "}
          <span className="text-sm text-center">
            {transfer?.preferred_foot}
          </span>
        </div>
      </h5>

      <div className="flex justify-center items-center gap-x-2 my-2">
        {transfer?.from_team_logo && (
          <Image
            width={150}
            height={150}
            src={transfer?.from_team_logo}
            className="w-7"
            alt={transfer?.from_team}
            title={`Transfer from ${transfer?.from_team}`}
          />
        )}

        <p className="font-extrabold">{transfer?.amount}</p>
        {transfer?.to_team_logo && (
          <Image
            width={150}
            height={150}
            src={transfer?.to_team_logo}
            className="w-7"
            alt={transfer?.to_team}
            title={`Transfer to ${transfer?.to_team}`}
          />
        )}
      </div>
      <div className="px-4">
        <h6 className="font-medium text-center border-b-2"></h6>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className="pt-2">
          <p className="text-center text-sm font-extrabold">
            {transfer?.player_age}
          </p>
          <p className="text-center text-sm text-gray-500">
            {transfer?.date_of_birth}
          </p>
        </div>
        <div>
          <p className="text-center text-sm font-extrabold">
            {transfer?.height}
          </p>
          <p className="text-center text-sm text-gray-500">
            {transfer?.height_imp}
          </p>
        </div>
        <div>
          <p className="text-center text-sm font-extrabold">
            {transfer?.weight || "N/A"}
          </p>
          <p className="text-center text-sm text-gray-500">
            {transfer?.weight_imp || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TransferCell;
