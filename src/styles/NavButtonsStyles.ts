import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export function createStyles(theme: Theme) {
	return StyleSheet.create({
		scrollContainer: {
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.md,
			marginBottom: 1,
			marginLeft: 1,
			backgroundColor: theme.backgroundColor,
		},
		button: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			borderRadius: spacing.lg,
			backgroundColor: theme.borderColor,
			marginRight: spacing.md,
		},
		activeButton: {
			backgroundColor: theme.primaryColor,
		},
		icon: {
			fontSize: fontSizes.lg,
			marginRight: spacing.xs + 2,
			color: theme.textColor,
		},
		activeIcon: {
			color: '#FFFFFF',
		},
		label: {
			fontSize: fontSizes.sm,
			fontWeight: '500',
			color: theme.textColor,
		},
		activeLabel: {
			color: '#FFFFFF',
		},
	});
}
