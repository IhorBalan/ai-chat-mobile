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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('abhixyzxyz@gmail.com');
  const [password, setPassword] = useState('password123');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Background gradient shapes */}
          <View style={styles.backgroundShapesContainer}>
            <View style={[styles.gradientCircle1, styles.blurEffect]} />
            <View style={[styles.gradientCircle2, styles.blurEffect]} />
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Sign in to your{'\n'}Account</Text>
            <Text style={styles.headerSubtitle}>
              Please enter your credentials to continue.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.inputUnderline} />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordHeader}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry={!passwordVisible}
              />
              <View style={styles.inputUnderline} />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButtonContainer}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#00A0FE', '#0385FE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
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
    height: 400,
    overflow: 'hidden',
  },
  gradientCircle1: {
    position: 'absolute',
    width: 957,
    height: 647,
    borderRadius: 500,
    backgroundColor: 'rgba(0, 56, 102, 0.6)',
    left: -291,
    top: -361,
  },
  gradientCircle2: {
    position: 'absolute',
    width: 723,
    height: 413,
    borderRadius: 400,
    backgroundColor: 'rgba(3, 78, 128, 0.5)',
    left: -174,
    top: -206,
  },
  blurEffect: {
    shadowColor: '#00A0FE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 80,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
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
  },
  formContainer: {
    gap: 24,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  input: {
    fontSize: 15,
    color: 'white',
    paddingVertical: 8,
  },
  inputUnderline: {
    height: 2,
    backgroundColor: '#D9D9D9',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginButtonContainer: {
    marginBottom: 30,
  },
  loginButton: {
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FCFFFF',
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
