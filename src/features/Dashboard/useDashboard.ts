import { useQuery } from "@tanstack/react-query";
import { getHomeFeaturedMatches, getHomeLiveMatches, getTopCompetitions } from "@/services/leagues-api";

export function useTopCompetitions() {
    const {data : topCompetitions, isLoading, isError} = useQuery({
        queryKey: ["homepage_top_comps"],
        queryFn: () => getTopCompetitions(),
        staleTime: 1000 * 60 * 10
    })

    return {topCompetitions, isLoading, isError}
}



export function useFeaturedMatches() {
    const {data: featuredMatches, isLoading, isError} = useQuery({
        queryKey: ["homepage_featured_matches"],
        queryFn: () => getHomeFeaturedMatches(),
    })

    return {featuredMatches, isLoading, isError}
}


export function useGetLiveMatches({isLive}) {
    const {data: liveMatches, isLoading, isError} = useQuery({
        queryKey: ["homepage_live_matches"],
        queryFn: () => getHomeLiveMatches(),
        refetchInterval: isLive ? 3000 : false
    })

    return {liveMatches, isLoading, isError}
}