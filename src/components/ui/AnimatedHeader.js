import React, { useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import Fade from '../animations/Fade';
import Translate from '../animations/Translate';
import { ThemedText } from './Themed';

const getStyles = (theme, keyboardVisible, leftToRightAnimation) =>
  StyleSheet.create({
    view: {
      // backgroundColor: theme.card.colors.black.background,
      // padding: theme.spacing.xl,
      // [leftToRightAnimation
      //   ? 'borderBottomRightRadius'
      //   : 'borderBottomLeftRadius']: theme.radii['3xl'],
      shadowColor: theme.card.colors.black.border,
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 24,
      // minHeight: keyboardVisible ? 150 : 100,
      // flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xxl,
      paddingTop: 60,
      position: 'relative',
      textAlign: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
      backgroundColor: theme.card.colors.sky.background,
    },
    fade: {
      width: '100%',
    },
    imageView: {
      width: '100%',
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xxl,
    },
  });

export default function AnimatedHeader({
  title,
  subtitle,
  leftToRightAnimation = false,
}) {
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
    <View>
      <View style={styles.view}>
        <Fade style={styles.fade}>
          <Image
            source={require('../../assets/images/auth.png')}
            resizeMode="contain"
            style={styles.imageView}
          />
        </Fade>
        <Translate axis="y" initialValue={24} toValue={0} duration={450}>
          <ThemedText
            style={{
              fontSize: theme.typography.h1,
              color: theme.card.colors.sky.text,
              fontFamily: 'Lato_900Black',
              textAlign: 'center',
            }}
          >
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText
              muted
              style={{
                fontSize: theme.typography.subheading,
                color: theme.card.colors.sky.textMuted,
                fontFamily: 'Lato_700Bold',
                marginTop: theme.spacing.sm,
                marginLeft: theme.spacing.xs,
                textAlign: 'center',
              }}
            >
              {subtitle}
            </ThemedText>
          ) : null}
        </Translate>
      </View>
      <View style={{ height: 150, width: '100%' }}>
        <Image
          source={require('../../assets/images/wave1.png')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
}
