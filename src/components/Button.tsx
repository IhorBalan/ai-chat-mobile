import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, style]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <LinearGradient
          colors={['#00A0FE', '#0385FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, disabled && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <LinearGradient
        colors={['#00A3FF', '#0385FE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, disabled && styles.buttonDisabled]}
      >
        <Text style={[styles.buttonText]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    borderRadius: 100,
    overflow: 'hidden',
  },
  button: {
    height: 52,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FCFFFF',
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
