import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type PlanType = 'monthly' | 'yearly';

interface PlanToggleProps {
  selectedPlan: PlanType;
  onPlanChange: (plan: PlanType) => void;
}

export default function PlanToggle({
  selectedPlan,
  onPlanChange,
}: PlanToggleProps) {
  return (
    <View style={styles.planToggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedPlan === 'monthly' && styles.toggleButtonActive,
        ]}
        onPress={() => onPlanChange('monthly')}
        activeOpacity={0.8}
      >
        {selectedPlan === 'monthly' ? (
          <LinearGradient
            colors={['#01A0FE', '#0385FE']}
            style={styles.toggleButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.toggleTextActive}>Monthly</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.toggleTextInactive}>Monthly</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedPlan === 'yearly' && styles.toggleButtonActive,
        ]}
        onPress={() => onPlanChange('yearly')}
        activeOpacity={0.8}
      >
        {selectedPlan === 'yearly' ? (
          <LinearGradient
            colors={['#01A0FE', '#0385FE']}
            style={styles.toggleButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.toggleTextActive}>Yearly</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.toggleTextInactive}>Yearly</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  planToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 100,
    padding: 0,
    height: 40,
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    minWidth: 85,
  },
  toggleButtonActive: {
    overflow: 'hidden',
  },
  toggleButtonGradient: {
    paddingHorizontal: 20,
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTextActive: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.5,
  },
  toggleTextInactive: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
});
