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
    console.log('Help Center pressed');
  };

  const handlePrivacyPolicy = () => {
    console.log('Privacy Policy pressed');
  };

  const handleSendFeedback = () => {
    console.log('Send Feedback pressed');
  };

  const handleLogout = () => {
    router.replace('/');
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

        {/* Title */}
        <Text style={styles.headerTitle}>My Profile</Text>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            {/* Placeholder for profile image */}
          </View>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleChangePhoto}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Rhadini Abigail</Text>
          <Text style={styles.userEmail}>abigailrha@axel.io</Text>
        </View>

        {/* Daily Quota Card */}
        <View style={styles.quotaCard}>
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
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuList}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleAccountSetting}
              activeOpacity={0.7}
            >
              <Ionicons name="shield-checkmark-outline" size={24} color="white" />
              <Text style={styles.menuText}>Account Setting</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSecurityInfo}
              activeOpacity={0.7}
            >
              <Ionicons name="lock-closed-outline" size={24} color="white" />
              <Text style={styles.menuText}>Security Information</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handlePaymentMethod}
              activeOpacity={0.7}
            >
              <Ionicons name="card-outline" size={24} color="white" />
              <Text style={styles.menuText}>Payment Method</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuList}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleHelpCenter}
              activeOpacity={0.7}
            >
              <Ionicons name="help-circle-outline" size={24} color="white" />
              <Text style={styles.menuText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handlePrivacyPolicy}
              activeOpacity={0.7}
            >
              <Ionicons name="document-text-outline" size={24} color="white" />
              <Text style={styles.menuText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSendFeedback}
              activeOpacity={0.7}
            >
              <Ionicons name="chatbox-outline" size={24} color="white" />
              <Text style={styles.menuText}>Send Feedback</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <View style={styles.menuList}>
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutButton]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={24} color="#FF4444" />
              <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Gradient Fade */}
      <LinearGradient
        colors={['rgba(8, 15, 26, 0)', '#080F1A']}
        style={styles.bottomGradient}
        pointerEvents="none"
      >
        <View style={styles.homeIndicator} />
      </LinearGradient>
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
    width: 544,
    height: 462,
    borderRadius: 300,
    opacity: 0.15,
  },
  gradientTop: {
    backgroundColor: '#00A3FF',
    top: -129,
    left: 118,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  gradientBottom: {
    backgroundColor: '#00A3FF',
    bottom: 0,
    left: 49,
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
    marginBottom: 24,
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
    backgroundColor: 'white',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#00A3FF',
    borderWidth: 1,
    borderColor: '#6DFFEE',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A3FF',
    borderWidth: 1,
    borderColor: '#6DFFEE',
    borderRadius: 100,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuList: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 12,
    height: 48,
    gap: 8,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.5,
  },
  logoutButton: {
    borderColor: '#FF4444',
  },
  logoutText: {
    color: '#FF4444',
  },
  bottomSpacer: {
    height: 60,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 7,
    paddingHorizontal: 16,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 16,
  },
});
