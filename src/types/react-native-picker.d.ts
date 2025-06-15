declare module '@react-native-picker/picker' {
    import { Component, ReactNode } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';

    export interface PickerProps {
        style?: ViewStyle;
        selectedValue?: any;
        onValueChange?: (itemValue: any, itemIndex: number) => void;
        enabled?: boolean;
        mode?: 'dialog' | 'dropdown';
        prompt?: string;
        itemStyle?: TextStyle;
        testID?: string;
        children?: ReactNode;  // Add this line
    }

    export interface PickerItemProps {
        label: string;
        value: any;
        color?: string;
        testID?: string;
    }

    export class Picker extends Component<PickerProps> {
        static Item: React.ComponentType<PickerItemProps>;
    }
}