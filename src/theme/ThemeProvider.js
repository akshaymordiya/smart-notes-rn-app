import React, { createContext, useContext, useMemo, useState } from 'react';
import { darkTheme } from './dark';
import { lightTheme } from './light';
import { DEFAULT_THEME } from '../config';
const Ctx = createContext({ mode: 'dark', toggle: () => {} });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(DEFAULT_THEME);
  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useThemeMode() {
  return useContext(Ctx);
}

export function useAppTheme() {
  const { mode } = useThemeMode();
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return theme;
}
