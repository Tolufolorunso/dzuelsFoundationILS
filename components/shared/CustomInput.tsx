import Colors from '@/data/Colors';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type CustomInputProps = {
  label: string;
  placeholder: string;
  value?: string;
  password?: boolean;
  isEditing?: boolean;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  password = false,
  isEditing = true,
}: CustomInputProps) {
  console.log(isEditing);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={password}
        onFocus={onFocus}
        editable={isEditing}
        // keyboardType="default"
        // autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
    textTransform: 'capitalize',
    color: '#4b5563',
    fontSize: 16,
  },
  required: {
    color: Colors.PRIMARY,
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputFocused: {
    borderColor: Colors.PRIMARY, // focus:border-blue-500
  },
});
