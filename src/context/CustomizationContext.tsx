import React, { createContext, useContext, useState } from 'react';

type Selection = {
  [customizationId: string]: string;
};

interface CustomizationContextType {
  selections: Selection;
  setSelection: (customizationId: string, optionId: string) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<Selection>({});

  function setSelection(customizationId: string, optionId: string): void {
    setSelections((prev) => ({
      ...prev,
      [customizationId]: optionId,
    }));
  }

  return (
    <CustomizationContext.Provider value={{ selections, setSelection }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization(): CustomizationContextType {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}
