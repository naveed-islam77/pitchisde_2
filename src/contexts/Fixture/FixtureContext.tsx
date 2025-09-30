import { useFixtureBanner } from "@/features/Fixtures/useFixtures";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

const FixtureContext = createContext<any>(null);

export function FixtureProvider({ children }) {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: fixtureBanner, isLoading } = useFixtureBanner(
    matchId as string
  );

  return (
    <FixtureContext.Provider value={{ fixtureBanner, isLoading }}>
      {children}
    </FixtureContext.Provider>
  );
}

export const useFixture = () => useContext(FixtureContext);
