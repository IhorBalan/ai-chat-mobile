import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export default function PasswordInput({
  label,
  value,
  onChangeText,
  placeholder,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.passwordHeader}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TouchableOpacity onPress={toggleVisibility}>
          <Ionicons
            name={isVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={!isVisible}
      />
      <View style={styles.inputUnderline} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
