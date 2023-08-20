import { message } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      if (
        user &&
        user?.setUpTime &&
        user?.setUpTime + 24 * 60 * 60 * 1000 < Date.now()
      ) {
        localStorage.removeItem("user");
        message.error("Oops! Your session ended. Try logging in again.");
      }
  }, [user, router]);

  const change = newUser => {
    setUser(newUser);

    if (!newUser?.token) {
      localStorage.removeItem("user");
      router.push("/");
    } else {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, change }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
