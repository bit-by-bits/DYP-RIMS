import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  const change = newUser => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, change }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
