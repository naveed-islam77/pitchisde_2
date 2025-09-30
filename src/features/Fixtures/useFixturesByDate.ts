import { getFixturesByDate, getLeagueBannerData } from "@/services/fixtures-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function useFixturesByDate() {
  const { query } = useRouter();
  const today = format(new Date(), "yyyy-MM-dd");
  const date: string = (query.date as string) || today;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["fixtures by date", date],
    queryFn: () => getFixturesByDate({input_date: date}),
  });

  const fixtures = data || [];

  return {
    fixtures,
    isLoading,
    isFetching,
    isError,
    error,
    status,
  };
}


export function useGetLeagueBannerData(leagueId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["league banner", leagueId],
    queryFn: () => getLeagueBannerData(leagueId),
    enabled: !!leagueId,
  });

  return {
    leagueBannerData: data,
    isLoading,
    isError,
    error,
  };
}