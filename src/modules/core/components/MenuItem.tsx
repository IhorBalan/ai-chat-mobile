import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface MenuItemProps {
  icon: string;
  text: string;
  onPress: () => void;
  showChevron?: boolean;
}

export default function MenuItem({
  icon,
  text,
  onPress,
  showChevron = true,
}: MenuItemProps) {
  return (
    <View style={styles.menuItemShadow}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menuItemGradient}
      >
        <TouchableOpacity
          style={styles.menuItem}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Ionicons name={icon as any} size={24} color="white" />
          <Text style={styles.menuText}>{text}</Text>
          {showChevron && (
            <Ionicons name="chevron-forward" size={24} color="white" />
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  menuItemGradient: {
    borderRadius: 20,
    padding: 1, // This creates the border effect
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212731',
    borderRadius: 19, // Slightly smaller than gradientBorder to create border effect
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 12,
    height: 48,
    gap: 8,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.5,
  },
});
