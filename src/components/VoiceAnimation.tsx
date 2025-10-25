import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

interface VoiceAnimationProps {
  isVisible: boolean;
  width?: number;
  height?: number;
}

export default function VoiceAnimation({
  isVisible,
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height,
}: VoiceAnimationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        source={require('../assets/animations/voice-animation.json')}
        autoPlay
        loop
        style={[styles.animation, { width, height }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 'auto',
  },
  animation: {
    // Width and height will be set via style prop
  },
});
