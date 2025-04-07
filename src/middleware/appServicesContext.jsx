import React, { createContext, useContext } from "react";
import Services from "./services";

const AppServicesContext = createContext(Services);

export const useAppServices = () => {
  return useContext(AppServicesContext);  
};

export const AppServicesProvider = ({ children }) => {
  return (
    <AppServicesContext.Provider value={Services}>
      {children}
    </AppServicesContext.Provider>
  );
};

export default AppServicesContext;


