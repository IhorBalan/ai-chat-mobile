import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import LanguageSelector from '../src/components/LanguageSelector';
import LanguageModal from '../src/components/LanguageModal';
import type { Language } from '../src/components/LanguageModal';
import { generateAIResponse, AIServiceError } from '../src/services/AIService';

// Animated Dots Component
function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot2, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(dot3, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();
  }, []);

  return (
    <View style={styles.loadingDotsContainer}>
      <Animated.View style={[styles.loadingDot, { opacity: dot1 }]} />
      <Animated.View style={[styles.loadingDot, { opacity: dot2 }]} />
      <Animated.View style={[styles.loadingDot, { opacity: dot3 }]} />
    </View>
  );
}

const languages: Language[] = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'it', name: 'Italian', flag: '🇮🇹' },
  { id: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { id: 'ru', name: 'Russian', flag: '🇷🇺' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { id: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { id: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function TranslationScreen() {
  const router = useRouter();
  const [fromLanguage, setFromLanguage] = useState<Language>(languages[0]);
  const [toLanguage, setToLanguage] = useState<Language>(languages[1]);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationExplanation, setTranslationExplanation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // Not used on this screen
  };

  const handleSwap = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
    setInputText('');
    setTranslatedText('');
    setShowFromPicker(false);
    setShowToPicker(false);
  };

  const handleToggleFromPicker = () => {
    setShowFromPicker(!showFromPicker);
    setShowToPicker(false); // Close the other picker
  };

  const handleToggleToPicker = () => {
    setShowToPicker(!showToPicker);
    setShowFromPicker(false); // Close the other picker
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      return;
    }

    setIsTranslating(true);
    setTranslatedText('');
    setTranslationExplanation('');

    try {
      const systemPrompt = `You are a professional translator and linguist. Your task is to translate text from ${fromLanguage.name} to ${toLanguage.name}. 

IMPORTANT: Provide your response in the following EXACT format:
TRANSLATION: [the translated text]
EXPLANATION: [a brief explanation of any cultural nuances, idioms, or interesting aspects of the translation]`;

      const aiResponse = await generateAIResponse(
        `Translate this ${fromLanguage.name} text to ${toLanguage.name}: "${inputText.trim()}"`,
        systemPrompt
      );

      // Parse the response to separate translation and explanation
      const translationMatch = aiResponse.match(
        /TRANSLATION:\s*(.+?)(?=EXPLANATION:|$)/s
      );
      const explanationMatch = aiResponse.match(/EXPLANATION:\s*(.+?)$/s);

      const translation =
        translationMatch?.[1]?.trim() ||
        aiResponse.split('TRANSLATION:')[1]?.split('EXPLANATION:')[0]?.trim() ||
        aiResponse;
      const explanation = explanationMatch?.[1]?.trim() || '';

      setTranslatedText(translation);
      setTranslationExplanation(explanation);
    } catch (error) {
      console.error('Translation error:', error);

      // Fallback translation message
      const errorMessage =
        error instanceof AIServiceError
          ? `Translation failed: ${error.message}`
          : 'Failed to translate. Please try again.';

      Alert.alert('Translation Error', errorMessage);
      setTranslatedText(errorMessage);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSelectLanguage = (language: Language, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLanguage(language);
      setShowFromPicker(false);
    } else {
      setToLanguage(language);
      setShowToPicker(false);
    }
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
        centralSlot={<Text style={styles.headerTitle}>Smart Translation</Text>}
        showMore={false}
      />

      {/* Content */}
      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Language Selection */}
          <View style={styles.languageContainer}>
            {/* From Language */}
            <LanguageSelector
              label="From"
              language={fromLanguage}
              onPress={handleToggleFromPicker}
            />

            {/* Swap Button */}
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwap}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#00A3FF', '#0385FE']}
                style={styles.swapButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons
                  name="swap-vertical-outline"
                  size={20}
                  color="white"
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* To Language */}
            <LanguageSelector
              label="To"
              language={toLanguage}
              onPress={handleToggleToPicker}
            />
          </View>

          {/* Input Area */}
          <Input
            label={fromLanguage.name}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Enter text in ${fromLanguage.name}...`}
            multiline
            numberOfLines={8}
          />

          {/* Output Area - Translation */}
          {(isTranslating || translatedText) && (
            <View>
              <Text style={styles.outputSectionTitle}>
                Translation ({toLanguage.name})
              </Text>
              {isTranslating ? (
                <LoadingDots />
              ) : (
                <Text style={styles.outputSectionText}>{translatedText}</Text>
              )}
            </View>
          )}

          {/* Output Area - Explanation */}
          {(isTranslating || translationExplanation) && (
            <View>
              <Text style={styles.outputSectionTitle}>Explanation</Text>
              {isTranslating ? (
                <LoadingDots />
              ) : (
                <Text style={styles.outputSectionText}>
                  {translationExplanation}
                </Text>
              )}
            </View>
          )}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Fixed Translate Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isTranslating ? 'Translating...' : 'Translate'}
            onPress={handleTranslate}
            variant="secondary"
            disabled={isTranslating || !inputText.trim()}
          />
        </View>

        {/* Language Picker Modals */}
        <LanguageModal
          visible={showFromPicker}
          languages={languages}
          selectedLanguage={fromLanguage}
          onClose={() => setShowFromPicker(false)}
          onSelect={(lang) => handleSelectLanguage(lang, 'from')}
        />

        <LanguageModal
          visible={showToPicker}
          languages={languages}
          selectedLanguage={toLanguage}
          onClose={() => setShowToPicker(false)}
          onSelect={(lang) => handleSelectLanguage(lang, 'to')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080F1A',
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
  contentWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: '#080F1A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 20,
    transform: [{ rotate: '90deg' }],
  },
  swapButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 24,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A3FF',
  },
  outputSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00A3FF',
    marginTop: 30,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  outputSectionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 20,
  },
});
