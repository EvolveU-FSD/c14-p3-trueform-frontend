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

  function setDefaultSelections(customizations: any[]): void {
    const defaults: Selection = {};
    customizations.forEach((customization) => {
      if (customization.options && customization.options.length > 0) {
        // Use defaultValue from API if available, otherwise use first option
        const defaultOptionId = customization.defaultValue || customization.options[0].id;

        // Verify the default option exists in the options array
        const defaultOptionExists = customization.options.some(
          (opt: any) => opt.id === defaultOptionId,
        );

        if (defaultOptionExists) {
          defaults[customization.id] = defaultOptionId;
        } else {
          // Fallback to first option if default doesn't exist
          defaults[customization.id] = customization.options[0].id;
        }
      }
    });
    setSelections(defaults);
  }

  return (
    <CustomizationContext.Provider value={{ selections, handleSelection, clearSelections }}>
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
