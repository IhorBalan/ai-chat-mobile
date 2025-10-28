import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomModal from './BottomModal';

export interface Language {
  id: string;
  name: string;
  flag: string;
}

interface LanguageModalProps {
  visible: boolean;
  languages: Language[];
  selectedLanguage: Language;
  onClose: () => void;
  onSelect: (language: Language) => void;
}

export default function LanguageModal({
  visible,
  languages,
  selectedLanguage,
  onClose,
  onSelect,
}: LanguageModalProps) {
  const handleSelect = (language: Language) => {
    onSelect(language);
    onClose();
  };

  return (
    <BottomModal visible={visible} title="Select Language" onClose={onClose}>
      <View style={styles.content}>
        {languages.map((language) => {
          const isSelected = language.id === selectedLanguage.id;
          return (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageOption,
                isSelected && styles.selectedOption,
              ]}
              onPress={() => handleSelect(language)}
              activeOpacity={0.7}
            >
              <View style={styles.languageOptionLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                </View>
                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>{language.name}</Text>
                </View>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  selectedOption: {
    borderColor: '#00A3FF',
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
  },
  languageOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(0, 163, 255, 0.2)',
  },
  flag: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
