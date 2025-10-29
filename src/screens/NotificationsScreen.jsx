import React from 'react';
import { View, Text } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F1115',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#9AA4B2' }}>No notifications</Text>
    </View>
  );
}
