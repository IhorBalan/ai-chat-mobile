import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
}

export default function CustomTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
}: CustomTextInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
      <View style={styles.inputUnderline} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  input: {
    fontSize: 15,
    color: 'white',
    paddingVertical: 8,
  },
  inputUnderline: {
    height: 2,
    backgroundColor: '#D9D9D9',
  },
});
