import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AIAssistantCard from '../../src/components/AIAssistantCard';
import FeatureCards from '../../src/components/FeatureCards';
import ContinueConversations from '../../src/components/ContinueConversations';
import UpgradeBadge from '../../src/components/UpgradeBadge';

export default function HomeScreen() {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  const handleChat = () => {
    console.log('Chat pressed');
  };

  const handleFeature = (feature: string) => {
    console.log(`${feature} pressed`);
  };

  const handleConversation = (id: number) => {
    console.log(`Conversation ${id} pressed`);
  };

  const features = [
    {
      id: 'smart-translation',
      title: 'Smart\nTranslation',
      icon: 'language' as const,
      onPress: () => handleFeature('Smart Translation'),
    },
    {
      id: 'image-generation',
      title: 'Image\nGeneration',
      icon: 'image-outline' as const,
      onPress: () => handleFeature('Image Generation'),
    },
  ];

  const conversations = [
    {
      id: 1,
      title: 'Brainstormin...',
      preview: '"Okay, how about a mobile app..."',
    },
    {
      id: 2,
      title: 'Brainstormin...',
      preview: '"Okay, how about a mobile app..."',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20 }}>
          <UpgradeBadge onPress={handleUpgrade} />
          <AIAssistantCard onChatPress={handleChat} />
          <FeatureCards features={features} />
        </View>
        <ContinueConversations
          conversations={conversations}
          onConversationPress={handleConversation}
        />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
  },
  upgradeButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
    zIndex: 10,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 80,
  },
  bottomSpacer: {
    height: 20,
  },
});
