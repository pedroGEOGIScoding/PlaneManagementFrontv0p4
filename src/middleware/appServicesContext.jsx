import React, { createContext, useContext } from "react";
import Services from "./service";

const AppServicesContext = createContext(Services);

export const useAppService = () => {
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


