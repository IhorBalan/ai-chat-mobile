import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/modules/core/components/Header';
import DecorationSvg from '../src/modules/core/components/DecorationSvg';
import Paper from '../src/modules/core/components/Paper';
import Button from '../src/modules/core/components/Button';

interface PaymentMethod {
  id: number;
  type: 'card' | 'apple' | 'google';
  last4: string;
  brand?: string;
  expiry?: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'card',
    last4: '8888',
    brand: 'Mastercard',
    expiry: '08/26',
    isDefault: false,
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] =
    React.useState(mockPaymentMethods);

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // Not used on this screen
  };

  const handleAddPaymentMethod = () => {
    console.log('Add payment method pressed');
    // TODO: Navigate to add payment method screen
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    console.log('Set default payment method:', id);
  };

  const handleDeleteMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    console.log('Delete payment method:', id);
  };

  const getCardIcon = (type: string) => {
    if (type === 'apple') return 'logo-apple';
    if (type === 'google') return 'logo-google';
    return 'card-outline';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Decoration SVG */}
      <View style={styles.decorationContainer}>
        <DecorationSvg width={380} height={251} />
      </View>
      <View style={styles.decorationContainer2}>
        <DecorationSvg width={380} height={251} />
      </View>

      {/* Header */}
      <Header
        onBack={handleBack}
        onMore={handleMore}
        centralSlot={<Text style={styles.headerTitle}>Payment Methods</Text>}
        showMore={false}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Manage your payment methods for seamless billing
        </Text>

        {/* Payment Methods List */}
        <View style={{ gap: 12 }}>
          {paymentMethods.map((method) => (
            <Paper key={method.id} style={styles.paymentCardWrapper}>
              <View style={styles.paymentCardHeader}>
                <View style={styles.paymentCardInfo}>
                  <Ionicons
                    name={getCardIcon(method.type) as any}
                    size={24}
                    color="#00A3FF"
                  />
                  <View style={styles.paymentCardDetails}>
                    <View style={styles.paymentCardTitleRow}>
                      <Text style={styles.paymentCardTitle}>
                        {method.brand || 'Card'} •••• {method.last4}
                      </Text>
                      {method.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>Default</Text>
                        </View>
                      )}
                    </View>
                    {method.expiry && (
                      <Text style={styles.paymentCardExpiry}>
                        Expires {method.expiry}
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMethod(method.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>

              {/* {!method.isDefault && (
                <TouchableOpacity
                  style={styles.setDefaultButton}
                  onPress={() => handleSetDefault(method.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.setDefaultButtonText}>
                    Set as default
                  </Text>
                </TouchableOpacity>
              )} */}
            </Paper>
          ))}
        </View>

        {/* Add Payment Method Button */}
        <Button
          title="Add Payment Method"
          onPress={handleAddPaymentMethod}
          variant="outlined"
          style={{ marginTop: 30 }}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080F1A',
    flex: 1,
  },
  decorationContainer: {
    position: 'absolute',
    bottom: -60,
    right: -90,
    zIndex: 0,
    opacity: 0.7,
    pointerEvents: 'none',
  },
  decorationContainer2: {
    position: 'absolute',
    top: -65,
    left: -65,
    zIndex: 0,
    opacity: 0.7,
    pointerEvents: 'none',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  introText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentCardWrapper: {
    gap: 12,
  },
  paymentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  paymentCardDetails: {
    flex: 1,
  },
  paymentCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  paymentCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  defaultBadge: {
    backgroundColor: 'rgba(0, 163, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00A3FF',
  },
  paymentCardExpiry: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  deleteButton: {
    padding: 8,
  },
  setDefaultButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  setDefaultButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00A3FF',
  },
  bottomSpacer: {
    height: 20,
  },
});
