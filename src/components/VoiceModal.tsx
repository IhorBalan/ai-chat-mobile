import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import BottomModal from './BottomModal';

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  voice?: string; // Voice ID for iOS/Android
  pitch?: number;
  rate?: number;
  icon: string;
}

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
  selectedVoice: VoiceOption;
  onSelectVoice: (voice: VoiceOption) => void;
}

export const availableVoices: VoiceOption[] = [
  {
    id: 'default',
    name: 'Neutral Voice',
    description: 'Natural balanced tone',
    pitch: 1.0,
    rate: 1.0,
    icon: 'mic-outline',
  },
  {
    id: 'warm',
    name: 'Warm Voice',
    description: 'Softer, friendly tone',
    pitch: 0.95,
    rate: 1.0,
    icon: 'heart-outline',
  },
  {
    id: 'confident',
    name: 'Confident Voice',
    description: 'Clear, authoritative tone',
    pitch: 1.05,
    rate: 1.0,
    icon: 'star-outline',
  },
];

export default function VoiceModal({
  visible,
  onClose,
  selectedVoice,
  onSelectVoice,
}: VoiceModalProps) {
  const handlePreview = (voice: VoiceOption, e: any) => {
    e.stopPropagation(); // Prevent triggering the selection
    try {
      Speech.speak('Hello, this is a voice preview', {
        pitch: voice.pitch || 1.0,
        rate: voice.rate || 0.8,
        language: 'en-US',
      });
    } catch (error) {
      console.log('Voice preview error:', error);
    }
  };

  return (
    <BottomModal visible={visible} title="Select Voice" onClose={onClose}>
      <View style={styles.content}>
        {availableVoices.map((voice) => {
          const isSelected = selectedVoice.id === voice.id;
          return (
            <TouchableOpacity
              key={voice.id}
              style={[styles.voiceOption, isSelected && styles.selectedOption]}
              onPress={() => {
                onSelectVoice(voice);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.voiceOptionLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}
                >
                  <Ionicons
                    name={voice.icon as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color={isSelected ? '#00A3FF' : 'white'}
                  />
                </View>
                <View style={styles.voiceInfo}>
                  <Text style={styles.voiceName}>{voice.name}</Text>
                  <Text style={styles.voiceDescription}>
                    {voice.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={(e) => handlePreview(voice, e)}
                activeOpacity={0.7}
              >
                <Ionicons name="play-circle" size={32} color="#00A3FF" />
              </TouchableOpacity>
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
  voiceOption: {
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
  voiceOptionLeft: {
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
  voiceInfo: {
    flex: 1,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  voiceDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  previewButton: {
    padding: 8,
  },
});
