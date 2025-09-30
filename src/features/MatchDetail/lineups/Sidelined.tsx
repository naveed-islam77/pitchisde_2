import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidelined = ({ sidelined }) => {
  return (
    <div className="text-center py-4 border-r">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-5 py-2">
        {sidelined?.map((item) => (
          <Link
            href={`/player/${item?.player_id}`}
            key={item?.player_id}
            className="flex flex-col items-center group "
          >
            <Image
              width={512}
              height={512}
              src={item?.player_image}
              alt={item?.player_name}
              className=" w-16 rounded-full object-cover h-auto bg-gray-200 text-center"
            />
            <p className="text-md font-medium group-hover:underline">
              {item?.player_name}
            </p>
            <p className="text-sm font-normal ">{item?.reason}</p>
            <p className="text-sm font-normal ">
              {item?.expected_return || "Unknown"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidelined;
