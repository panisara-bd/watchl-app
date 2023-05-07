import { useState } from 'react';

type Result<T> = {
  result: T | undefined;
  error: any;
  isLoading: boolean;
  handle: () => void;
};

export const useAsyncOperation = <T>(fn: () => Promise<T>): Result<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [result, setResult] = useState<T>();

  const handle = () => {
    setIsLoading(true);
    setError(undefined);
    fn()
      .then((result) => {
        setResult(result);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { result, error, isLoading, handle };
};
