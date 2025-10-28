import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Language {
  id: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  label: string;
  language: Language;
  onPress: () => void;
}

export default function LanguageSelector({
  label,
  language,
  onPress,
}: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{language.flag}</Text>
        <Text style={styles.languageName}>{language.name}</Text>
        <Ionicons name="chevron-down" size={20} color="#00A3FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  flag: {
    fontSize: 20,
  },
  languageName: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
});
