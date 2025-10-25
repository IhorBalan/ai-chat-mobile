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
import RadialGradient from 'react-native-radial-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';

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
        onMore={handleMore}
        centralSlot={<Text style={styles.headerTitle}>Select Plan</Text>}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Title */}
        <View style={styles.premiumTitleContainer}>
          <Text style={styles.premiumTitle}>Axel Premium </Text>
          <Ionicons name="diamond" size={18} color="#FFD700" />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Unlock more features and enjoy a better experience with Axel AI
          Premium
        </Text>

        {/* Central Logo */}
        <View style={styles.logoContainer}>
          {/* Outer Ring 1 - Absolute positioned */}
          <View style={styles.ring1}>
            <RadialGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.035)']}
              style={styles.voiceRingOuter}
              center={[70, 70]}
              radius={70}
            >
              <View style={styles.voiceRingOuter} />
            </RadialGradient>
          </View>

          {/* Outer Ring 2 - Absolute positioned */}
          <View style={styles.ring2}>
            <RadialGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']}
              style={styles.voiceRingInner}
              center={[54, 54]}
              radius={54}
            >
              <View style={styles.voiceRingInner} />
            </RadialGradient>
          </View>

          {/* Main Logo Button */}
          <TouchableOpacity
            style={styles.voiceButtonWrapper}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#64C4FD', '#02539C']}
              style={{
                flex: 1,
                padding: 1,
                borderRadius: 100,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <LinearGradient
                colors={['#00A3FE', '#0385FE']}
                style={styles.voiceButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Ionicons name="sparkles" size={42} color="white" />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
    position: 'relative',
  },
  ring1: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
    zIndex: 1,
    pointerEvents: 'none',
  },
  ring2: {
    position: 'absolute',
    top: -14,
    left: -14,
    width: 108,
    height: 108,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
    zIndex: 2,
    pointerEvents: 'none',
  },
  voiceRingOuter: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  voiceRingInner: {
    width: 108,
    height: 108,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  voiceButtonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  voiceButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
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
