import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import VoiceHeader from '../../src/components/VoiceHeader';
import VoiceControls from '../../src/components/VoiceControls';
import VoiceAnimation from '../../src/components/VoiceAnimation';
import DecorationSvg from '../../src/components/DecorationSvg';

export default function VoiceScreen() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState('Axel 2.5 Pro');
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string>('');
  const [isRecordingLocal, setIsRecordingLocal] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  // Initialize audio recorder with high quality preset
  const audioRecorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY,
    (status) => {
      console.log('Recording status:', status);
    }
  );

  const recordingState = useAudioRecorderState(audioRecorder);
  const isRecording = recordingState.isRecording;

  // Request audio recording permission and set audio mode
  useEffect(() => {
    async function setupAudio() {
      try {
        // Set audio mode to allow recording
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });

        // Request recording permissions
        const result = await requestRecordingPermissionsAsync();
        setHasPermission(result.granted);
      } catch (error) {
        console.error('Audio setup error:', error);
        setHasPermission(false);
      }
    }
    setupAudio();
  }, []);

  // Initialize Voice recognition
  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setSpeechError(''); // Clear any previous errors
    };

    Voice.onSpeechEnd = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
    };

    Voice.onSpeechResults = (e) => {
      console.log('Speech results:', e.value);
      if (e.value && e.value.length > 0) {
        setTranscribedText(e.value[0]);
        setSpeechError(''); // Clear errors on successful recognition
      }
    };

    Voice.onSpeechError = (e) => {
      console.log('Speech recognition error:', e.error);

      // Handle common iOS errors gracefully
      const errorCode = String(e.error?.code || '');
      if (errorCode === '1101') {
        // Speech recognition timeout - this is normal, don't show error to user
        console.log('Speech recognition timeout (normal behavior)');
        setSpeechError('');
      } else {
        // Other errors - show to user
        setSpeechError(e.error?.message || 'Speech recognition error');
      }
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Cleanup recording on unmount
  useEffect(() => {
    return () => {
      if (isRecording || isRecordingLocal) {
        try {
          audioRecorder.stop();
        } catch (error) {
          console.log(
            'Recording already stopped or error during cleanup:',
            error
          );
        }
      }
    };
  }, [isRecording, isRecordingLocal, audioRecorder]);

  // Debug logging
  useEffect(() => {
    console.log('=== Voice Debug Info ===');
    console.log('Recording (Audio):', isRecording ? 'Yes' : 'No');
    console.log('Recording (Local):', isRecordingLocal ? 'Yes' : 'No');
    console.log('Listening:', isListening ? 'Yes' : 'No');
    console.log('Speaking:', isSpeaking ? 'Yes' : 'No');
    console.log('Transcribed Text:', transcribedText || 'None');
    console.log('AI Response:', aiResponse || 'None');
    console.log(
      'Permission:',
      hasPermission ? 'Granted' : hasPermission === false ? 'Denied' : 'Unknown'
    );
    if (audioRecorder.uri) {
      console.log('Last Recording URI:', audioRecorder.uri);
    }
    if (transcribedText) {
      console.log('Transcribed Text:', transcribedText);
    }
    if (speechError) {
      console.log('Speech Error:', speechError);
    }
    console.log('========================');
  }, [
    isRecording,
    isRecordingLocal,
    isListening,
    isSpeaking,
    hasPermission,
    audioRecorder.uri,
    transcribedText,
    aiResponse,
    speechError,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      // Trigger animation when screen comes into focus
      setShouldAnimate(true);

      // Reset animation state after a short delay to allow for re-triggering
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 100);

      // Start text fade-in animation after voice controls appear
      const textTimer = setTimeout(() => {
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 1200); // Delay after voice controls animation

      return () => {
        clearTimeout(timer);
        clearTimeout(textTimer);
        // Reset screen state when leaving
        resetScreenState();
      };
    }, [isRecording])
  );

  const resetScreenState = async () => {
    try {
      // Stop any ongoing recording
      if (isRecording || isRecordingLocal) {
        try {
          await audioRecorder.stop();
        } catch (error) {
          console.log('Recording already stopped during reset:', error);
        }
      }

      // Stop speech recognition
      try {
        await Voice.stop();
      } catch (error) {
        console.log('Voice already stopped during reset:', error);
      }

      // Reset all states
      setIsListening(false);
      setIsRecordingLocal(false);
      setTranscribedText('');
      setSpeechError('');
      setAiResponse('');
      setIsSpeaking(false);

      // Reset animations
      textFadeAnim.setValue(0);

      console.log('Screen state reset');
    } catch (error) {
      console.error('Error during screen reset:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = () => {
    console.log('Model selector pressed');
  };

  const handleMore = () => {
    console.log('More options pressed');
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      `I understand you said "${userInput}". That's an interesting point. Let me help you with that.`,
      `Based on what you mentioned about "${userInput}", I think the best approach would be to consider all the available options carefully.`,
      `Thank you for sharing "${userInput}". Here's what I think about that topic.`,
      `I heard you say "${userInput}". That's a great question. Let me provide you with some insights.`,
      `Regarding "${userInput}", I believe we should explore this further. Here's my analysis.`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakResponse = async (text: string) => {
    try {
      console.log('Starting speech synthesis...');
      setIsSpeaking(true);

      // Use Speech.speak with callbacks
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.8,
        onStart: () => {
          console.log('Speech started');
          setIsSpeaking(true);
        },
        onDone: () => {
          console.log('Speech finished');
          setIsSpeaking(false);
          // Reset transcribed text after speech is finished
          setTranscribedText('');
          setAiResponse('');
        },
        onStopped: () => {
          console.log('Speech stopped');
          setIsSpeaking(false);
          // Reset transcribed text if speech is stopped
          setTranscribedText('');
          setAiResponse('');
        },
        onError: (error) => {
          console.error('Speech synthesis error:', error);
          setIsSpeaking(false);
          // Reset transcribed text on error
          setTranscribedText('');
          setAiResponse('');
        },
      });
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      // Reset transcribed text on error
      setTranscribedText('');
      setAiResponse('');
    }
  };

  const handleVoiceRecord = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please grant microphone permission to record audio.'
      );
      return;
    }

    if (isRecordingLocal) {
      // Stop recording and speech recognition
      try {
        await audioRecorder.stop();

        // Stop speech recognition
        try {
          await Voice.stop();
          await Voice.cancel(); // Cancel any pending recognition
        } catch (voiceError) {
          console.log('Voice already stopped or error:', voiceError);
        }

        setIsListening(false);
        setIsRecordingLocal(false);
        console.log('Recording and speech recognition stopped');
        console.log('Recording URI:', audioRecorder.uri);

        // Generate AI response and speak it if we have transcribed text
        if (transcribedText.trim()) {
          console.log('Generating AI response for:', transcribedText);
          const response = generateAIResponse(transcribedText);
          setAiResponse(response);
          console.log('AI Response generated:', response);
          await speakResponse(response);
        }
      } catch (error) {
        console.error('Failed to stop recording:', error);
        // Don't show alert for cleanup errors, just log them
        setIsListening(false);
        setIsRecordingLocal(false);
      }
    } else {
      // Start recording and speech recognition
      try {
        // Clear previous transcription
        setTranscribedText('');
        setSpeechError('');

        // Clean up any existing recognition first
        try {
          await Voice.cancel();
        } catch (error) {
          console.log('No existing recognition to cancel');
        }

        // Start speech recognition
        await Voice.start('en-US');

        // Start audio recording
        await audioRecorder.record();

        setIsRecordingLocal(true);
        console.log('Recording and speech recognition started');
      } catch (error) {
        console.error('Failed to start recording:', error);
        Alert.alert('Error', 'Failed to start recording');
      }
    }
  };

  const handleScan = () => {
    console.log('Scan pressed');
  };

  const handleKeyboard = () => {
    console.log('Keyboard pressed');
  };

  const handleTestSpeech = () => {
    console.log('Testing speech...');
    speakResponse('Hello, this is a test of the speech synthesis.');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Decoration SVG */}
      <View style={styles.decorationContainer}>
        <DecorationSvg width={380} height={251} />
      </View>
      {/* Decoration SVG */}
      <View style={styles.decorationContainer2}>
        <DecorationSvg width={380} height={251} />
      </View>

      {/* Header */}
      <VoiceHeader
        selectedModel={selectedModel}
        onBack={handleBack}
        onModelSelect={handleModelSelect}
        onMore={handleMore}
        shouldAnimate={false}
      />

      {/* Text Content */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textFadeAnim,
            transform: [
              {
                translateY: textFadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
            ],
          },
        ]}
      >
        {/* Voice Animation - Show when speaking */}
        <VoiceAnimation isVisible={isSpeaking} />

        <Text style={[styles.text, styles.highlightedText]}>
          {transcribedText}
          {!isRecordingLocal && !transcribedText && !aiResponse && (
            <Text
              style={{
                opacity: 0.5,
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Tap the microphone to start recording...
            </Text>
          )}
        </Text>
      </Animated.View>

      {/* Voice Controls */}
      <VoiceControls
        isRecording={isRecordingLocal}
        onVoiceRecord={handleVoiceRecord}
        onScan={handleScan}
        onKeyboard={handleKeyboard}
        shouldAnimate={shouldAnimate}
      />
      {/* Home Indicator */}
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
    left: -5,
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
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.5,
  },
  highlightedText: {
    color: 'white',
  },
  aiResponseText: {
    color: '#64C4FD',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  gradientMask: {
    flex: 1,
  },
});
