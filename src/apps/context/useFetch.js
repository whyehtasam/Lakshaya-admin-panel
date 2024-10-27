import { useState, useEffect } from "react";

export const useFetch = (url, method) => {
  const [fetchedData, setFetchData] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(backend_url + url, {
          method,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setFetchData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFunction();
  }, [url, method,backend_url, token]);

  return {
    fetchedData,
    
  };
};
