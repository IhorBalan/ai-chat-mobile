import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { initializeAPIConfig } from '../src/config/api';

export default function RootLayout() {
  // Initialize API configuration on app startup
  useEffect(() => {
    initializeAPIConfig();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pricing" />
    </Stack>
  );
}
