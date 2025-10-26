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
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';

interface SecuritySection {
  id: number;
  title: string;
  icon: string;
  content: string[];
}

const securitySections: SecuritySection[] = [
  {
    id: 1,
    title: 'Two-Factor Authentication',
    icon: 'shield-checkmark-outline',
    content: [
      'Enable 2FA for an additional layer of security',
      'Receive verification codes via SMS or authenticator app',
      'Required for sensitive account changes',
    ],
  },
  {
    id: 2,
    title: 'Password Security',
    icon: 'lock-closed-outline',
    content: [
      'Use a strong, unique password',
      'Include uppercase, lowercase, numbers, and symbols',
      'Change your password regularly',
      'Never share your password with anyone',
    ],
  },
  {
    id: 3,
    title: 'Session Management',
    icon: 'desktop-outline',
    content: [
      'View all active sessions from your account',
      'Log out from devices you no longer use',
      'Sessions expire after 30 days of inactivity',
      'You will be notified of new device logins',
    ],
  },
  {
    id: 4,
    title: 'Data Encryption',
    icon: 'key-outline',
    content: [
      'All data is encrypted in transit using TLS 1.3',
      'Data at rest is encrypted using AES-256',
      'Your conversations are end-to-end encrypted',
      'Voice recordings are encrypted before storage',
    ],
  },
];

export default function SecurityScreen() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = React.useState<number[]>([]);

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // Not used on this screen
  };

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
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
        centralSlot={
          <Text style={styles.headerTitle}>Security Information</Text>
        }
        showMore={false}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Learn how we protect your account and data
        </Text>

        {/* Security Sections */}
        {securitySections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          return (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionItem}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <Ionicons
                    name={section.icon as any}
                    size={24}
                    color="#00A3FF"
                  />
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#00A3FF"
                />
              </View>
              {isExpanded && (
                <View style={styles.sectionContent}>
                  {section.content.map((item, index) => (
                    <View key={index} style={styles.bulletPoint}>
                      <Text style={styles.bulletText}>• {item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Security Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Security Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>
              ✓ Always log out from shared devices
            </Text>
            <Text style={styles.tipItem}>
              ✓ Review your account activity regularly
            </Text>
            <Text style={styles.tipItem}>
              ✓ Enable notifications for account changes
            </Text>
            <Text style={styles.tipItem}>
              ✓ Keep your app updated to the latest version
            </Text>
          </View>
        </View>

        {/* Bottom spacing */}
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
  sectionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  sectionContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  bulletPoint: {
    marginBottom: 6,
  },
  bulletText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});
