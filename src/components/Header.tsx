import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  onBack: () => void;
  onMore: () => void;
  showBack?: boolean;
  showMore?: boolean;
  centralSlot?: React.ReactNode;
  shouldAnimate?: boolean;
}

export default function Header({
  onBack,
  onMore,
  showBack = true,
  showMore = true,
  centralSlot,
  shouldAnimate = false,
}: HeaderProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      if (shouldAnimate) {
        // Reset animation value
        fadeAnim.setValue(0);

        // Start animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        fadeAnim.setValue(1);
      }
    }, [shouldAnimate, fadeAnim])
  );
  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        },
      ]}
    >
      {/* Back Button */}
      {showBack && (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
      )}

      {/* Spacer when back button is hidden */}
      {!showBack && <View style={styles.headerButton} />}

      {/* Central Slot */}
      {centralSlot && <View style={styles.centralSlot}>{centralSlot}</View>}

      {/* More Button */}
      {showMore && (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onMore}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      )}

      {/* Spacer when more button is hidden */}
      {!showMore && <View style={styles.headerButton} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
