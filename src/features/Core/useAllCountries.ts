import { getAllCountries, getFootballNews } from "@/services/core-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllCountries() {
    const {data : allCountries, isLoading, isError} = useQuery({
        queryKey: ["homepage top comps"],
        queryFn: () => getAllCountries(),
        staleTime: 1000 * 60 * 10
    })

    return {allCountries, isLoading, isError}
}
 

export async function getNews() {
    const data = await getFootballNews();
    return data;
}