import { getFixtureBanner } from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";

export function useFixtureBanner(fixtureId: string) {
  return useQuery({
    queryKey: ["fixture banner", fixtureId],
    queryFn: () => getFixtureBanner(fixtureId),
    enabled: !!fixtureId,
  });
}