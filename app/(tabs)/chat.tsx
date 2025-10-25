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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Gradient Effects */}
      <View style={styles.backgroundGradients}>
        <View style={[styles.gradientCircle, styles.gradientTop]} />
        <View style={[styles.gradientCircle, styles.gradientBottom]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        {/* Model Selector */}
        <TouchableOpacity
          style={styles.modelSelector}
          onPress={handleModelSelect}
          activeOpacity={0.7}
        >
          <Text style={styles.modelText}>{selectedModel} </Text>
          <Ionicons name="chevron-down" size={11} color="white" />
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Message with UI/UX Content */}
        <View style={styles.aiMessageContainer}>
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={18} color="white" />
          </View>
          <View style={styles.messageContent}>
            <Text style={styles.aiMessageText}>
              Learning User Interface (UI) and User Experience (UX) design is a
              journey into creating digital products that are not only visually
              appealing but also intuitive and enjoyable to use.
            </Text>

            {/* UX Design Section */}
            <View style={styles.listSection}>
              <View style={styles.listHeader}>
                <Text style={styles.listNumber}>1.</Text>
                <Text style={styles.listTitle}>
                  User Experience (UX) Design
                </Text>
              </View>
              <Text style={styles.listContent}>
                is the all-encompassing experience a user has with a product or
                service. It's about making a product functional, reliable,
                usable, and pleasurable.
              </Text>
            </View>

            {/* UI Design Section */}
            <View style={styles.listSection}>
              <View style={styles.listHeader}>
                <Text style={styles.listNumber}>2.</Text>
                <Text style={styles.listTitle}>
                  User Interface (UI) Design
                </Text>
              </View>
              <Text style={styles.listContent}>
                on the other hand, is the visual and interactive part of the
                product. It's what the user sees and interacts with, including
                screens, buttons, icons, and typography.
              </Text>
            </View>
          </View>
        </View>

        {/* Date Divider */}
        <View style={styles.dateDivider}>
          <View style={styles.dividerLine} />
          <View style={styles.dateLabel}>
            <Text style={styles.dateLabelText}>Today</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>

        {/* Audio Waveform Message */}
        <View style={styles.userMessageContainer}>
          <View style={styles.audioWaveform}>
            {/* Waveform Bars */}
            <View style={styles.waveformBars}>
              {Array.from({ length: 30 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height: Math.random() * 30 + 10,
                      backgroundColor:
                        index < 15
                          ? 'white'
                          : 'rgba(255, 255, 255, 0.3)',
                    },
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Response with Alarm */}
        <View style={styles.aiMessageContainer}>
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={18} color="white" />
          </View>
          <View style={styles.messageContent}>
            <Text style={styles.aiMessageText}>
              Sure, here the alarm set to 9 AM,
            </Text>

            {/* Alarm Card */}
            <View style={styles.alarmCard}>
              <Text style={styles.alarmLabel}>Alarm</Text>
              <View style={styles.alarmTimeRow}>
                <Text style={styles.alarmTime}>{alarmTime}</Text>
                <Ionicons name="chevron-down" size={24} color="white" />
              </View>
              <View style={styles.alarmActions}>
                <TouchableOpacity style={styles.alarmIcon}>
                  <Ionicons name="alarm-outline" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.alarmButton}
                  onPress={handleAlarmCancel}
                >
                  <Text style={styles.alarmButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.alarmButton}
                  onPress={handleAlarmConfirm}
                >
                  <Text style={styles.alarmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Input Bar */}
      <View style={styles.inputBarContainer}>
        <View style={styles.inputBar}>
          {/* Left Icons */}
          <View style={styles.inputIcons}>
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={handleCamera}
            >
              <Ionicons name="camera-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={handleImage}
            >
              <Ionicons name="image-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={handleAttachment}
            >
              <Ionicons name="attach-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Text Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type something.."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
            >
              <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
  },
  backgroundGradients: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle: {
    position: 'absolute',
    width: 380,
    height: 251,
    borderRadius: 200,
    opacity: 0.2,
  },
  gradientTop: {
    backgroundColor: '#00A3FF',
    top: 27,
    right: -93,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  gradientBottom: {
    backgroundColor: '#00A3FF',
    bottom: -20,
    right: -107,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: Platform.OS === 'ios' ? 60 : 24,
    marginBottom: 8,
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
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 4,
  },
  modelText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginRight: 4,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  aiMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 8,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00A3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContent: {
    flex: 1,
    gap: 16,
  },
  aiMessageText: {
    fontSize: 14,
    color: '#D4D4D4',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  listSection: {
    gap: 8,
  },
  listHeader: {
    flexDirection: 'row',
    gap: 4,
  },
  listNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    width: 20,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    flex: 1,
  },
  listContent: {
    fontSize: 14,
    color: '#D4D4D4',
    lineHeight: 20,
    letterSpacing: 0.5,
    paddingLeft: 24,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  dateLabelText: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  audioWaveform: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    maxWidth: 284,
  },
  waveformBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 40,
  },
  waveformBar: {
    width: 2,
    borderRadius: 4,
  },
  playButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  alarmLabel: {
    fontSize: 16,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  alarmTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alarmTime: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  alarmActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alarmIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  alarmButtonText: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 20,
  },
  inputBarContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  inputIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  inputIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 120,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.5,
  },
  sendButton: {
    width: 32,
    height: 32,
    backgroundColor: '#00A3FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
  },
});
