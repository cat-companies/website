import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

const companyColors = {
  catcompanies: {
    primary: '#333333', // Black
    secondary: '#000000', // Pure black
    highlight: '#FFFFFF', // White for contrast
    background: 'rgba(51, 51, 51, 0.1)' // Transparent black
  },
  home: {
    primary: '#333333', // Black
    secondary: '#000000', // Pure black
    highlight: '#FFFFFF', // White for contrast
  },
  computers: {
    primary: '#80C2A4', // Teal/green
    secondary: '#FFFFFF',
    highlight: '#FFFFFF',
    background: 'rgba(128, 194, 164, 0.1)' // Transparent green
  },
  campaigns: {
    primary: '#C2809D', // Pink/magenta
    secondary: '#333333',
    highlight: '#FFFFFF',
    background: 'rgba(194, 128, 157, 0.1)' // Transparent pink
  },
  phish: {
    primary: '#BEC280', // Light green
    secondary: '#333333',
    highlight: '#FFFFFF',
    background: 'rgba(190, 194, 128, 0.1)' // Transparent light green
  },
  compute: {
    primary: '#8380C2', // Purple/blue
    secondary: '#333333',
    highlight: '#FFFFFF',
    background: 'rgba(131, 128, 194, 0.1)' // Transparent purple
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