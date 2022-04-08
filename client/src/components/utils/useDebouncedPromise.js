import { useRef } from "react";

const useDebouncedPromise = (fn, delay) => {
  let timeoutRef = useRef(null);

  const handler = (...params) => {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(async () => {
        try {
          const response = await fn(...params);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  return handler;
};

export default useDebouncedPromise;
