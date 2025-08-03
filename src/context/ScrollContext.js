import { createContext, useContext, useState } from "react";

const ScrollContext = createContext({
  isProgrammaticScroll: false,
  setIsProgrammaticScroll: () => {},
});

export const ScrollProvider = ({ children }) => {
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  return (
    <ScrollContext.Provider
      value={{ isProgrammaticScroll, setIsProgrammaticScroll }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
