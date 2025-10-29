import React from 'react';
import { View, Text } from 'react-native';

export default function EmptyState({ title, subtitle }) {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <Text style={{ color: '#E6EDF3', fontSize: 18, fontWeight: '600' }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: '#9AA4B2', marginTop: 6 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
