import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = `https://opentdb.com`;
const useHttp = ({ url }) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${url}`)
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setIsloading(false));
    };

    fetchData();
  }, [url]);
  return {
    response,
    isLoading,
    error,
  };
};

export default useHttp;
