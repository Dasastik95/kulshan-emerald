import { useQuery } from "@tanstack/react-query";
import { 
  fetchKulshanCommercialCurrent,
  fetchB2BBusinessBrokersCurrent,
  fetchKulshanCommercialPrevious,
  fetchB2BBusinessBrokersPrevious,
  fetchListings, 
  fetchPreviousDeals, 
  Listing 
} from "@/lib/firestore";

// Hook to fetch Kulshan Commercial current listings
export const useKulshanCommercialCurrent = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["kulshan-commercial-current"],
    queryFn: fetchKulshanCommercialCurrent,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch B2B Business Brokers current listings
export const useB2BBusinessBrokersCurrent = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["b2b-business-brokers-current"],
    queryFn: fetchB2BBusinessBrokersCurrent,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch Kulshan Commercial previous deals
export const useKulshanCommercialPrevious = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["kulshan-commercial-previous"],
    queryFn: fetchKulshanCommercialPrevious,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch B2B Business Brokers previous deals
export const useB2BBusinessBrokersPrevious = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["b2b-business-brokers-previous"],
    queryFn: fetchB2BBusinessBrokersPrevious,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Legacy hooks for backward compatibility
export const useListings = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["listings"],
    queryFn: fetchListings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const usePreviousDeals = () => {
  return useQuery<Listing[], Error>({
    queryKey: ["previous-deals"],
    queryFn: fetchPreviousDeals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

