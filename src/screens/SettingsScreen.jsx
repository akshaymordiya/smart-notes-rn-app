import React from 'react';
import { View, Text } from 'react-native';
import ThemeToggle from '../components/ui/ThemeToggle';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, backgroundColor: '#0F1115', padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#E6EDF3', fontSize: 24, fontWeight: '700' }}>
          Settings
        </Text>
        <ThemeToggle />
      </View>
      <View style={{ height: 16 }} />
      <Button title="Sign Out" onPress={() => signOut()} variant="ghost" />
    </View>
  );
}
