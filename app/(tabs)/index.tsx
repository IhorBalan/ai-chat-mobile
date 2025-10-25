import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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


  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Upgrade Button */}
      <TouchableOpacity
        style={styles.upgradeButton}
        onPress={handleUpgrade}
        activeOpacity={0.7}
      >
        <Text style={styles.upgradeText}>Upgrade</Text>
        <Ionicons name="crown" size={14} color="#FFD700" />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Assistant Card */}
        <LinearGradient
          colors={['#00A3FF', '#0385FE']}
          style={styles.mainCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Background Gradient Circle */}
          <View style={styles.mainCardGradientCircle} />

          <Text style={styles.aiAssistantLabel}>AI Assistant</Text>
          <Text style={styles.mainCardTitle}>
            What Can I Do For{'\n'}You Today?
          </Text>

          <TouchableOpacity
            style={styles.chatButton}
            onPress={handleChat}
            activeOpacity={0.8}
          >
            <Text style={styles.chatButtonText}>Chat</Text>
            <Ionicons name="chevron-forward" size={18} color="#111111" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Feature Cards */}
        <View style={styles.featureCardsContainer}>
          {/* Smart Translation Card */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => handleFeature('Smart Translation')}
            activeOpacity={0.7}
          >
            <View style={styles.featureIconContainer}>
              <Ionicons name="language" size={24} color="white" />
            </View>
            <View style={styles.featureCardContent}>
              <Text style={styles.featureCardTitle}>
                Smart{'\n'}Translation
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="white"
                style={styles.featureCardArrow}
              />
            </View>
          </TouchableOpacity>

          {/* Image Generation Card */}
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => handleFeature('Image Generation')}
            activeOpacity={0.7}
          >
            <View style={styles.featureIconContainer}>
              <Ionicons name="image-outline" size={24} color="white" />
            </View>
            <View style={styles.featureCardContent}>
              <Text style={styles.featureCardTitle}>
                Image{'\n'}Generation
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="white"
                style={styles.featureCardArrow}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Conversations */}
        <View style={styles.conversationsContainer}>
          <Text style={styles.conversationsTitle}>Continue Conversations</Text>

          {[1, 2, 3].map((id) => (
            <TouchableOpacity
              key={id}
              style={styles.conversationCard}
              onPress={() => handleConversation(id)}
              activeOpacity={0.7}
            >
              <Text style={styles.conversationTitle}>Brainstormin...</Text>
              <Text style={styles.conversationPreview}>
                "Okay, how about a mobile app..."
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
  },
  upgradeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 18,
    right: 20,
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
    paddingBottom: 20,
  },
  mainCard: {
    height: 187,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  mainCardGradientCircle: {
    position: 'absolute',
    width: 723,
    height: 413,
    borderRadius: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    left: -282,
    top: -292,
  },
  aiAssistantLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginBottom: 9,
  },
  mainCardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    lineHeight: 34,
    marginBottom: 30,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    gap: 10,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111111',
    letterSpacing: 0.5,
  },
  featureCardsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  featureCard: {
    flex: 1,
    height: 142,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 16,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#00A3FF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  featureCardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  featureCardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
    lineHeight: 21,
  },
  featureCardArrow: {
    marginLeft: 8,
  },
  conversationsContainer: {
    gap: 20,
  },
  conversationsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  conversationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#343943',
    borderRadius: 20,
    padding: 16,
    gap: 4,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
    lineHeight: 26,
  },
  conversationPreview: {
    fontSize: 12,
    color: '#D4D4D4',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 20,
  },
});
