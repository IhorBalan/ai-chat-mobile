import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type PlanType = 'monthly' | 'yearly';

export default function PricingPlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    console.log('More options pressed');
  };

  const handleContinue = () => {
    console.log('Continue with plan:', selectedPlan);
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
        <Text style={styles.headerTitle}>Select Plan</Text>

        {/* More Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMore}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-horizontal-circle-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Title */}
        <View style={styles.premiumTitleContainer}>
          <Text style={styles.premiumTitle}>Axel Premium </Text>
          <Ionicons name="crown" size={18} color="#FFD700" />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Unlock more features and enjoy a better experience with Axel AI
          Premium
        </Text>

        {/* Central Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRingOuter}>
            <View style={styles.logoRingInner}>
              <LinearGradient
                colors={['#019EFE', '#0485FE']}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Ionicons name="sparkles" size={40} color="white" />
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Plan Toggle */}
        <View style={styles.planToggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedPlan === 'monthly' && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.8}
          >
            {selectedPlan === 'monthly' ? (
              <LinearGradient
                colors={['#01A0FE', '#0385FE']}
                style={styles.toggleButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={styles.toggleTextActive}>Monthly</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.toggleTextInactive}>Monthly</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedPlan === 'yearly' && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedPlan('yearly')}
            activeOpacity={0.8}
          >
            {selectedPlan === 'yearly' ? (
              <LinearGradient
                colors={['#01A0FE', '#0385FE']}
                style={styles.toggleButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={styles.toggleTextActive}>Yearly</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.toggleTextInactive}>Yearly</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Plan Info */}
        <Text style={styles.planInfo}>Paid Monthly, Cancel Anytime.</Text>

        {/* Pricing Cards */}
        <View style={styles.pricingCardsContainer}>
          {/* Monthly Card */}
          <View
            style={[
              styles.pricingCard,
              selectedPlan !== 'monthly' && styles.pricingCardInactive,
            ]}
          >
            <Text style={styles.cardTitle}>Monthly Subscription</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceCurrency}>$</Text>
              <Text style={styles.priceAmount}>9.99</Text>
              <Text style={styles.pricePeriod}>/month</Text>
            </View>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Advanced AI model</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Unlimited messages</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Pro Image Generation</Text>
              </View>
            </View>
          </View>

          {/* Yearly Card */}
          <View
            style={[
              styles.pricingCard,
              selectedPlan !== 'yearly' && styles.pricingCardInactive,
            ]}
          >
            <Text style={styles.cardTitle}>Yearly Subscription</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceCurrency}>$</Text>
              <Text style={styles.priceAmount}>99</Text>
              <Text style={styles.pricePeriod}>/year</Text>
            </View>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Advanced AI model</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Unlimited messages</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>Pro Image Generation</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.continueButtonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#00A3FF', '#0385FE']}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>

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
    width: 544,
    height: 462,
    borderRadius: 300,
    opacity: 0.15,
  },
  gradientTop: {
    backgroundColor: '#00A3FF',
    top: -129,
    right: -93,
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
    marginBottom: 16,
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
  premiumTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00A3FF',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#D4D4D4',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 17,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoRingOuter: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRingInner: {
    width: 108,
    height: 108,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#6DFFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    padding: 0,
    marginBottom: 8,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    minWidth: 85,
  },
  toggleButtonActive: {
    overflow: 'hidden',
  },
  toggleButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6DFFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTextActive: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.5,
  },
  toggleTextInactive: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  planInfo: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  pricingCardsContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    marginBottom: 16,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 16,
    minHeight: 194,
  },
  pricingCardInactive: {
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  priceCurrency: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  pricePeriod: {
    fontSize: 12,
    color: '#D4D4D4',
    marginLeft: 4,
    marginBottom: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 20,
  },
  continueButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
  },
  continueButton: {
    height: 52,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 8,
  },
  continueButtonGradient: {
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6DFFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
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
