import React, { useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import Fade from '../animations/Fade';
import Translate from '../animations/Translate';
import { ThemedText } from './Themed';

const getStyles = (theme, keyboardVisible, leftToRightAnimation) =>
  StyleSheet.create({
    view: {
      backgroundColor: theme.cardColors.black.background,
      padding: theme.spacing.xl,
      [leftToRightAnimation ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: theme.radii['3xl'],
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
    fade: {
      width: '100%'
    },
    imageView: {
      width: "100%",
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xxl
    }
  });

export default function AnimatedHeader({ title, subtitle, leftToRightAnimation = false }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const theme = useAppTheme();
  const styles = getStyles(theme, keyboardVisible, leftToRightAnimation);

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
    <View
      style={styles.view}
    >
      <Fade style={styles.fade}>
        <Image
          source={require('../../assets/images/auth.png')}
          resizeMode="contain"
          style={styles.imageView}
        />
      </Fade>
      <Translate axis="x" initialValue={leftToRightAnimation ? -36 : 36} toValue={0} duration={450} >
        <ThemedText
          style={{
            fontSize: theme.typography.h1,
            color: theme.cardColors.black.text,
            fontFamily: 'Lato_900Black',
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
              fontFamily: 'Lato_400Regular',
              marginTop: theme.spacing.xs,
              marginLeft: theme.spacing.xs,
            }}
          >
            {subtitle}
          </ThemedText>
        ) : null}
      </Translate>
    </View>
  );
}
