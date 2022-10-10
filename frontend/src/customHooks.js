import { useEffect, useState } from "react";

export const useSessionStorage = (storageKey, fallbackState) => {
    const existingValue = JSON.parse(sessionStorage.getItem(storageKey))

    const [value, setValue] = useState(
        existingValue ? existingValue : fallbackState
      );
    
      useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(value));
      }, [value, storageKey]);
    
      return [value, setValue];
};