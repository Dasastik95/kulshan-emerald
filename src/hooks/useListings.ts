import { useQuery } from "@tanstack/react-query";
import { fetchListings, fetchPreviousDeals, Listing } from "@/lib/firestore";

// Hook to fetch current listings
export const useListings = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["listings"],
    queryFn: fetchListings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch previous deals (closed transactions)
export const usePreviousDeals = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["previous-deals"],
    queryFn: fetchPreviousDeals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

