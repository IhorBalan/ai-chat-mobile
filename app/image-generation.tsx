import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import DecorationSvg from '../src/components/DecorationSvg';
import Button from '../src/components/Button';
import Input from '../src/components/Input';

const { width: screenWidth } = Dimensions.get('window');

export default function ImageGenerationScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleMore = () => {
    // Not used on this screen
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setImageLoading(false);

    // Mock image generation - in production, this would call OpenAI DALL-E or similar API
    setTimeout(() => {
      // Simulating image generation
      setGeneratedImage('https://picsum.photos/512');
      setIsGenerating(false);
    }, 3000);
  };

  // Animated Loading Dots
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
        centralSlot={<Text style={styles.headerTitle}>Image Generation</Text>}
        showMore={false}
      />

      {/* Content */}
      <View style={styles.contentWrapper}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.introText}>
            Describe the image you want to generate and let AI create it for you
          </Text>

          {/* Input Area */}
          <Input
            label="Image Description"
            value={prompt}
            onChangeText={setPrompt}
            placeholder="e.g., A serene mountain landscape at sunset..."
            multiline
            numberOfLines={6}
          />

          {/* Image Container - Show placeholder when generating, show image when ready */}
          <View style={styles.imageContainer}>
            {isGenerating ? (
              <View style={styles.generatingPlaceholder}>
                <Text style={styles.generatingText}>
                  Generating your image...
                </Text>
              </View>
            ) : generatedImage ? (
              <>
                {imageLoading && (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>
                      Loading image...
                    </Text>
                  </View>
                )}
                <Image
                  source={{ uri: generatedImage }}
                  style={styles.generatedImage}
                  resizeMode="cover"
                  onLoadStart={() => {
                    setImageLoading(true);
                  }}
                  onLoadEnd={() => {
                    setImageLoading(false);
                    scrollToBottom();
                  }}
                  onError={(error) => {
                    console.log('Image load error:', error);
                    setImageLoading(false);
                  }}
                />
              </>
            ) : null}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Fixed Generate Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isGenerating ? 'Generating...' : 'Generate Image'}
            onPress={handleGenerate}
            variant="secondary"
            disabled={isGenerating || !prompt.trim()}
          />
        </View>
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
  introText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  generatedImage: {
    width: screenWidth - 32,
    height: screenWidth - 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  imagePlaceholder: {
    position: 'absolute',
    width: screenWidth - 32,
    height: screenWidth - 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A3FF',
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: '#080F1A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  bottomSpacer: {
    height: 20,
  },
  generatingPlaceholder: {
    width: screenWidth - 32,
    height: screenWidth - 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  descriptionContainer: {
    gap: 8,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3,
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
});
