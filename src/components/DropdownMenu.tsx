import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  icon: string;
  label: string;
  onPress: () => void;
}

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  topPosition?: number;
  rightPosition?: number;
}

export default function DropdownMenu({
  visible,
  onClose,
  items,
  topPosition = 60,
  rightPosition = 16,
}: DropdownMenuProps) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.menu,
            {
              top: topPosition,
              right: rightPosition,
            },
          ]}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === 0 && styles.firstMenuItem,
                index === items.length - 1 && styles.lastMenuItem,
              ]}
              onPress={() => {
                item.onPress();
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color="#00A3FF"
              />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#212731',
    borderRadius: 20,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  firstMenuItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    flex: 1,
  },
});
