export type Selection = {
  [customizationId: string]: string;
};

export interface CustomizationContextType {
  selections: Selection;
  handleSelection: (customizationId: string, optionId: string) => void;
  clearSelections: () => void;
}
