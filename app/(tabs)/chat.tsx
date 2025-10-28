import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../src/modules/core/components/Header';
import BottomInputBar from '../../src/modules/chat/components/BottomInputBar';
import DecorationSvg from '../../src/modules/core/components/DecorationSvg';
import ChatMessage from '../../src/modules/chat/components/ChatMessage';
import DropdownMenu from '../../src/modules/core/components/DropdownMenu';
import { useChatService } from '../../src/modules/chat/services/ChatService';

export default function ChatBotScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('ChatGPT');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Use the chat service
  const {
    messages,
    sendMessage: chatSendMessage,
    clearMessages,
    isLoading,
  } = useChatService();

  // Scroll to bottom when screen opens and dismiss keyboard
  useFocusEffect(
    React.useCallback(() => {
      // Dismiss keyboard when screen gains focus
      Keyboard.dismiss();

      // Small delay to ensure content is rendered
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  // Scroll to bottom when new messages are added
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = () => {
    console.log('Model selector pressed');
  };

  const handleMore = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleRestartChat = () => {
    clearMessages();
    setMessage('');
  };

  const handleSend = () => {
    if ((message.trim() || selectedImage) && !isLoading) {
      chatSendMessage(message, selectedImage || undefined);
      setMessage('');
      setSelectedImage(null);
      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Photo library permission is required to select images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to open photo library');
    }
  };

  const handleAttachment = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Photo library permission is required to select images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Attachment error:', error);
      Alert.alert('Error', 'Failed to open photo library');
    }
  };

  const handleAlarmCancel = () => {
    console.log('Alarm cancelled');
  };

  const handleAlarmConfirm = () => {
    console.log('Alarm confirmed');
  };

  const handleCopy = (content: string) => {
    console.log('Copy message:', content);
    // Add clipboard functionality here
  };

  const handleRegenerate = (id: number) => {
    console.log('Regenerate message:', id);
    // Add regenerate functionality here
  };

  const handleLike = (id: number) => {
    console.log('Like message:', id);
    // Add like functionality here
  };

  const handleDislike = (id: number) => {
    console.log('Dislike message:', id);
    // Add dislike functionality here
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
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
      <Header
        onBack={handleBack}
        onMore={handleMore}
        centralSlot={
          <TouchableOpacity
            style={styles.modelSelector}
            onPress={handleModelSelect}
            activeOpacity={0.7}
          >
            <View style={styles.modelSelectorGradient} />
            <Text style={styles.modelText}>{selectedModel} </Text>
            <Ionicons name="chevron-down" size={11} color="white" />
          </TouchableOpacity>
        }
      />

      {/* Dropdown Menu */}
      <DropdownMenu
        visible={showMenu}
        onClose={handleCloseMenu}
        items={[
          {
            icon: 'refresh-outline',
            label: 'Restart chat',
            onPress: handleRestartChat,
          },
        ]}
        topPosition={Platform.OS === 'ios' ? 108 : 76}
        rightPosition={12}
      />

      {/* Chat Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Render messages from service */}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={{
              id: msg.id,
              type: msg.type,
              content: msg.content,
              timestamp: msg.timestamp,
              imageUri: msg.imageUri,
            }}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}

        {/* Show loading indicator when AI is responding */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>AI is typing...</Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Selected Image Preview */}
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Input Bar */}
      <BottomInputBar
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        onCamera={handleCamera}
        onImage={handleImage}
        onAttachment={handleAttachment}
      />
    </KeyboardAvoidingView>
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
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  modelSelectorGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(101, 198, 254, 0.1)',
  },
  modelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    zIndex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    paddingTop: 16,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dateLabelGradient: {
    borderRadius: 100,
    padding: 1, // This creates the border effect
  },
  dateLabel: {
    backgroundColor: '#212731',
    borderRadius: 99, // Slightly smaller than gradientBorder to create border effect
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  dateLabelText: {
    fontSize: 12,
    color: '#D4D4D4',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 20,
  },
  loadingContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  imagePreview: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 20,
  },
});
