import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ScrollContext = createContext({
  isProgrammaticScroll: false,
  setIsProgrammaticScroll: () => {},
});

export const ScrollProvider = ({ children }) => {
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  return (
    <ScrollContext.Provider
      value={{ isProgrammaticScroll, setIsProgrammaticScroll }}
      data-testid="scroll-context-provider"
      aria-label="Scroll context provider"
    >
      {children}
    </ScrollContext.Provider>
  );
};

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useScrollContext = () => useContext(ScrollContext);
