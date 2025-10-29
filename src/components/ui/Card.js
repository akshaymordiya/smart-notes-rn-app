import React from 'react';
import { View } from 'react-native';

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: '#171923',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
