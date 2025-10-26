import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function FeedbackScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in both subject and message fields.');
      return;
    }

    // TODO: Implement actual feedback sending logic
    console.log('Sending feedback:', { subject, message, email });

    // Show success message
    Alert.alert(
      'Thank You!',
      'Your feedback has been sent. We appreciate your input!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleMore = () => {
    // Not used on this screen
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <StatusBar style="light" />

      {/* Decoration SVG */}
      <View style={styles.decorationContainer}>
        <DecorationSvg width={380} height={251} />
      </View>
      <View style={styles.decorationContainer2}>
        <DecorationSvg width={380} height={251} />
      </View>

      {/* Header */}
      <Header
        onBack={handleBack}
        onMore={handleMore}
        centralSlot={<Text style={styles.headerTitle}>Send Feedback</Text>}
        showMore={false}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.instructionText}>
            We'd love to hear your thoughts, suggestions, or report any issues
            you've encountered.
          </Text>

          {/* Subject Input */}
          <Input
            label="Subject *"
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
            maxLength={100}
          />

          {/* Message Input */}
          <Input
            label="Message *"
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your feedback or report an issue..."
            multiline
            numberOfLines={8}
            maxLength={1000}
          />

          {/* Email Input (Optional) */}
          <Input
            label="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            helperText="We'll only use this to follow up if needed"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Send Feedback"
          onPress={handleSend}
          style={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  content: {
    gap: 24,
  },
  instructionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
  },
  sendButton: {
    marginBottom: 8,
  },
});
