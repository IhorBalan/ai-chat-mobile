import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VoiceHeaderProps {
  selectedModel: string;
  onBack: () => void;
  onModelSelect: () => void;
  onMore: () => void;
}

export default function VoiceHeader({
  selectedModel,
  onBack,
  onModelSelect,
  onMore,
}: VoiceHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      {/* Model Selector */}
      <TouchableOpacity
        style={styles.modelSelector}
        onPress={onModelSelect}
        activeOpacity={0.7}
      >
        <View style={styles.modelSelectorGradient} />
        <Text style={styles.modelText}>{selectedModel} </Text>
        <Ionicons name="chevron-down" size={11} color="white" />
      </TouchableOpacity>

      {/* More Button */}
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onMore}
        activeOpacity={0.7}
      >
        <Ionicons
          name="ellipsis-horizontal-circle-outline"
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: Platform.OS === 'ios' ? 60 : 28,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#65C6FE',
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
