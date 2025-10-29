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
import Header from '../src/modules/core/components/Header';
import DecorationSvg from '../src/modules/core/components/DecorationSvg';
import PlanToggle from '../src/modules/subscription/components/PlanToggle';
import PricingCards from '../src/modules/subscription/components/PricingCards';
import Button from '../src/modules/core/components/Button';
import IconSvg from '../src/assets/icon.svg';

type PlanType = 'monthly' | 'yearly';

export default function PricingPlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');
  const [isRecording, setIsRecording] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    console.log('More options pressed');
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    console.log('Recording:', !isRecording);
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
          <Text style={styles.premiumTitle}>Chat AI Premium </Text>
          <Ionicons name="star" size={18} color="#00A3FF" />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Unlock more features and enjoy a better experience with Chat AI
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
            onPress={handleRecording}
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
                colors={['#FFFFFF', '#F0F0F0']}
                style={styles.voiceButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <IconSvg width={48} height={48} />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Plan Toggle */}
        <PlanToggle
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />

        {/* Plan Info */}
        <Text style={styles.planInfo}>Paid Monthly, Cancel Anytime.</Text>

        {/* Pricing Cards */}
        <PricingCards
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.continueButtonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          style={styles.continueButton}
        />
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
    paddingTop: 30,
    alignItems: 'center',
  },
  premiumTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
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
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 62,
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
  planInfo: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
    marginBottom: 30,
    marginTop: 10,
  },
  bottomSpacer: {
    height: 20,
  },
  continueButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
  },
  continueButton: {
    marginBottom: 8,
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
