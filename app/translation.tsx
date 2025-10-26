import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import LanguageSelector from '../src/components/LanguageSelector';
import LanguageModal from '../src/components/LanguageModal';
import type { Language } from '../src/components/LanguageModal';

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

  const handleTranslate = () => {
    // Mock translation
    if (inputText.trim()) {
      setTranslatedText(
        `Translated from ${fromLanguage.name} to ${toLanguage.name}: ${inputText}`
      );
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

          {/* Output Area */}
          {translatedText && (
            <View style={styles.outputContainer}>
              <Text style={styles.sectionTitle}>{toLanguage.name}</Text>
              <View style={styles.textOutputWrapper}>
                <Text style={styles.outputText}>{translatedText}</Text>
              </View>
            </View>
          )}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Fixed Translate Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Translate"
            onPress={handleTranslate}
            variant="secondary"
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
  outputContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  textOutputWrapper: {
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 12,
    minHeight: 160,
    padding: 12,
  },
  outputText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 20,
  },
});
