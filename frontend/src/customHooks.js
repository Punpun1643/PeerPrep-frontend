import axios from "axios";
import { useEffect, useState } from "react";
import { URL_USER_SVC } from "./configs";

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

export const ensureLoggedIn = async (navigate) => {
  await axios.post(URL_USER_SVC + '/auth',
      { withCredentials: true, credentials: 'include' })
      .catch((err) => {
          console.log(err)
          navigate("/login")
      });
}