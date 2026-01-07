
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AccentColorContextType = {
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const AccentColorContext = createContext<AccentColorContextType | undefined>(undefined);

export const AccentColorProvider = ({ 
    children, 
    initialColor, 
    onSetColor 
}: { 
    children: ReactNode, 
    initialColor: string, 
    onSetColor: (color: string) => void 
}) => {
  
  const setAccentColor = (color: string) => {
    onSetColor(color);
  };

  return (
    <AccentColorContext.Provider value={{ accentColor: initialColor, setAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => {
  const context = useContext(AccentColorContext);
  if (context === undefined) {
    throw new Error('useAccentColor must be used within an AccentColorProvider');
  }
  return context;
};
