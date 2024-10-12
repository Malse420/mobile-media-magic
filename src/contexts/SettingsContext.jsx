import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    gesturesEnabled: true,
    toggleKey: 'F2',
    includeAudio: false,
  });

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('erudaInjectorSettings') || '{}');
    setSettings(prev => ({ ...prev, ...savedSettings }));
  }, []);

  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const updatedSettings = { ...prev, ...newSettings };
      localStorage.setItem('erudaInjectorSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};