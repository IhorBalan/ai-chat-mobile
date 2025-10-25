import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../src/components/Header';
import BottomInputBar from '../../src/components/BottomInputBar';
import DecorationSvg from '../../src/components/DecorationSvg';
import ChatMessage from '../../src/components/ChatMessage';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp?: string;
}

export default function ChatBotScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('Axel 2.5 Pro');
  const [alarmTime, setAlarmTime] = useState('09:00 AM');

  const messages: Message[] = [
    {
      id: 1,
      type: 'ai',
      content:
        'Learning User Interface (UI) and User Experience (UX) design is a journey into creating digital products that are not only visually appealing but also intuitive and enjoyable to use.',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = () => {
    console.log('Model selector pressed');
  };

  const handleEdit = () => {
    console.log('Edit pressed');
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleCamera = () => {
    console.log('Camera pressed');
  };

  const handleImage = () => {
    console.log('Image pressed');
  };

  const handleAttachment = () => {
    console.log('Attachment pressed');
  };

  const handleAlarmCancel = () => {
    console.log('Alarm cancelled');
  };

  const handleAlarmConfirm = () => {
    console.log('Alarm confirmed');
  };

  const handleCopy = (content: string) => {
    console.log('Copy message:', content);
    // Add clipboard functionality here
  };

  const handleRegenerate = (id: number) => {
    console.log('Regenerate message:', id);
    // Add regenerate functionality here
  };

  const handleLike = (id: number) => {
    console.log('Like message:', id);
    // Add like functionality here
  };

  const handleDislike = (id: number) => {
    console.log('Dislike message:', id);
    // Add dislike functionality here
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Decoration SVG */}
      <View style={styles.decorationContainer}>
        <DecorationSvg width={380} height={251} />
      </View>
      {/* Decoration SVG */}
      <View style={styles.decorationContainer2}>
        <DecorationSvg width={380} height={251} />
      </View>

      {/* Header */}
      <Header
        onBack={handleBack}
        onMore={handleEdit}
        centralSlot={
          <TouchableOpacity
            style={styles.modelSelector}
            onPress={handleModelSelect}
            activeOpacity={0.7}
          >
            <View style={styles.modelSelectorGradient} />
            <Text style={styles.modelText}>{selectedModel} </Text>
            <Ionicons name="chevron-down" size={11} color="white" />
          </TouchableOpacity>
        }
      />

      {/* Chat Area */}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Message with UI/UX Content */}
        <ChatMessage
          message={{
            id: 1,
            type: 'ai',
            content: `UI/UX design creates digital products that are both visually appealing and intuitive.

1. UX Design - The overall user experience
2. UI Design - The visual and interactive elements`,
            timestamp: '2:30 PM',
          }}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
          onLike={handleLike}
          onDislike={handleDislike}
        />

        {/* Date Divider */}
        <View style={styles.dateDivider}>
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dividerLine}
          />
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.dateLabelGradient}
          >
            <View style={styles.dateLabel}>
              <Text style={styles.dateLabelText}>Today</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dividerLine}
          />
        </View>

        {/* Audio Waveform Message */}
        <ChatMessage
          message={{
            id: 2,
            type: 'user',
            content: '🎵 Audio message',
            timestamp: '2:32 PM',
          }}
        />

        {/* AI Response */}
        <ChatMessage
          message={{
            id: 3,
            type: 'ai',
            content: `Great question! Always put the user first and think about how they'll interact with your design.

Key tips:
- Start with user research
- Create wireframes first
- Test with real users`,
            timestamp: '2:33 PM',
          }}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
          onLike={handleLike}
          onDislike={handleDislike}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Input Bar */}
      <BottomInputBar
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        onCamera={handleCamera}
        onImage={handleImage}
        onAttachment={handleAttachment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
  },
  decorationContainer: {
    position: 'absolute',
    bottom: -60,
    right: -90,
    zIndex: 0,
    opacity: 0.7,
    pointerEvents: 'none',
  },
  decorationContainer2: {
    position: 'absolute',
    top: -65,
    left: -65,
    zIndex: 0,
    opacity: 0.7,
    pointerEvents: 'none',
  },
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
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    paddingTop: 16,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dateLabelGradient: {
    borderRadius: 100,
    padding: 1, // This creates the border effect
  },
  dateLabel: {
    backgroundColor: '#212731',
    borderRadius: 99, // Slightly smaller than gradientBorder to create border effect
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  dateLabelText: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 20,
  },
});
