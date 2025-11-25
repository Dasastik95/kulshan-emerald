import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListingDetails } from "@/api/listings"; // Assuming you have an API utility to fetch data

const useListing = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const data = await fetchListingDetails(id);
        setListingDetails(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getListingDetails();
  }, [id]);

  return { listingDetails, isLoading, isError };
};

export default useListing;