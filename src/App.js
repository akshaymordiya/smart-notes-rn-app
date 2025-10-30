import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
  useFonts as useLatoFonts,
} from '@expo-google-fonts/lato';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { store } from './app/store';
import { USE_MOCKS } from './config';
import { startMock } from './mocks/mockServer';
import { startMockRealtime } from './mocks/realtime';
import { AppNavigator } from './navigation';
import { darkTheme } from './theme/dark';
import { lightTheme } from './theme/light';
import { ThemeProvider, useThemeMode } from './theme/ThemeProvider';

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
  const [fontsLoaded] = useLatoFonts({
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setCustomText({ style: { fontFamily: 'Lato_400Regular' } });
      setCustomTextInput({ style: { fontFamily: 'Lato_400Regular' } });
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
