import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomInputBarProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  onCamera: () => void;
  onImage: () => void;
  onAttachment: () => void;
}

export default function BottomInputBar({
  message,
  setMessage,
  onSend,
  onCamera,
  onImage,
  onAttachment,
}: BottomInputBarProps) {
  const textInputRef = useRef<TextInput>(null);
  return (
    <View style={styles.inputBarContainer}>
      <View style={styles.inputBar}>
        {/* Left Icons */}
        <View style={styles.inputIcons}>
          <TouchableOpacity style={styles.inputIcon} onPress={onCamera}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIcon} onPress={onImage}>
            <Ionicons name="image-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.inputIcon, { transform: [{ rotate: '45deg' }] }]}
            onPress={onAttachment}
          >
            <Ionicons name="attach-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Text Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Type something.."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={message}
            onChangeText={setMessage}
            autoFocus={false}
            blurOnSubmit={true}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={onSend}>
            <Ionicons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  inputIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  inputIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 120,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.5,
  },
  sendButton: {
    width: 32,
    height: 32,
    backgroundColor: '#00A3FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
  },
});
