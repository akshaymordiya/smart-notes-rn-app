import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { ThemedText } from './Themed';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.spacing.lg,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    divider: {
      height: 1,
      flex: 1,
      backgroundColor: theme.colors.border,
    },
    centerText: {
      marginHorizontal: theme.spacing.xl,
      color: theme.colors.textPlaceholder,
      fontSize: theme.typography.caption,
      fontWeight: '500',
    },
  });

export default function Divider({ style, centerText = 'Or continue with' }) {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={[styles.divider, style]} />
      {centerText && (
        <ThemedText muted style={[styles.centerText, style]}>
          {centerText}
        </ThemedText>
      )}
      <View style={[styles.divider, style]} />
    </View>
  );
}
