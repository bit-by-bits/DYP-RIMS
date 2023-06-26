import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
    }

    console.log(user);
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

  useEffect(() => {
    if (user?.token) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, change }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
