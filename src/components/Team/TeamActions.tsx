import {
  IconBell,
  IconCalendarUp,
  IconSoccerField,
  IconStar,
} from "@tabler/icons-react";

function Actions() {
  return (
    <div id="Actions" className="h-full hidden md:block">
      <ul className="space-y-2 text-dark font-display text-right">
        <li>
          <button
            type="button"
            className="w-full flex items-center gap-3 justify-end"
          >
            <span className="text-lg">Follow</span>
            <IconStar />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="w-full flex items-center gap-3 justify-end"
          >
            <span className="text-lg">Notifications</span>
            <IconBell />
          </button>
        </li>
        <li>
          <button className="w-full flex items-center gap-3 justify-end">
            <span className="text-lg">Sync Calendar</span>
            <IconCalendarUp />
          </button>
        </li>
        <li>
          <button className="w-full flex items-center gap-3 justify-end">
            <span className="text-lg">
              Create
              <span className="uppercase font-display font-semibold italic">
                pitchside
              </span>
            </span>
            <IconSoccerField />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Actions;
