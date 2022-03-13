import React, { createContext } from "react";
import Store from "./Store";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const storeValues = Store();
  return (
    <StoreContext.Provider value={storeValues}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
