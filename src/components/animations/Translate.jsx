import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const getStyles = (translate, axis) =>
  StyleSheet.create({
    translate: {
      transform: [{ [axis === 'x' ? 'translateX' : 'translateY']: translate }],
    }
  });

export default function Translate({ 
  children,
  axis = 'x',
  initialValue = 0,
  toValue = 0,
  duration = 450,
  style
}) {
  const translate = useRef(new Animated.Value(initialValue)).current;
  const styles = getStyles(translate, axis);

  useEffect(() => {
    Animated.timing(translate, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [translate, duration, initialValue, toValue, axis]);

  return (
    <Animated.View style={[styles.translate, style]}>
      {children}
    </Animated.View>
  );
}