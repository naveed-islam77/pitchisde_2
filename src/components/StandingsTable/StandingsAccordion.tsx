"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { FormSquare } from "./FormSquare";
import Link from "next/link";

export function StandingsAccordion({ standings }: { standings: any }) {
  return (
    <div className="block lg:hidden">
      <Accordion type="single" collapsible className="w-full space-y-2 px-5">
        {standings?.map((standing, index) => (
          <AccordionItem
            key={index}
            value={standing?.team_id.toString()}
            className="rounded-lg px-2 bg-white border border-[#D9D9D9]"
          >
            {/* Accordion Header */}
            <AccordionTrigger className="flex w-full items-center justify-between py-3 font-semibold">
              <Link href={`/team/${standing?.team_id}`}>
                <Image
                  src={standing?.team_logo}
                  width={30}
                  height={30}
                  alt={standing.team_name}
                />
              </Link>
              <div className="flex gap-10 text-sm font-medium">
                <span className="font-semibold">
                  {standing?.matches_played}
                </span>
                <span className="font-semibold">{standing.goal_diff}</span>
                <span className="font-semibold">{standing.points}</span>
              </div>
            </AccordionTrigger>

            {/* Accordion Content */}
            <AccordionContent className="px-4 py-3 text-sm flex justify-between">
              <div className="">
                <span className="font-semibold text-[15px] text-[#00401A]">
                  Form
                </span>
                <span className="flex gap-x-1 mt-3">
                  {standing?.form?.map((form, index) => (
                    <FormSquare
                      key={index}
                      form={form}
                      form_fixtures={standing?.form_fixtures}
                      form_detail={standing?.form_detail}
                      index={index}
                    />
                  ))}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-[15px] text-[#00401A]">
                    +/-
                  </span>
                  <div>{standing?.losses}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-[15px] text-[#00401A]">
                    W
                  </span>{" "}
                  <div>{standing?.wins}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-[15px] text-[#00401A]">
                    D
                  </span>{" "}
                  <div>{standing?.draws}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-[15px] text-[#00401A]">
                    L
                  </span>{" "}
                  <div>{standing?.losses}</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
