import React, { createContext, useContext, useState } from 'react';
import { Selection, CustomizationContextType } from '../types/context/customization.types';

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<Selection>({});

  function handleSelection(customizationId: string, optionId: string): void {
    setSelections((prev) => ({
      ...prev,
      [customizationId]: optionId,
    }));
  }

  function clearSelections(): void {
    setSelections({});
  }

  return (
    <CustomizationContext.Provider
      value={{
        selections,
        handleSelection,
        clearSelections,
      }}
    >
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
