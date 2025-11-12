import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

const getStyles = (theme) =>
  StyleSheet.create({
    view: {
      marginBottom: theme.spacing.lg,
    },
    container: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: 'transparent',
    },
    containerFocused: {
      borderColor: theme.mode !== 'dark' ? theme.colors.primary : theme.colors.accent,
      borderWidth: 1.2,
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    },
    label: {
      color: theme.colors.text.muted,
      marginBottom: 4,
      fontSize: 10,
    },
    labelFocuses: {
      color: theme.colors.text.placeholder,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      color: theme.colors.text.primary,
      borderRadius: theme.radii.md,
      fontSize: 14,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginTop: theme.spacing.sm,
      marginLeft: 4,
      fontFamily: 'Lato_700Bold',
    },
    rightEndIconContainer: {},
  });

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showPasswordToggle = false,
  rightEndIcon = null,
  inputProps = {},
  style,
  error = null,
}) {
  const theme = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.view}>
      <View
        style={[styles.container, isFocused && styles.containerFocused, style]}
        onTouchStart={handleFocus}
      >
        {label ? (
          <Text style={[styles.label, value && styles.labelFocuses]}>
            {label}
          </Text>
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text.placeholder}
            secureTextEntry={showPassword}
            {...inputProps}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
          />

          {showPasswordToggle && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome6
                name={showPassword ? 'eye' : 'eye-slash'}
                size={16}
                color={theme.colors.text.muted}
              />
            </TouchableOpacity>
          )}
          {rightEndIcon && (
            <View style={styles.rightEndIconContainer}>{rightEndIcon}</View>
          )}
        </View>
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}
