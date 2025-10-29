import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function FAB({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel="Create"
      style={{
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
        backgroundColor: '#000',
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 28, marginTop: -2 }}>+</Text>
    </TouchableOpacity>
  );
}
