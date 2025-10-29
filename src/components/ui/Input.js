import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  inputProps = {},
  style,
}) {
  const theme = useAppTheme();

  return (
    <View style={[{ marginBottom: theme.spacing.lg }, style]}>
      {label ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            marginBottom: theme.spacing.sm,
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textPlaceholder}
        secureTextEntry={secureTextEntry}
        {...inputProps}
        style={{
          backgroundColor: 'transparent',
          color: theme.colors.textPrimary,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: theme.radii.sm,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      />
    </View>
  );
}
