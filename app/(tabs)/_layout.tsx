import { Tabs } from 'expo-router';
import CustomTabBar from '../../src/modules/core/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="voice" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
