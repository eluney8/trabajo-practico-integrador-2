import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        credentials: "include", // sirve para enviar las cookies de sesion
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: no se pudieron obtener los datos`,
        );
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
};
