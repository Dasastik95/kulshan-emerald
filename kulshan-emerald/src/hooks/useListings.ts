import { useEffect, useState } from "react";
import axios from "axios";

const useListings = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/listings");
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { data, isLoading, isError, error };
};

export default useListings;