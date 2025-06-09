import React, { createContext, useContext, useState } from 'react';

type CustomizationState = {
  collarStyle: string;
  cuffStyle: string;
  pocketStyle: string;
  sleeveStyle: string;
  shirtLength: string;
  monogram: string;
  buttonColor: string;
  measurementType: string;
};

type CustomizationContextType = {
  state: CustomizationState;
  updateOption: (key: keyof CustomizationState, value: string) => void;
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CustomizationState>({
    collarStyle: '',
    cuffStyle: '',
    pocketStyle: '',
    sleeveStyle: '',
    shirtLength: '',
    monogram: '',
    buttonColor: '',
    measurementType: '',
  });

  const updateOption = (key: keyof CustomizationState, value: string) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <CustomizationContext.Provider value={{ state, updateOption }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
