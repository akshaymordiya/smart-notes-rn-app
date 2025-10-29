import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default function Loader({ label, style }) {
  return (
    <View
      style={[
        { alignItems: 'center', justifyContent: 'center', padding: 16 },
        style,
      ]}
    >
      <ActivityIndicator color="#7C5CFF" />
      {label ? (
        <Text style={{ color: '#9AA4B2', marginTop: 8 }}>{label}</Text>
      ) : null}
    </View>
  );
}
