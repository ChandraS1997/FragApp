import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config.js';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {
  const colorScheme = useColorScheme() || 'dark';

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme}>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
};
export default RootLayout;
