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
import Header from '../../src/components/Header';
import DecorationSvg from '../../src/components/DecorationSvg';
import Paper from '../../src/components/Paper';
import MenuItem from '../../src/components/MenuItem';

export default function ProfileScreen() {
  const router = useRouter();
  const dailyQuotaUsed = 7;
  const dailyQuotaTotal = 10;
  const quotaPercentage = (dailyQuotaUsed / dailyQuotaTotal) * 100;

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    console.log('Edit profile pressed');
  };

  const handleChangePhoto = () => {
    console.log('Change photo pressed');
  };

  const handleAccountSetting = () => {
    console.log('Account Setting pressed');
  };

  const handleSecurityInfo = () => {
    console.log('Security Information pressed');
  };

  const handlePaymentMethod = () => {
    console.log('Payment Method pressed');
  };

  const handleHelpCenter = () => {
    router.push('/help');
  };

  const handlePrivacyPolicy = () => {
    router.push('/privacy');
  };

  const handleSendFeedback = () => {
    router.push('/feedback');
  };

  const handleLogout = () => {
    router.replace('/');
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
        centralSlot={<Text style={styles.headerTitle}>My Profile</Text>}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 10, alignItems: 'center', paddingTop: 30 }}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <LinearGradient
              colors={['#00A0FE', '#0385FE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profilePicture}
            >
              <Ionicons name="person" size={56} color="white" />
            </LinearGradient>
            <TouchableOpacity onPress={handleChangePhoto} activeOpacity={0.8}>
              <LinearGradient
                colors={['#00A0FE', '#0385FE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cameraButton}
              >
                <Ionicons name="camera" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>Rhadini Abigail</Text>
            <Text style={styles.userEmail}>abigailrha@axel.io</Text>
          </View>
        </View>

        {/* Daily Quota Card */}
        <Paper style={styles.quotaCard}>
          <View style={styles.quotaHeader}>
            <Text style={styles.quotaLabel}>Daily Quota</Text>
            <Text style={styles.quotaCount}>
              {dailyQuotaUsed}/{dailyQuotaTotal}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${quotaPercentage}%` }]}
            />
          </View>
        </Paper>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuList}>
            <MenuItem
              icon="shield-checkmark-outline"
              text="Account Setting"
              onPress={handleAccountSetting}
            />

            <MenuItem
              icon="lock-closed-outline"
              text="Security Information"
              onPress={handleSecurityInfo}
            />

            <MenuItem
              icon="card-outline"
              text="Payment Method"
              onPress={handlePaymentMethod}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuList}>
            <MenuItem
              icon="help-circle-outline"
              text="Help Center"
              onPress={handleHelpCenter}
            />

            <MenuItem
              icon="document-text-outline"
              text="Privacy Policy"
              onPress={handlePrivacyPolicy}
            />

            <MenuItem
              icon="chatbox-outline"
              text="Send Feedback"
              onPress={handleSendFeedback}
            />
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <View style={styles.menuList}>
            <MenuItem
              icon="log-out-outline"
              text="Logout"
              onPress={handleLogout}
              showChevron={false}
            />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
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
    left: -5,
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
    alignItems: 'center',
    gap: 30,
  },
  profilePictureContainer: {
    width: 112,
    height: 112,
    marginBottom: 24,
    position: 'relative',
  },
  profilePicture: {
    width: 112,
    height: 112,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: '#00A0FE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userInfoContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  userName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  quotaCard: {
    width: '100%',
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  quotaLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  quotaCount: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A3FF',
    borderRadius: 100,
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  menuList: {
    gap: 8,
  },
  bottomSpacer: {
    height: 60,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 16,
    marginTop: 16,
  },
});
