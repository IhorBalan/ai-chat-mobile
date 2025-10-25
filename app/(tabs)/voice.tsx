import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter, useFocusEffect } from 'expo-router';
import VoiceHeader from '../../src/components/VoiceHeader';
import VoiceControls from '../../src/components/VoiceControls';
import DecorationSvg from '../../src/components/DecorationSvg';

export default function VoiceAIScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Axel 2.5 Pro');
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Trigger animation when screen comes into focus
      setShouldAnimate(true);

      // Reset animation state after a short delay to allow for re-triggering
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = () => {
    console.log('Model selector pressed');
  };

  const handleMore = () => {
    console.log('More options pressed');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    console.log('Voice recording toggled:', !isRecording);
  };

  const handleScan = () => {
    console.log('Scan pressed');
  };

  const handleKeyboard = () => {
    console.log('Keyboard pressed');
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
      <VoiceHeader
        selectedModel={selectedModel}
        onBack={handleBack}
        onModelSelect={handleModelSelect}
        onMore={handleMore}
      />

      {/* Text Content */}
      <View style={styles.textContainer}>
        {/* <MaskedView
          maskElement={
            <Text style={styles.maskedText}>
              Hi Axel, can{' '}
              <Text style={styles.highlightedText}>
                you remind me to water the plants every Wednesday at 9 AM
              </Text>{' '}
              in the morning?
            </Text>
          }
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.6, 1]}
            style={styles.gradientMask}
          >
            <Text style={[styles.maskedText, { opacity: 0 }]}>
              Hi Axel, can{' '}
              <Text style={styles.highlightedText}>
                you remind me to water the plants every Wednesday at 9 AM
              </Text>{' '}
              in the morning?
            </Text>
          </LinearGradient>
        </MaskedView> */}
      </View>

      {/* Voice Controls */}
      <VoiceControls
        isRecording={isRecording}
        onVoiceRecord={handleVoiceRecord}
        onScan={handleScan}
        onKeyboard={handleKeyboard}
        shouldAnimate={shouldAnimate}
      />
      {/* Home Indicator */}
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  maskedText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.5,
  },
  highlightedText: {
    color: 'white',
  },
  gradientMask: {
    flex: 1,
  },
});
