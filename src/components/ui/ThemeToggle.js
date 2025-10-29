import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeMode } from '../../theme/ThemeProvider';

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <TouchableOpacity onPress={toggle} style={{ padding: 8 }}>
      <Text style={{ color: '#9AA4B2' }}>
        {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
}
