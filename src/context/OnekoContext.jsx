import React, { createContext, useContext, useState, useEffect } from 'react';

const OnekoContext = createContext();

export function OnekoProvider({ children }) {
  const [isOnekoEnabled, setIsOnekoEnabled] = useState(true);

  // Cleanup function to remove all oneko elements
  const cleanup = () => {
    // Remove the script
    const scripts = document.querySelectorAll('script[src="/oneko.js"]');
    scripts.forEach(script => script.remove());
    
    // Remove any script with id oneko-script
    const scriptById = document.getElementById('oneko-script');
    if (scriptById) scriptById.remove();
    
    // Remove the cat element
    const neko = document.getElementById('oneko');
    if (neko) neko.remove();
    
    // Remove speech bubble if it exists
    const speechBubble = document.getElementById('oneko-speech-bubble');
    if (speechBubble) speechBubble.remove();
    
    // Final sweep for any elements with oneko class
    const nekos = document.querySelectorAll('.oneko');
    nekos.forEach(neko => neko.remove());
  };

  useEffect(() => {
    if (isOnekoEnabled) {
      // Clean up any existing instances first
      cleanup();
      
      // Add new script
      const script = document.createElement('script');
      script.id = 'oneko-script';
      script.src = '/oneko.js';
      document.body.appendChild(script);
    } else {
      // Immediate cleanup when disabled
      cleanup();
    }

    // Cleanup on unmount
    return cleanup;
  }, [isOnekoEnabled]);

  const toggleOneko = () => {
    setIsOnekoEnabled(prev => {
      if (prev) {
        // Immediate cleanup when turning off
        cleanup();
      }
      return !prev;
    });
  };

  return (
    <OnekoContext.Provider value={{ isOnekoEnabled, toggleOneko }}>
      {children}
    </OnekoContext.Provider>
  );
}

export function useOneko() {
  const context = useContext(OnekoContext);
  if (!context) {
    throw new Error('useOneko must be used within an OnekoProvider');
  }
  return context;
} 