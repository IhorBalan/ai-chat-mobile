import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface UpgradeBadgeProps {
  onPress?: () => void;
}

export default function UpgradeBadge({ onPress }: UpgradeBadgeProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['rgba(63, 180, 254, 0.3)', 'rgba(13, 137, 254, 0.3)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Upgrade</Text>
          <Ionicons name="star" size={20} color="#00A3FE" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 25,
  },
  content: {
    backgroundColor: '#212731',
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
