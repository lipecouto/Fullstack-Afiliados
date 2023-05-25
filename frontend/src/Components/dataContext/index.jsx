import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  return (
    <DataContext.Provider value={{ apiData, setApiData }}>
      {children}
    </DataContext.Provider>
  );
};