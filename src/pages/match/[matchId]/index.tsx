import { FixtureProvider } from "@/contexts/Fixture/FixtureContext";
import MatchDetail from "@/features/MatchDetail/MatchDetail";

export default function MatchPage() {
  return (
    <FixtureProvider>
      <MatchDetail />
    </FixtureProvider>
  );
}
