import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

const getStyles = (theme, variant) =>
  StyleSheet.create({
    base: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.sm,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        variant === 'primary' ? theme.colors.buttonPrimary : 'transparent',
      borderWidth: variant === 'ghost' ? 1 : 0,
      borderColor: '#242832',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'fit-content',
    },
    title: { color: '#FFFFFF', fontWeight: 'bold' },
  });

export default function Button({
  title,
  titleStyle,
  onPress,
  loading,
  variant = 'primary',
  style,
  icon,
  iconColor,
  svgIcon = null,
}) {
  const theme = useAppTheme();
  const styles = getStyles(theme, variant);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.base, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.card.colors.black.text} />
      ) : (
        <>
          {svgIcon && (
            <Image
              source={svgIcon}
              resizeMode="contain"
              style={{
                width: 18,
                height: 18,
                zIndex: 1000,
                marginRight: theme.spacing.md,
              }}
            />
          )}
          {icon && <FontAwesome6 name={icon} size={18} color={iconColor} />}
          <Text
            style={[
              styles.title,
              { marginLeft: icon ? theme.spacing.md : 0 },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
