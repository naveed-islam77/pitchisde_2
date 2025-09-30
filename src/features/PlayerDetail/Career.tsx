import { Block } from "@/components/Block";
import { TabBlock } from "@/components/TabBlock";
import Row from "./career/Row";
import Performance from "./career/Performance";
import {
  useGetPlayerAbsence,
  useGetPlayerPerformance,
  useGetPlayerTrophies,
} from "./usePlayers";
import { useRouter } from "next/router";
import Absence from "./career/Absence";
import { Trophies } from "./Trophies";

const Transfer = ({ transfers }) => {
  return (
    <div className="grid grid-cols-[1fr,auto,auto] gap-y-4">
      {transfers?.map((transfer, index) => (
        <Row key={index} transfer={transfer} />
      ))}
    </div>
  );
};

const PerformanceTab = ({ playerPerformance }) => {
  return (
    <div className="grid grid-cols-[1fr,auto,auto] gap-y-4">
      <Performance playerPerformance={playerPerformance} />
    </div>
  );
};

const AbsenceTab = ({ playerAbsence }) => {
  return (
    <div className="grid grid-cols-[1fr,auto,auto] gap-y-4">
      <Absence playerAbsence={playerAbsence} />
    </div>
  );
};

export function MiniTransfer({ transfers }) {
  const router = useRouter();
  const { playerId } = router.query;
  const { data: playerPerformance } = useGetPlayerPerformance(
    playerId as string
  );

  const { data: playerAbsence } = useGetPlayerAbsence(playerId as string);
  const { data: trophies } = useGetPlayerTrophies(playerId as string);

  return (
    <Block>
      <TabBlock>
        <TabBlock.List className="md:px-4">
          <TabBlock.Tab label="Transfers" />
          <TabBlock.Tab label="Performance" />
          <TabBlock.Tab label="Absence" />
          <TabBlock.Tab label="Trophies" />
        </TabBlock.List>
        <TabBlock.Panels className="md:px-4 md:py-4">
          <TabBlock.Panel>
            <Transfer transfers={transfers} />
          </TabBlock.Panel>
          <TabBlock.Panel className={"w-full md:w-[380px]"}>
            <PerformanceTab playerPerformance={playerPerformance} />
          </TabBlock.Panel>
          <TabBlock.Panel className={"w-full md:w-[380px]"}>
            <AbsenceTab playerAbsence={playerAbsence} />
          </TabBlock.Panel>
          <TabBlock.Panel className={"w-full md:w-[380px]"}>
            <Trophies trophies={trophies} />
          </TabBlock.Panel>
        </TabBlock.Panels>
      </TabBlock>
    </Block>
  );
}
