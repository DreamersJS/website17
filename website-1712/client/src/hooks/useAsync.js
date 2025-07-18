import { useEffect, useState } from 'react';

export const useAsync = (asyncFunction, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(undefined);
    setValue(undefined);

    asyncFunction()
      .then((result) => {
        if (isMounted) setValue(result);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { loading, value, error };
};
