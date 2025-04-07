import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const companyColors = {
  computers: {
    primary: '#80C2A4', // Teal/green
    secondary: '#FFFFFF', // White as secondary
    highlight: '#FFFFFF', // White for clean contrast
  },
  campaigns: {
    primary: '#C2809D', // Pink/magenta
    secondary: '#333333',
    highlight: '#FFFFFF',
  },
  phish: {
    primary: '#BEC280', // Light green
    secondary: '#333333',
    highlight: '#FFFFFF',
  },
  compute: {
    primary: '#8380C2', // Purple/blue
    secondary: '#333333',
    highlight: '#FFFFFF',
  },
};

export function CompanyProvider({ children }) {
  const [activeCompany, setActiveCompany] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetCompany = (company) => {
    // If setting to null (mouse leave), don't trigger transition
    if (company === null) {
      setActiveCompany(null);
      return;
    }
    
    // If changing to a new company, trigger transition
    if (company !== activeCompany) {
      setIsTransitioning(true);
      setActiveCompany(company);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <CompanyContext.Provider value={{ 
      activeCompany, 
      setCompany: handleSetCompany, 
      companyColors,
      isTransitioning
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
} 