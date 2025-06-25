// src/utils/alerts.ts
import { Alert, Platform } from 'react-native';

/**
 * Cross-platform alert function that works on both web and native platforms
 *
 * @param title Alert title
 * @param message Alert message
 * @param onOk Optional callback function to execute when user clicks OK
 * @param buttons Optional custom buttons (only used in native, ignored on web)
 */
export const showAlert = (
  title: string,
  message: string,
  onOk?: () => void,
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>,
) => {
  if (Platform.OS === 'web') {
    // For web: use browser's alert via global object to avoid TypeScript errors
    const browserAlert = (global as any).alert;
    browserAlert(`${title}\n\n${message}`);
    if (onOk) onOk();
  } else {
    // For native: use React Native's Alert with custom buttons or default OK button
    if (buttons && buttons.length > 0) {
      Alert.alert(title, message, buttons);
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  }
};

/**
 * Show a confirmation dialog with Yes/No options
 *
 * @param title Alert title
 * @param message Alert message
 * @param onYes Callback function when user confirms
 * @param onNo Optional callback function when user cancels
 */
export const showConfirm = (
  title: string,
  message: string,
  onYes: () => void,
  onNo?: () => void,
) => {
  if (Platform.OS === 'web') {
    // For web: use browser's confirm dialog via global object
    const browserConfirm = (global as any).confirm || (() => false);
    const result = browserConfirm(`${title}\n\n${message}`);
    if (result) {
      onYes();
    } else if (onNo) {
      onNo();
    }
  } else {
    // For native: use React Native's Alert with Yes/No buttons
    Alert.alert(title, message, [
      {
        text: 'No',
        onPress: onNo,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: onYes,
      },
    ]);
  }
};
