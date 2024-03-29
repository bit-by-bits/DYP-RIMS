import React, { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "./userContext";

const AccessContext = createContext();

export const AccessProvider = ({ children }) => {
  const { user } = useUser();
  const [access, setAccess] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAccess(parseInt(user?.access) ?? 1);
  }, [user]);

  const change = key => {
    const newUser = {
      ...JSON.parse(localStorage.getItem("user")),
      access: parseInt(key),
    };

    setAccess(parseInt(key));
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AccessContext.Provider value={{ access, change }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => useContext(AccessContext);
