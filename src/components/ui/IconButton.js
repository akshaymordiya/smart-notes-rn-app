import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({
  name,
  onPress,
  color = '#E6EDF3',
  size = 20,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { padding: 8, borderRadius: 999, backgroundColor: '#121319' },
        style,
      ]}
    >
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
