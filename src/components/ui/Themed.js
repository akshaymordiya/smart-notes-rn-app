import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const color = muted ? theme.colors.text.muted : theme.colors.text.primary;
  const flattened = StyleSheet.flatten(style) || {};

  // Map fontWeight to the correct Lato variant so consumers can use fontWeight
  const weight = `${flattened.fontWeight || '400'}`.toLowerCase();
  const isBold = weight === 'bold' || weight === '700' || weight === '800';
  const isBlack = weight === '900';
  const isLight = weight === '300';
  const isThin = weight === '100';

  let fontFamily = theme.typography.fontFamily;
  if (isThin) fontFamily = theme.typography.fontFamilyThin;
  else if (isLight) fontFamily = theme.typography.fontFamilyLight;
  else if (isBlack) fontFamily = theme.typography.fontFamilyBlack;
  else if (isBold) fontFamily = theme.typography.fontFamilyBold;

  return <Text style={[{ color, fontFamily }, style]} {...props} />;
}
