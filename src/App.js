import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { store } from './app/store';
import { AppNavigator } from './navigation';
import { darkTheme } from './theme/dark';
import { lightTheme } from './theme/light';
import { ThemeProvider, useThemeMode } from './theme/ThemeProvider';
import { startMock } from './mocks/mockServer';
import { USE_MOCKS } from './config';
import { startMockRealtime } from './mocks/realtime';

function Root() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    if (USE_MOCKS) {
      startMock();
      startMockRealtime(store);
    }
  }, []);

  return (
    <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </StyledThemeProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setCustomText({ style: { fontFamily: 'Inter_400Regular' } });
      setCustomTextInput({ style: { fontFamily: 'Inter_400Regular' } });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </Provider>
  );
}
