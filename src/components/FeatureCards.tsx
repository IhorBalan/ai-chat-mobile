import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Paper from './Paper';

interface FeatureCard {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface FeatureCardsProps {
  features: FeatureCard[];
}

export default function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <View style={styles.container}>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={styles.cardWrapper}
          onPress={feature.onPress}
          activeOpacity={0.7}
        >
          <Paper style={styles.paper}>
            <View style={styles.iconShadowWrapper}>
              <LinearGradient
                colors={['#4ABBFB', '#0898EA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradientBorder}
              >
                <View style={styles.icon}>
                  <Ionicons name={feature.icon} size={24} color="white" />
                </View>
              </LinearGradient>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{feature.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </View>
          </Paper>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 0,
    marginBottom: 30,
  },
  cardWrapper: {
    flex: 1,
  },
  paper: {
    flex: 1,
    width: '100%',
    gap: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconShadowWrapper: {
    alignSelf: 'flex-start',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  iconGradientBorder: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    padding: 1, // This creates the border effect
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 11, // Slightly smaller than gradientBorder to create border effect
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A3FF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});
