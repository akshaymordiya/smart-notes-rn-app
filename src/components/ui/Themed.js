import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

export function ThemedView({ style, ...props }) {
  const theme = useAppTheme();
  return (
    <View
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    />
  );
}

export function ThemedText({ style, muted, ...props }) {
  const theme = useAppTheme();
  const color = muted ? theme.colors.textMuted : theme.colors.textPrimary;
  return (
    <Text
      style={[{ color, fontFamily: theme.typography.fontFamily }, style]}
      {...props}
    />
  );
}
