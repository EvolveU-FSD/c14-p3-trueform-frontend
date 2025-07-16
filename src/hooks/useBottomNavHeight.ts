import { useMemo } from 'react';
import { spacing } from '../utils/sizes';

export const useBottomNavHeight = () => {
  return useMemo(() => {
    // Calculate the height based on the styles in BottomNavBarStyles
    const paddingVertical = spacing.lg; // paddingVertical
    const paddingBottom = spacing.xl; // paddingBottom
    const tabButtonPadding = spacing.md; // tabButton paddingVertical
    const iconSize = 32; // approximate icon height
    const labelHeight = 16; // approximate label height
    const spacing_xs = spacing.xs; // marginBottom on icon

    return (
      paddingVertical + paddingBottom + tabButtonPadding + iconSize + labelHeight + spacing_xs + 10
    ); // 10px buffer
  }, []);
};
