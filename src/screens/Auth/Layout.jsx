import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import AnimatedHeader from "../../components/ui/AnimatedHeader";
import { ThemedView } from "../../components/ui/Themed";
import { useAppTheme } from "../../theme/ThemeProvider";

const getStyles = (theme, leftToRightAnimation) =>
  StyleSheet.create({
    view: {
      flex: 1
    },
    contentContainer: {
      padding: 0,
      flexGrow: 1
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
      backgroundColor: theme.cardColors.black.background,
      paddingBottom: 0
    },
    formBackground: {
      backgroundColor: theme.colors.background,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      [leftToRightAnimation ? 'borderTopLeftRadius' : 'borderTopRightRadius']: theme.radii['3xl'],
    },
  });

export default function AuthLayout({ 
  children,
  title,
  subtitle,
  leftToRightAnimation = false,
}) {
  const theme = useAppTheme();
  const styles = getStyles(theme, leftToRightAnimation);
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
            leftToRightAnimation={leftToRightAnimation}
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