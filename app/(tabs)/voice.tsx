import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useFocusEffect } from 'expo-router';
import VoiceHeader from '../../src/components/VoiceHeader';
import VoiceControls from '../../src/components/VoiceControls';
import VoiceAnimation from '../../src/components/VoiceAnimation';
import DecorationSvg from '../../src/components/DecorationSvg';
import DropdownMenu from '../../src/components/DropdownMenu';
import VoiceModal, { VoiceOption } from '../../src/components/VoiceModal';
import { useVoiceManager } from '../../src/hooks/useVoiceManager';

export default function VoiceScreen() {
  const router = useRouter();
  const [selectedModel] = useState('ChatGPT');
  const [showMenu, setShowMenu] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>({
    id: 'default',
    name: 'Neutral Voice',
    description: 'Natural balanced tone',
    pitch: 1.0,
    rate: 1.0,
    icon: 'mic-outline',
  });

  // Use the voice manager hook
  const {
    isRecording,
    isSpeaking,
    transcribedText,
    shouldAnimate,
    setShouldAnimate,
    textFadeAnim,
    handleVoiceRecord,
    resetScreenState,
  } = useVoiceManager();

  useFocusEffect(
    React.useCallback(() => {
      // Trigger animation when screen comes into focus
      setShouldAnimate(true);

      // Reset animation state after a short delay to allow for re-triggering
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 100);

      // Start text fade-in animation after voice controls appear
      const textTimer = setTimeout(() => {
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 1200); // Delay after voice controls animation

      return () => {
        clearTimeout(timer);
        clearTimeout(textTimer);
        // Reset screen state when leaving
        resetScreenState();
      };
    }, [setShouldAnimate, textFadeAnim, resetScreenState])
  );

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = () => {
    console.log('Model selector pressed');
  };

  const handleMore = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleChangeVoiceResponder = () => {
    setShowVoiceModal(true);
  };

  const handleVoiceSelect = (voice: VoiceOption) => {
    setSelectedVoice(voice);
    console.log('Selected voice:', voice);
  };

  const handleAudioSettings = () => {
    console.log('Audio settings pressed');
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
        shouldAnimate={false}
      />

      {/* Dropdown Menu */}
      <DropdownMenu
        visible={showMenu}
        onClose={handleCloseMenu}
        items={[
          {
            icon: 'mic-outline',
            label: 'Change AI voice',
            onPress: handleChangeVoiceResponder,
          },
          {
            icon: 'settings-outline',
            label: 'Audio settings',
            onPress: handleAudioSettings,
          },
        ]}
        topPosition={Platform.OS === 'ios' ? 108 : 76}
        rightPosition={12}
      />

      {/* Voice Selection Modal */}
      <VoiceModal
        visible={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        selectedVoice={selectedVoice}
        onSelectVoice={handleVoiceSelect}
      />

      {/* Text Content */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textFadeAnim,
            transform: [
              {
                translateY: textFadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
            ],
          },
        ]}
      >
        {/* Voice Animation - Show when speaking */}
        <VoiceAnimation isVisible={isSpeaking} />

        <Text style={[styles.text, styles.highlightedText]}>
          {transcribedText}
          {!isRecording && !transcribedText && (
            <Text
              style={{
                opacity: 0.5,
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Tap the microphone to start recording...
            </Text>
          )}
        </Text>
      </Animated.View>

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.5,
  },
  highlightedText: {
    color: 'white',
  },
  aiResponseText: {
    color: '#64C4FD',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  gradientMask: {
    flex: 1,
  },
});
