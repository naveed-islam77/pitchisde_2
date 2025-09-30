import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  IconBell,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconCalendarUp,
  IconSoccerField,
  IconStar,
  IconWorld,
} from "@tabler/icons-react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ActionMenu = () => {
  const shadow = "0px 1px 2px 0px #00000040";
  return (
    <div className="md:hidden absolute top-2 right-2">
      <Dialog>
        <DialogTrigger>
          <HiOutlineDotsVertical size={25} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[320px] p-0 bg-[#FFFFFF] border-0 shadow-lg rounded-2xl overflow-hidden">
          {/* Actions Section */}
          <div>
            <div className="bg-[#F2F2F2] p-4" style={{ boxShadow: shadow }}>
              <div>
                <h3 className="text-2xl font-semibold text-[#00401A]">
                  Actions
                </h3>
              </div>
            </div>
            <ul className="space-y-2 text-dark font-display text-start pl-4 py-4">
              <li>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 justify-start"
                >
                  <IconStar />
                  <span className="text-lg">Follow</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 justify-start"
                >
                  <IconBell />
                  <span className="text-lg">Notifications</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 justify-start">
                  <IconCalendarUp />
                  <span className="text-lg">Sync Calendar</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 justify-start">
                  <IconSoccerField />
                  <span className="text-lg">
                    Create
                    <span className="uppercase font-display font-semibold italic">
                      pitchside
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="bg-[#F2F2F2] p-4" style={{ boxShadow: shadow }}>
              {/* Social Links Section */}
              <div>
                <h3 className="text-2xl font-semibold text-[#00401A]">
                  Social Links
                </h3>
              </div>
            </div>
            <ul className="space-y-2 text-dark font-display py-5 pl-4">
              <li>
                <a
                  target="__blank"
                  href="https://facebook.com"
                  className="flex items-center gap-3 hover:underline"
                >
                  <IconBrandFacebook />
                  <span className="text-lg">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  target="__blank"
                  href="https://instagram.com"
                  className="flex items-center gap-3 hover:underline"
                >
                  <IconBrandInstagram />
                  <span className="text-lg">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  target="__blank"
                  href="https://instagram.com"
                  className="flex items-center gap-3 hover:underline"
                >
                  <IconBrandX />
                  <span className="text-lg">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  target="__blank"
                  href="https://uk_pl.com"
                  className="flex items-center gap-3 hover:underline"
                >
                  <IconWorld />
                  <span className="text-lg">Website</span>
                </a>
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionMenu;
