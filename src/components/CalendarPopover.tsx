import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { IconCalendar } from "@tabler/icons-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPopover({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date>(new Date());
  const router = useRouter();

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;

    setSelectedDate(newDate);
    setMonth(newDate);

    const { pathname } = router;
    const date = format(newDate, "yyyy-MM-dd");
    onDateChange(date);
    router.push({ pathname, query: { date } }, undefined, { shallow: true });
  };

  // Years range
  const years = Array.from({ length: 30 }, (_, i) => 2010 + i);

  return (
    <Popover className="relative">
      <PopoverButton
        className={clsx(
          "feedback shrink-0 flex items-center gap-x-1.5 self-center rounded-md p-1 mr-auto text-gray-500 data-[active]:bg-dark/10"
        )}
      >
        <IconCalendar size={24} />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute -right-28 sm:right-0 z-10 mt-3 transform px-4 sm:px-0 bg-white">
          {({ close }) => (
            <div className="relative overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
              <DayPicker
                mode="single"
                selected={selectedDate}
                month={month}
                onMonthChange={setMonth}
                required
                onDayClick={() => {
                  close();
                }}
                onSelect={handleDateSelect}
                components={{
                  Caption: ({ displayMonth }) => {
                    const currentYear = displayMonth.getFullYear();
                    const currentMonth = displayMonth.getMonth();
                    const monthName = format(displayMonth, "MMMM");

                    return (
                      <div className="flex justify-between items-center p-2 border-b bg-gray-50">
                        <button
                          onClick={() => {
                            const prev = new Date(displayMonth);
                            prev.setMonth(currentMonth - 1);
                            setMonth(prev);
                          }}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                        >
                          <ChevronLeft />
                        </button>

                        <span className="font-bold text-lg">{monthName}</span>

                        <Select
                          value={String(currentYear)}
                          onValueChange={(value) => {
                            const newYear = Number(value);
                            const newDate = new Date(month);
                            newDate.setFullYear(newYear);
                            newDate.setMonth(currentMonth);
                            setMonth(newDate);
                          }}
                        >
                          <SelectTrigger className="w-[100px] bg-gray-50 h-8 border-none font-semibold text-lg">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((y) => (
                              <SelectItem key={y} value={String(y)}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Next button */}
                        <button
                          onClick={() => {
                            const next = new Date(displayMonth);
                            next.setMonth(currentMonth + 1);
                            setMonth(next);
                          }}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    );
                  },
                }}
              />
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
