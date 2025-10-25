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
        {/* Outer Ring 1 */}
        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            borderRadius: 100,
          }}
        >
          <RadialGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.035)']}
            style={styles.voiceRingOuter}
            center={[70, 70]}
            radius={70}
          >
            {/* Outer Ring 2 */}
            <View
              style={{
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: 100,
              }}
            >
              <RadialGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']}
                style={styles.voiceRingInner}
                center={[54, 54]}
                radius={54}
              >
                {/* Main Voice Button */}
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
                {/* </View> */}
              </RadialGradient>
            </View>
          </RadialGradient>
        </View>
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
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
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
