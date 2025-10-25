import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface VoiceControlsProps {
  isRecording: boolean;
  onVoiceRecord: () => void;
  onScan: () => void;
  onKeyboard: () => void;
  shouldAnimate?: boolean;
}

export default function VoiceControls({
  isRecording,
  onVoiceRecord,
  onScan,
  onKeyboard,
  shouldAnimate = true,
}: VoiceControlsProps) {
  const centerButtonAnim = useRef(new Animated.Value(0)).current;
  const sideButtonsAnim = useRef(new Animated.Value(0)).current;
  const ring1Anim = useRef(new Animated.Value(1)).current;
  const ring2Anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (shouldAnimate) {
      // Reset animations to initial state
      centerButtonAnim.setValue(0);
      sideButtonsAnim.setValue(0);

      // First animate center button
      Animated.timing(centerButtonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        // Then animate side buttons after center button is done
        Animated.timing(sideButtonsAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [shouldAnimate]);

  // Animation for rings when recording
  useEffect(() => {
    if (isRecording) {
      // Create pulsing animation for both rings
      const createPulseAnimation = (animValue: Animated.Value) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: 1.2,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
      };

      // Start animations
      const ring1Pulse = createPulseAnimation(ring1Anim);
      const ring2Pulse = createPulseAnimation(ring2Anim);

      ring1Pulse.start();
      ring2Pulse.start();

      return () => {
        ring1Pulse.stop();
        ring2Pulse.stop();
      };
    } else {
      // Reset to normal size when not recording
      Animated.parallel([
        Animated.timing(ring1Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(ring2Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRecording]);

  return (
    <View style={styles.root}>
      {/* Left Button - Scan */}
      <Animated.View style={{ opacity: sideButtonsAnim }}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={onScan}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="scan-helper" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Center Voice Button */}
      <Animated.View
        style={[styles.voiceButtonContainer, { opacity: centerButtonAnim }]}
      >
        {/* Outer Ring 1 - Absolute positioned */}
        <Animated.View
          style={[
            styles.ring1,
            {
              transform: [{ scale: ring1Anim }],
            },
          ]}
        >
          <RadialGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.035)']}
            style={styles.voiceRingOuter}
            center={[70, 70]}
            radius={70}
          >
            <View style={styles.voiceRingOuter} />
          </RadialGradient>
        </Animated.View>

        {/* Outer Ring 2 - Absolute positioned */}
        <Animated.View
          style={[
            styles.ring2,
            {
              transform: [{ scale: ring2Anim }],
            },
          ]}
        >
          <RadialGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']}
            style={styles.voiceRingInner}
            center={[54, 54]}
            radius={54}
          >
            <View style={styles.voiceRingInner} />
          </RadialGradient>
        </Animated.View>

        {/* Main Voice Button - Not affected by ring animations */}
        <TouchableOpacity
          style={styles.voiceButtonWrapper}
          onPress={onVoiceRecord}
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
              <MaterialCommunityIcons
                name={isRecording ? 'waveform' : 'microphone'}
                size={42}
                color="white"
              />
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Right Button - Keyboard */}
      <Animated.View style={{ opacity: sideButtonsAnim }}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={onKeyboard}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbox-outline" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 80,
  },
  sideButton: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
