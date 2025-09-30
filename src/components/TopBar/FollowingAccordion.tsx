import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlUserFollowing } from "react-icons/sl";
import Link from "next/link";

export default function FollowingAccordion() {
  const followedMatches = [
    { id: 1, name: "Match 1 - Team A vs Team B" },
    { id: 2, name: "Match 2 - Team C vs Team D" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
    { id: 3, name: "Match 3 - Team E vs Team F" },
  ];

  return (
    <div className="md:hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="following">
          <AccordionTrigger className="gap-x-5 px-2 py-2 rounded-lg hover:bg-light/10 border-none">
            <div className="flex items-center gap-x-2">
              <SlUserFollowing size={28} />
              <span className="text-lg font-sans italic font-bold">
                Following
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-12 pr-4 py-1 space-y-1">
            {followedMatches.map((match) => (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="block text-sm hover:underline"
              >
                {match.name}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
