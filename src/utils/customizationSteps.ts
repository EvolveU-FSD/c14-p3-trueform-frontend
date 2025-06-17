export const CUSTOMIZATION_STEPS = [
  'CollarStyle',
  'CuffStyle',
  'PocketStyle',
  'SleeveStyle',
  'ShirtLength',
  'Monogram',
  'Buttons',
  'Measurement',
] as const;

export const getNextStep = (currentStep: string): string | undefined => {
  const currentIndex = CUSTOMIZATION_STEPS.indexOf(currentStep as any);
  return CUSTOMIZATION_STEPS[currentIndex + 1];
};

export const getPreviousStep = (currentStep: string): string | undefined => {
  const currentIndex = CUSTOMIZATION_STEPS.indexOf(currentStep as any);
  return currentIndex > 0 ? CUSTOMIZATION_STEPS[currentIndex - 1] : undefined;
};
