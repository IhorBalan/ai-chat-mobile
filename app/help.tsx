import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/modules/core/components/Header';
import DecorationSvg from '../src/modules/core/components/DecorationSvg';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'How do I start a conversation?',
    answer:
      'Simply tap the chat icon on the home screen and start typing your message. You can also use the voice feature to speak your message.',
  },
  {
    id: 2,
    question: 'How do I use voice features?',
    answer:
      'Navigate to the Voice tab and tap the microphone button to start recording. The AI will transcribe your message and respond with voice.',
  },
  {
    id: 3,
    question: 'Can I change the AI voice?',
    answer:
      'Yes! Tap the 3-dot menu in the voice screen and select "Change AI voice" to choose from different voice options.',
  },
  {
    id: 4,
    question: 'How do I restart a conversation?',
    answer:
      'In the chat screen, tap the 3-dot menu and select "Restart chat" to clear the conversation history.',
  },
  {
    id: 5,
    question: 'Is my data secure?',
    answer:
      'Yes, we take data security seriously. All conversations are encrypted and handled according to our privacy policy.',
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // Not used on this screen
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
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
        centralSlot={<Text style={styles.headerTitle}>Help Center</Text>}
        showMore={false}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Find answers to commonly asked questions below
        </Text>

        {/* FAQ Items */}
        {faqItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqItem}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#00A3FF"
                />
              </View>
              {isExpanded && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Contact Support */}
        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => router.push('/feedback')}
          activeOpacity={0.7}
        >
          <View style={styles.supportButtonContent}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#00A3FF"
            />
            <View style={styles.supportButtonText}>
              <Text style={styles.supportButtonTitle}>Still need help?</Text>
              <Text style={styles.supportButtonSubtitle}>
                Contact our support team
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#00A3FF" />
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 40,
  },
  introText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    paddingRight: 12,
    lineHeight: 20,
  },
  faqAnswer: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 12,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 12,
    marginTop: 24,
    overflow: 'hidden',
  },
  supportButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  supportButtonText: {
    flex: 1,
  },
  supportButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  supportButtonSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});
