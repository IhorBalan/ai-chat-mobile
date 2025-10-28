import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Paper from '../../core/components/Paper';

interface Conversation {
  id: number;
  title: string;
  preview: string;
}

interface ContinueConversationsProps {
  conversations: Conversation[];
  onConversationPress: (id: number) => void;
}

export default function ContinueConversations({
  conversations,
  onConversationPress,
}: ContinueConversationsProps) {
  return (
    <View style={styles.conversationsSection}>
      <Text style={styles.sectionTitle}>Continue Conversations</Text>

      {conversations.map((conversation) => (
        <TouchableOpacity
          key={conversation.id}
          style={styles.conversationCardWrapper}
          onPress={() => onConversationPress(conversation.id)}
          activeOpacity={0.7}
        >
          <Paper style={styles.conversationCard}>
            <Text style={styles.conversationTitle}>{conversation.title}</Text>
            <Text style={styles.conversationPreview}>
              &ldquo;{conversation.preview}...&rdquo;
            </Text>
          </Paper>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  conversationsSection: {
    marginBottom: 0, // Remove bottom margin since parent handles padding
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  conversationCardWrapper: {
    marginBottom: 12,
  },
  conversationCard: {
    // Paper component handles background, border radius, and padding
  },
  conversationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  conversationPreview: {
    color: '#8E8E93',
    fontSize: 12,
  },
});
