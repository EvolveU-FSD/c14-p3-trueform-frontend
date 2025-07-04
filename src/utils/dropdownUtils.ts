/**
 * Utility function to handle backdrop press for closing dropdowns/modals
 * @param states - Array of state objects with getter and setter
 * @returns Function to handle backdrop press
 */
export const createBackdropHandler = (
  states: Array<{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }>,
) => {
  return () => {
    states.forEach(({ isOpen, setIsOpen }) => {
      if (isOpen) {
        setIsOpen(false);
      }
    });
  };
};

/**
 * Alternative implementation with individual state handlers
 */
export const createMultiStateHandler = (...handlers: Array<() => void>) => {
  return () => {
    handlers.forEach((handler) => handler());
  };
};

/**
 * Simple backdrop handler for a single dropdown
 */
export const createSingleBackdropHandler = (
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
) => {
  return () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
};
