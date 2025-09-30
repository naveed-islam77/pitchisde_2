import { IconBellFilled } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FixtureRow } from "./FixtureRow";
import { useEffect, useState } from "react";

function NotificationsPopover() {
  const [fixtureIds, setFixtureIds] = useState([]);
  useEffect(() => {
    const fetchUserMatches = () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const userJSON = JSON.parse(localUser);
        const { notify } = userJSON;
        const { matches } = notify || {};
        if (matches?.length) {
          setFixtureIds(matches);
        }
      }
    };

    fetchUserMatches();

    const intervalId = setInterval(fetchUserMatches, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Popover>
      <PopoverTrigger className="rounded-full hover:bg-primary-light data-[state=open]:bg-primary-light p-1">
        <IconBellFilled className="text-warning" />
      </PopoverTrigger>
      <PopoverContent className=" px-0" align="end">
        {!fixtureIds.length && (
          <div className="h-40 flex items-center justify-center">
            <p className="text-center text-lg">No match added</p>
          </div>
        )}
        {fixtureIds?.map((fixture) => (
          <FixtureRow key={fixture} fixtureId={fixture} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationsPopover;
