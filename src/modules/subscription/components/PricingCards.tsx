import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Paper from '../../core/components/Paper';

type PlanType = 'monthly' | 'yearly';

interface PricingCardsProps {
  selectedPlan: PlanType;
  onPlanChange: (plan: PlanType) => void;
}

export default function PricingCards({
  selectedPlan,
  onPlanChange,
}: PricingCardsProps) {
  const features = [
    'Advanced AI model',
    'Unlimited messages',
    'Pro Image Generation',
  ];

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.7; // 70% of screen width
  const scrollViewRef = useRef<ScrollView>(null);

  // Animated values for opacity transitions
  const monthlyOpacity = useRef(new Animated.Value(1)).current;
  const yearlyOpacity = useRef(new Animated.Value(0.5)).current;

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(scrollX / (cardWidth + 16));

    if (cardIndex === 0) {
      onPlanChange('monthly');
    } else if (cardIndex === 1) {
      onPlanChange('yearly');
    }
  };

  // Scroll to the correct card when selectedPlan changes
  useEffect(() => {
    if (scrollViewRef.current) {
      const scrollToX = selectedPlan === 'monthly' ? 0 : cardWidth + 16;
      scrollViewRef.current.scrollTo({
        x: scrollToX,
        animated: true,
      });
    }
  }, [selectedPlan, cardWidth]);

  // Animate opacity transitions when selectedPlan changes
  useEffect(() => {
    const duration = 300; // 300ms transition

    if (selectedPlan === 'monthly') {
      Animated.parallel([
        Animated.timing(monthlyOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(yearlyOpacity, {
          toValue: 0.5,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(monthlyOpacity, {
          toValue: 0.5,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(yearlyOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedPlan, monthlyOpacity, yearlyOpacity]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth + 16} // Card width + gap
      decelerationRate="fast"
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
      onMomentumScrollEnd={handleScroll}
    >
      {/* Monthly Card */}
      <Animated.View style={{ opacity: monthlyOpacity }}>
        <Paper style={[styles.pricingCard, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Monthly Subscription</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceCurrency}>$</Text>
            <Text style={styles.priceAmount}>9.99</Text>
            <Text style={styles.pricePeriod}>/month</Text>
          </View>

          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Paper>
      </Animated.View>

      {/* Yearly Card */}
      <Animated.View style={{ opacity: yearlyOpacity }}>
        <Paper style={[styles.pricingCard, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Yearly Subscription</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceCurrency}>$</Text>
            <Text style={styles.priceAmount}>99</Text>
            <Text style={styles.pricePeriod}>/year</Text>
          </View>

          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#00A3FF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Paper>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 16,
  },
  scrollContent: {
    gap: 16,
  },
  pricingCard: {
    minHeight: 194,
  },
  cardTitle: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  priceCurrency: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  pricePeriod: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
});
