import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';

interface VoiceHeaderProps {
  selectedModel: string;
  onBack: () => void;
  onModelSelect: () => void;
  onMore: () => void;
  shouldAnimate?: boolean;
}

export default function VoiceHeader({
  selectedModel,
  onBack,
  onModelSelect,
  onMore,
  shouldAnimate = true,
}: VoiceHeaderProps) {
  const modelSelector = (
    <TouchableOpacity
      style={styles.modelSelector}
      onPress={onModelSelect}
      activeOpacity={0.7}
    >
      <View style={styles.modelSelectorGradient} />
      <Text style={styles.modelText}>{selectedModel} </Text>
      <Ionicons name="chevron-down" size={11} color="white" />
    </TouchableOpacity>
  );

  return (
    <Header
      onBack={onBack}
      onMore={onMore}
      centralSlot={modelSelector}
      shouldAnimate={shouldAnimate}
    />
  );
}

const styles = StyleSheet.create({
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  modelSelectorGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(101, 198, 254, 0.1)',
  },
  modelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    zIndex: 1,
  },
});
