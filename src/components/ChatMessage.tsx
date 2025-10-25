import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onCopy?: (content: string) => void;
  onRegenerate?: (id: number) => void;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
}

export default function ChatMessage({
  message,
  onCopy,
  onRegenerate,
  onLike,
  onDislike,
}: ChatMessageProps) {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(message.id);
    }
  };

  const handleLike = () => {
    if (onLike) {
      onLike(message.id);
    }
  };

  const handleDislike = () => {
    if (onDislike) {
      onDislike(message.id);
    }
  };

  if (message.type === 'ai') {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{message.content}</Text>
          <Text style={styles.timestamp}>{message.timestamp}</Text>
          <View style={styles.messageActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
              <Ionicons name="copy-outline" size={16} color="#D4D4D4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRegenerate}
            >
              <Ionicons name="refresh-outline" size={16} color="#D4D4D4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Ionicons name="thumbs-up-outline" size={16} color="#D4D4D4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDislike}
            >
              <Ionicons name="thumbs-down-outline" size={16} color="#D4D4D4" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.userMessageContainer}>
      <View style={styles.userMessageBubble}>
        <Text style={styles.userMessageText}>{message.content}</Text>
        <Text style={styles.userTimestamp}>{message.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  messageBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#D4D4D4',
    opacity: 0.7,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMessageContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  userMessageBubble: {
    backgroundColor: '#00A3FF',
    borderRadius: 16,
    padding: 16,
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginBottom: 8,
  },
  userTimestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
