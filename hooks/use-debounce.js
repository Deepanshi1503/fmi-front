import { useEffect, useState } from "react";
export const useDebounce = (value, delay = 500) => {
  let start = Date.now();
  // console.log("entering debounce", start);
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // console.log("entering useEffect");
    const timeout = setTimeout(() => {
      // console.log("entering setTimeout");
      setDebounceValue(value);
      let end = Date.now();
      // console.log("time spent", end - start);
    }, delay);
    // console.log("returning useEffect");
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
