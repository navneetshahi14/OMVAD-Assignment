"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState("system");

  useEffect(()=>{
    setTheme(localStorage.getItem('theme'))
  },[theme])

  return (
    <UrlContext.Provider value={{ token, setToken, theme, setTheme }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
