import React from 'react';
import styles from '@/styles/patron.styles';
import {
  Text,
  TextInput,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface PatronCustomInputProps {
  field: string;
  label: string;
  isEditing: boolean;
  value: string;
  handleChange: (field: string, value: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function PatronCustomInput({
  field,
  label,
  isEditing,
  value,
  handleChange,
  inputStyle,
  containerStyle,
}: PatronCustomInputProps) {
  return (
    <View style={[styles.section, containerStyle]}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={[
          styles.input,
          !isEditing && styles.disabledInput,
          field === 'library' && styles.disabledInput,
          inputStyle,
        ]}
        value={value}
        onChangeText={(text) => handleChange(field, text)}
        editable={field === 'library' ? false : isEditing}
      />
    </View>
  );
}
