import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';

export default function PrivacyScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // Not used on this screen
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
        centralSlot={<Text style={styles.headerTitle}>Privacy Policy</Text>}
        showMore={false}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>Last Updated: January 2024</Text>

        {/* Introduction */}
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.sectionText}>
          Welcome to our AI Chat Mobile application. We respect your privacy and
          are committed to protecting your personal data. This privacy policy
          explains how we collect, use, and safeguard your information when you
          use our service.
        </Text>

        {/* Data Collection */}
        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.sectionText}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={styles.listItem}>
          • Account information (email, username)
        </Text>
        <Text style={styles.listItem}>
          • Messages and conversations you create
        </Text>
        <Text style={styles.listItem}>
          • Voice recordings and transcriptions
        </Text>
        <Text style={styles.listItem}>• Usage data and analytics</Text>

        {/* Data Usage */}
        <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
        <Text style={styles.sectionText}>
          We use the collected information to:
        </Text>
        <Text style={styles.listItem}>
          • Provide and improve our AI chat services
        </Text>
        <Text style={styles.listItem}>
          • Process your voice and text interactions
        </Text>
        <Text style={styles.listItem}>
          • Send you important updates and notifications
        </Text>
        <Text style={styles.listItem}>
          • Analyze usage patterns to enhance user experience
        </Text>
        <Text style={styles.listItem}>• Ensure security and prevent fraud</Text>

        {/* Data Sharing */}
        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.sectionText}>
          We do not sell your personal information. We may share your data only:
        </Text>
        <Text style={styles.listItem}>
          • With AI service providers to process your requests
        </Text>
        <Text style={styles.listItem}>
          • When required by law or to protect our rights
        </Text>
        <Text style={styles.listItem}>• With your explicit consent</Text>

        {/* Security */}
        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.sectionText}>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no method of
          transmission over the internet is 100% secure.
        </Text>

        {/* Your Rights */}
        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.sectionText}>You have the right to:</Text>
        <Text style={styles.listItem}>• Access your personal data</Text>
        <Text style={styles.listItem}>• Correct inaccurate information</Text>
        <Text style={styles.listItem}>• Request deletion of your data</Text>
        <Text style={styles.listItem}>
          • Opt-out of certain data processing
        </Text>
        <Text style={styles.listItem}>
          • Export your data in a portable format
        </Text>

        {/* Children's Privacy */}
        <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
        <Text style={styles.sectionText}>
          Our service is not intended for children under 13 years of age. We do
          not knowingly collect personal information from children under 13. If
          you believe we have collected information from a child under 13,
          please contact us immediately.
        </Text>

        {/* Updates */}
        <Text style={styles.sectionTitle}>8. Policy Updates</Text>
        <Text style={styles.sectionText}>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the "Last Updated" date. You are advised to review this policy
          periodically.
        </Text>

        {/* Contact */}
        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions about this privacy policy, please contact us
          through the app's feedback feature or email us at
          privacy@aichatmobile.com
        </Text>

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
  lastUpdated: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00A3FF',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  sectionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 24,
    marginLeft: 8,
    marginBottom: 4,
  },
  bottomSpacer: {
    height: 20,
  },
});
