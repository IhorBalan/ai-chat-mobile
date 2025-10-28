import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert, Animated } from 'react-native';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import {
  generateAIResponse as getAIResponse,
  AIServiceError,
} from '../../core/services/AIService';

interface UseVoiceManagerOptions {
  onTranscriptionComplete?: (text: string) => void;
  onResponseComplete?: (response: string) => void;
}

export function useVoiceManager(options: UseVoiceManagerOptions = {}) {
  const { onTranscriptionComplete, onResponseComplete } = options;

  // Core state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecordingLocal, setIsRecordingLocal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [speechError, setSpeechError] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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

  // Refs to track latest values for cleanup
  const recordingStateRef = useRef({
    isRecording: false,
    isRecordingLocal: false,
  });

  // Keep refs in sync
  useEffect(() => {
    recordingStateRef.current = { isRecording, isRecordingLocal };
  }, [isRecording, isRecordingLocal]);

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
      setSpeechError('');
    };

    Voice.onSpeechEnd = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
    };

    Voice.onSpeechResults = (e) => {
      console.log('Speech results:', e.value);
      if (e.value && e.value.length > 0) {
        setTranscribedText(e.value[0]);
        setSpeechError('');
        if (onTranscriptionComplete) {
          onTranscriptionComplete(e.value[0]);
        }
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
  }, [onTranscriptionComplete]);

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

  // Reset screen state - using refs to access latest values without dependencies
  const resetScreenState = useCallback(async () => {
    try {
      // Stop any ongoing recording - check both states via ref
      const {
        isRecording: recordingCheck,
        isRecordingLocal: recordingLocalCheck,
      } = recordingStateRef.current;
      if (recordingCheck || recordingLocalCheck) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRecorder, textFadeAnim]);

  // Generate AI response from OpenAI
  const generateAIResponse = useCallback(
    async (userInput: string): Promise<string> => {
      try {
        // Call OpenAI API with the transcribed text
        const aiContent = await getAIResponse(
          userInput,
          'You are a helpful AI assistant. Respond concisely to voice messages.'
        );
        return aiContent;
      } catch (error) {
        console.error('AI service error:', error);

        // Fallback to mock response if AI service fails
        const mockResponses = [
          `I understand you said "${userInput}". That's an interesting point. Let me help you with that.`,
          `Based on what you mentioned about "${userInput}", I think the best approach would be to consider all the available options carefully.`,
          `Thank you for sharing "${userInput}". Here's what I think about that topic.`,
          `I heard you say "${userInput}". That's a great question. Let me provide you with some insights.`,
          `Regarding "${userInput}", I believe we should explore this further. Here's my analysis.`,
        ];

        const errorMessage =
          error instanceof AIServiceError
            ? `Sorry, I encountered an error: ${error.message}`
            : mockResponses[Math.floor(Math.random() * mockResponses.length)];

        return errorMessage;
      }
    },
    []
  );

  // Speak response
  const speakResponse = useCallback(
    async (text: string) => {
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
            if (onResponseComplete) {
              onResponseComplete(text);
            }
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
    },
    [onResponseComplete]
  );

  // Handle voice record
  const handleVoiceRecord = useCallback(async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please grant microphone permission to record audio.'
      );
      return;
    }

    // If AI is speaking, stop it
    if (isSpeaking) {
      try {
        Speech.stop();
        setIsSpeaking(false);
        setTranscribedText('');
        setAiResponse('');
        console.log('Speech stopped by user');
      } catch (error) {
        console.log('Error stopping speech:', error);
      }
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
          const response = await generateAIResponse(transcribedText);
          setAiResponse(response);
          console.log('AI Response generated:', response);
          await speakResponse(response);
        }
      } catch (error) {
        console.error('Failed to stop recording:', error);
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
  }, [
    hasPermission,
    isRecordingLocal,
    isSpeaking,
    transcribedText,
    audioRecorder,
    generateAIResponse,
    speakResponse,
  ]);

  return {
    // State
    hasPermission,
    isRecording: isRecordingLocal,
    isListening,
    isSpeaking,
    transcribedText,
    speechError,
    aiResponse,
    shouldAnimate,
    setShouldAnimate,
    textFadeAnim,
    // Actions
    handleVoiceRecord,
    resetScreenState,
    speakResponse,
  };
}
