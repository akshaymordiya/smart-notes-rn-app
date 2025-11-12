import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import Fade from '../animations/Fade';
import Translate from '../animations/Translate';
import { ThemedText } from './Themed';

// Static map so Metro can statically analyze asset requires.
const HERO_IMAGES = {
  dark: {
    signIn: require('../../assets/images/dark/sign-in.png'),
    wave: require('../../assets/images/dark/wave.png'),
    signUp: require('../../assets/images/dark/sign-up.png'),
    forgotPassword: require('../../assets/images/dark/fp.png'),
    otpVerify: require('../../assets/images/dark/otp.png'),
    resetPassword: require('../../assets/images/dark/rp.png'),
    login: require('../../assets/images/dark/login.png'),
  },
  light: {
    signIn: require('../../assets/images/light/sign-in.png'),
    wave: require('../../assets/images/light/wave.png'),
    signUp: require('../../assets/images/light/sign-up.png'),
    forgotPassword: require('../../assets/images/light/fp.png'),
    otpVerify: require('../../assets/images/light/otp.png'),
    resetPassword: require('../../assets/images/light/rp.png'),
    login: require('../../assets/images/light/login.png'),
  },
};

const getStyles = (theme) =>
  StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xxl,
      paddingTop: 60,
      position: 'relative',
      textAlign: 'center',
      backgroundColor: theme.colors.primary,
    },
    imageContainer: {
      borderRadius: '50%',
      width: 160,
      height: 160,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing.lg,
    },
    fade: {
      width: '100%',
    },
    imageView: {
      width: '105%',
      height: '105%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      filter: 'drop-shadow(3px 2px 0px #7daccc)',
    },
  });

export default function AnimatedHeader({
  title,
  subtitle,
  heroImage = null,
  heroImageContainerStyle = {},
  heroImageStyle = {},
}) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  let imageSource = null;
  if (heroImage) {
    if (typeof heroImage === 'string') {
      imageSource = HERO_IMAGES[theme.mode][heroImage] || null;
    } else {
      imageSource = heroImage;
    }
  }

  return (
    <View>
      <View style={styles.view}>
        {imageSource ? (
          <Fade style={styles.fade}>
            <View style={[styles.imageContainer, heroImageContainerStyle]}>
              <Image
                source={imageSource}
                resizeMode="contain"
                style={[styles.imageView, heroImageStyle]}
              />
            </View>
          </Fade>
        ) : null}
        <Translate axis="y" initialValue={24} toValue={0} duration={450}>
          <ThemedText
            style={{
              fontSize: theme.typography.h1,
              color: theme.colors.text.white,
              fontFamily: 'Lato_900Black',
              textAlign: 'center',
              textShadow: '1px 1px 2px pink',
              marginTop: 12,
            }}
          >
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText
              muted
              style={{
                fontSize: theme.typography.subheading,
                color: theme.colors.primaryMuted,
                fontFamily: 'Lato_700Bold',
                marginTop: 6,
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
          source={HERO_IMAGES[theme.mode].wave}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
}
