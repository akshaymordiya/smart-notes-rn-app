import React from 'react';
import { View, Text } from 'react-native';

export default function FilePreview({ name, type }) {
  return (
    <View
      style={{
        backgroundColor: '#121319',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#242832',
        marginRight: 8,
      }}
    >
      <Text style={{ color: '#E6EDF3' }}>{name}</Text>
      <Text style={{ color: '#9AA4B2', fontSize: 12 }}>{type}</Text>
    </View>
  );
}
