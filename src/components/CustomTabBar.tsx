import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  // Get current route name
  const currentRoute = state.routes[state.index].name;
  const isHomeScreen = currentRoute === 'index';

  useEffect(() => {
    // Animate tab bar based on current screen
    Animated.spring(translateY, {
      toValue: isHomeScreen ? 0 : 150,
      useNativeDriver: true,
      friction: 12,
      tension: 20,
    }).start();
  }, [isHomeScreen, translateY]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Get Ionicons name based on route
          const getIoniconsName = () => {
            switch (route.name) {
              case 'index':
                return isFocused ? 'home' : 'home-outline';
              case 'chat':
                return isFocused ? 'chatbubble' : 'chatbubble-outline';
              case 'profile':
                return isFocused ? 'person' : 'person-outline';
              default:
                return 'help-outline';
            }
          };

          // Get MaterialCommunityIcons name based on route
          const getMaterialCommunityIconsName = () => {
            switch (route.name) {
              case 'voice':
                return 'microphone';
              default:
                return 'help';
            }
          };

          // Get label based on route
          const getLabel = () => {
            switch (route.name) {
              case 'index':
                return 'Home';
              case 'chat':
                return 'Chat';
              case 'voice':
                return 'Voice';
              case 'profile':
                return 'Profile';
              default:
                return route.name;
            }
          };

          const ioniconsName = getIoniconsName();
          const materialCommunityIconsName = getMaterialCommunityIconsName();
          const label = getLabel();
          const isVoiceTab = route.name === 'voice';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.8}
              style={[isFocused ? styles.tabButtonActive : styles.tabButton]}
            >
              {isFocused ? (
                <LinearGradient
                  colors={['#00A3FE', '#0385FE']}
                  style={styles.activeTabGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  {isVoiceTab ? (
                    <MaterialCommunityIcons
                      name={materialCommunityIconsName}
                      size={24}
                      color="white"
                    />
                  ) : (
                    <Ionicons name={ioniconsName} size={24} color="white" />
                  )}
                  <Text style={styles.activeTabText}>{label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  {isVoiceTab ? (
                    <MaterialCommunityIcons
                      name={materialCommunityIconsName}
                      size={24}
                      color="white"
                    />
                  ) : (
                    <Ionicons name={ioniconsName} size={24} color="white" />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />

      {/* Bottom Gradient Overlay */}
      <View style={styles.bottomGradientOverlay}>
        <LinearGradient
          colors={['transparent', '#080F1A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientOverlay}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#343942',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
    height: 68,
    paddingHorizontal: 8,
    gap: 4,
    marginBottom: 8,
  },
  tabButtonActive: {
    height: 52,
    borderRadius: 100,
    overflow: 'hidden',
  },
  tabButton: {
    width: 52,
    height: 52,
    borderRadius: 100,
    overflow: 'hidden',
  },
  activeTabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#7DB6EC',
    borderRadius: 100,
    gap: 8,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  inactiveTab: {
    width: 52,
    height: 52,
    backgroundColor: '#131821',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
  },
  bottomGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    pointerEvents: 'none',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
  },
});
