import { useState, useEffect } from "react";

function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log("Error in use-data-fetching.js", response);
          // throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useDataFetching;
