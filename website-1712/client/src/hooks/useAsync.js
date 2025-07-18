import { useEffect, useState } from "react";

export const useAsync = (asyncFunction, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(undefined);
  const [error, setError] = useState(undefined);

  const execute = async () => {
    setLoading(true);
    try {
      const data = await asyncFunction();
      setValue(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, deps);

  return { loading, value, error, refetch: execute };
};
