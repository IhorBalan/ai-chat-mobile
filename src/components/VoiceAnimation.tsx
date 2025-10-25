import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/voice-animation.json')}
        autoPlay
        loop
        style={[styles.animation, { width, height }]}
      />
    </View>
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
