import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router';

export default function VoiceAIScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Axel 2.5 Pro');

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

        {/* Model Selector */}
        <TouchableOpacity
          style={styles.modelSelector}
          onPress={handleModelSelect}
          activeOpacity={0.7}
        >
          <View style={styles.modelSelectorGradient} />
          <Text style={styles.modelText}>{selectedModel} </Text>
          <Ionicons name="chevron-down" size={11} color="white" />
        </TouchableOpacity>

        {/* More Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMore}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-horizontal-circle-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <MaskedView
          maskElement={
            <Text style={styles.maskedText}>
              Hi Axel, can <Text style={styles.highlightedText}>you remind me to water the plants every Wednesday at 9 AM</Text> in the morning?
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
              Hi Axel, can <Text style={styles.highlightedText}>you remind me to water the plants every Wednesday at 9 AM</Text> in the morning?
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      {/* Voice Recording Controls */}
      <View style={styles.controlsContainer}>
        {/* Left Button - Scan */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleScan}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="scan-helper" size={24} color="white" />
        </TouchableOpacity>

        {/* Center Voice Button */}
        <View style={styles.voiceButtonContainer}>
          {/* Outer Ring 1 */}
          <View style={styles.voiceRingOuter}>
            {/* Outer Ring 2 */}
            <View style={styles.voiceRingInner}>
              {/* Main Voice Button */}
              <TouchableOpacity
                style={styles.voiceButtonWrapper}
                onPress={handleVoiceRecord}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#00A3FE', '#0385FE']}
                  style={styles.voiceButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <MaterialCommunityIcons
                    name={isRecording ? 'waveform' : 'microphone'}
                    size={42}
                    color="white"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Right Button - Keyboard */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleKeyboard}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbox-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

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
  backgroundGradients: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle: {
    position: 'absolute',
    width: 380,
    height: 251,
    borderRadius: 200,
    opacity: 0.2,
  },
  gradientTop: {
    backgroundColor: '#00A3FF',
    top: -67,
    left: -66,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  gradientBottom: {
    backgroundColor: '#00A3FF',
    bottom: -40,
    left: -5,
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
    marginTop: Platform.OS === 'ios' ? 60 : 28,
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
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#65C6FE',
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  modelSelectorGradient: {
    position: 'absolute',
    top: '50%',
    left: 33.5,
    width: 309,
    height: 281,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderRadius: 200,
  },
  modelText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginRight: 4,
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
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 37.5,
    marginBottom: 60,
    gap: 22,
  },
  sideButton: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButtonContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceRingOuter: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceRingInner: {
    width: 108,
    height: 108,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButtonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
