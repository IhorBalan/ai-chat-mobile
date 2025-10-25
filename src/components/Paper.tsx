import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface PaperProps {
  children: React.ReactNode;
  style?: any;
}

export default function Paper({ children, style }: PaperProps) {
  return (
    <View style={styles.shadowWrapper}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={[styles.content, style]}>{children}</View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  gradientBorder: {
    borderRadius: 20,
    padding: 1, // This creates the border effect
  },
  content: {
    backgroundColor: '#212731',
    borderRadius: 19, // Slightly smaller than gradientBorder to create border effect
    padding: 16,
  },
});
