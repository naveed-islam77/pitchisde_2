import { supabase } from "@/supabase/supabaseClient";
import axiosInstance from "@/utils/apiInstance";
import { baseUrl } from "@/utils/constants";
import axios from "axios";

type Pagination = {
  count: number;
  current_page: number;
  has_more: boolean;
  next_page: string;
  per_page: number;
};

interface CountriesResponse {
  message?: string;
  subscription?: object;
  data?: Array<any>;
  rate_limit?: object;
  timezone?: string;
  pagination?: Pagination;
}

const coreUrl = "v3/core";
export async function getAllCountries(
): Promise<CountriesResponse> {
  try {
    const { data, error } = await supabase
       .rpc('homepage_all_comps');
   
     if (error) {
       throw new Error(error.message);
     }
   
     return data;
  } catch (error: any) {
    throw new Error(error.data.message);
  }
}

export const getFootballNews = async () => {
  const feedUrl = process.env.NEXT_PUBLIC_FEED_URL;

  try {
    const response = await axios.get("/api/rss", { params: { url: feedUrl } });
    return response.data;

  } catch (error) {
    console.error('Error fetching football news:', error);
    return null;
  }
}
export async function getAllTypes(): Promise<CountriesResponse> {
  try {
    const res = await axiosInstance(`${baseUrl}/${coreUrl}/types`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.data.message);
  }
}
