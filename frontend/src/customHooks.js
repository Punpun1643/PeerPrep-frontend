import { useEffect, useState } from "react";

export const useSessionStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
        JSON.parse(sessionStorage.getItem(storageKey)) ?? fallbackState
      );
    
      useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(value));
      }, [value, storageKey]);
    
      return [value, setValue];
};