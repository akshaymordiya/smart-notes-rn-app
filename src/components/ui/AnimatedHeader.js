import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Keyboard, StyleSheet } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { ThemedText } from './Themed';

const getStyles = (theme, fade, translate, keyboardVisible) =>
  StyleSheet.create({
    view: {
      opacity: fade,
      transform: [{ translateY: translate }],
      backgroundColor: theme.cardColors.black.background,
      padding: theme.spacing.xl,
      borderBottomLeftRadius: theme.radii['3xl'],
      shadowColor: theme.cardColors.black.border,
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 24,
      minHeight: keyboardVisible ? 250 : 300,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      paddingHorizontal: theme.spacing.xxl,
      paddingVertical: theme.spacing.xl,
      position: 'relative',
    },
    imageView: {
      width: "100%",
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xxl,
    }
  });

export default function AnimatedHeader({ title, subtitle }) {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(12)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const theme = useAppTheme();
  const styles = getStyles(theme, fade, translate, keyboardVisible);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, translate]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Animated.View
      style={styles.view}
    >
      <Image
        source={require('../../assets/images/auth.png')}
        resizeMode="contain"
        style={styles.imageView}
      />
      <ThemedText
        style={{
          fontSize: theme.typography.h1,
          color: theme.cardColors.black.text,
          fontWeight: 'bold',
        }}
      >
        {title}
      </ThemedText>
      {subtitle ? (
        <ThemedText
          muted
          style={{
            fontSize: theme.typography.subheading,
            color: theme.cardColors.black.textMuted,
          }}
        >
          {subtitle}
        </ThemedText>
      ) : null}
    </Animated.View>
  );
}
