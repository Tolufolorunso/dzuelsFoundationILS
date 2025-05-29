import { ComponentProps } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styles from './customTextInput.styles';

type CustomTextInput = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  label,
  containerStyle,
  ...textInputProps
}: CustomTextInput) {
  const error = { message: 'This field is required' };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
      />
      <Text style={styles.error} numberOfLines={1}>
        {error?.message}
      </Text>
    </View>
  );
}
