import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AIAssistantCardProps {
  onChatPress: () => void;
}

export default function AIAssistantCard({ onChatPress }: AIAssistantCardProps) {
  return (
    <View style={styles.aiAssistantCard}>
      {/* Decorative circle */}
      <View style={styles.decorativeCircle} />

      <Text style={styles.aiAssistantLabel}>AI Assistant</Text>
      <Text style={styles.aiAssistantTitle}>What Can I Do For You Today?</Text>
      <TouchableOpacity style={styles.chatButton} onPress={onChatPress}>
        <Text style={styles.chatButtonText}>Chat</Text>
        <Ionicons name="chevron-forward" size={16} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  aiAssistantCard: {
    backgroundColor: '#00A3FF',
    borderRadius: 20,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  decorativeCircle: {
    position: 'absolute',
    bottom: 65,
    left: -250,
    width: 700,
    height: 700,
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    opacity: 0.8,
  },
  aiAssistantLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 8,
  },
  aiAssistantTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    lineHeight: 34,
    maxWidth: 240,
  },
  chatButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    height: 34,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  chatButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
});
