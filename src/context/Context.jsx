import React, { createContext, useState } from "react";

// Create a new Context
export const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [toggleMainNavigationLink, setToggleMainNavigationLink] =
    useState(false);

  const value = {
    userToken,
    setUserToken,
    setToggleMainNavigationLink,
    toggleMainNavigationLink,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
