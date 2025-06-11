import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';
import { spacing, fontSizes } from '../utils/sizes';

export function createStyles(theme: Theme) {
	return StyleSheet.create({
		container: {
			marginVertical: spacing.md,
			backgroundColor: theme.backgroundColor,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: spacing.md,
			marginBottom: spacing.md,
		},
		title: {
			fontSize: fontSizes.xl,
			fontWeight: 'bold',
			color: theme.textColor,
		},
		seeAll: {
			fontSize: fontSizes.sm,
			color: theme.secondaryColor,
		},
		scrollContent: {
			paddingHorizontal: spacing.md,
			paddingBottom: spacing.sm,
		},
	});
}
