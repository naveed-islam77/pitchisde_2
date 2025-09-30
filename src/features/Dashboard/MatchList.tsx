import { Block } from "@/components/Block";
import { CalendarBar } from "@/components/CalenderBar";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MatchListInner } from "./fixture-list/MatchListInner";

dayjs.extend(utc);
dayjs.extend(timezone);




export function MatchList({ fixturesData, ...props }) {
  return (
    <Block {...props} padding={false}>
      <CalendarBar />
      <MatchListInner fixturesData={fixturesData} />
    </Block>
  );
}



