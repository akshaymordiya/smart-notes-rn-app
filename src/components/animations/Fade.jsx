import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const getStyles = (fade) =>
  StyleSheet.create({
    fade: {
      opacity: fade,
    },
  });

export default function Fade({ children, duration = 950, style }) {
  const fade = useRef(new Animated.Value(0)).current;
  const styles = getStyles(fade);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fade, duration]);

  return <Animated.View style={[styles.fade, style]}>{children}</Animated.View>;
}
