import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomTextInput from '../src/components/CustomTextInput';
import PasswordInput from '../src/components/PasswordInput';
import Button from '../src/components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('abhixyzxyz@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = () => {
    // Navigate to home screen (tabs)
    router.replace('/(tabs)');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
    console.log('Apple login pressed');
    router.replace('/(tabs)');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login pressed');
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    // TODO: Navigate to register screen
    console.log('Register pressed');
  };

  return (
    <View style={styles.container}>
      {/* Background gradient shapes - outside SafeAreaView */}
      <View style={styles.backgroundShapesContainer}>
        <View style={[styles.gradientCircle1, styles.blurEffect]} />
        <View style={[styles.gradientCircle2, styles.blurEffect]} />
      </View>

      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={['top', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <StatusBar style="light" />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                Sign in to your{'\n'}Account
              </Text>
              <Text style={styles.headerSubtitle}>
                Please enter your credentials to continue.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password Input */}
              <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
              />
            </View>

            {/* Login Button */}
            <Button
              title="Login"
              onPress={handleLogin}
              variant="secondary"
              style={styles.loginButtonContainer}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleAppleLogin}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-apple" size={28} color="white" />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-google" size={28} color="white" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Don't have account?{' '}
                <Text style={styles.registerLink} onPress={handleRegister}>
                  Register
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
  },
  safeAreaContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  backgroundShapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gradientCircle1: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    borderRadius: 1000,
    backgroundColor: 'rgba(51, 181, 255, 0.1)',
    left: (Dimensions.get('window').width - 1000) / 2,
    top: -820,
  },
  gradientCircle2: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    borderRadius: 1000,
    backgroundColor: 'rgba(0, 163, 255, 0.2)',
    left: (Dimensions.get('window').width - 1000) / 2,
    top: -750,
  },
  blurEffect: {
    shadowColor: '#00A0FE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FCFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
    maxWidth: 220,
  },
  formContainer: {
    gap: 24,
    marginBottom: 24,
  },
  loginButtonContainer: {
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 11,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    fontSize: 15,
    color: '#FCFFFF',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FCFFFF',
    letterSpacing: 0.8,
  },
  registerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  registerText: {
    fontSize: 15,
    color: '#FCFFFF',
    textAlign: 'center',
  },
  registerLink: {
    color: '#0389FE',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
