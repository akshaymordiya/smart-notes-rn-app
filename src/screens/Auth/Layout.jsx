import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AnimatedHeader from '../../components/ui/AnimatedHeader';
import { ThemedView } from '../../components/ui/Themed';
import { useAppTheme } from '../../theme/ThemeProvider';

const getStyles = (theme) =>
  StyleSheet.create({
    view: {
      flex: 1,
    },
    contentContainer: {
      padding: 0,
      flexGrow: 1,
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // Allow the white card to grow with content instead of fixed height
      flexGrow: 1,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.xl,
      position: 'relative',
      backgroundColor: theme.colors.background,
      paddingBottom: 0,
    },
    formBackground: {
      backgroundColor: 'transparent',
      position: 'absolute',
      width: '130%',
      height: '100%',
      top: -100,
      left: 0,
      right: 0,
      bottom: 0,
    },
    gradient: StyleSheet.absoluteFillObject,
  });

export default function AuthLayout({
  children,
  title,
  subtitle,
  heroImage = null,
  heroImageContainerStyle = {},
  heroImageStyle = {},
}) {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <ThemedView style={styles.view}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled
        >
          <AnimatedHeader
            title={title}
            subtitle={subtitle}
            heroImage={heroImage}
            heroImageContainerStyle={heroImageContainerStyle}
            heroImageStyle={heroImageStyle}
          />
          <View style={styles.formContainer}>
            <View style={styles.formBackground}></View>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
