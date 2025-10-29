import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function SignUpScreen({ navigation }) {
  const { signUp, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F1115',
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#E6EDF3',
          fontSize: 28,
          fontWeight: '700',
          marginBottom: 8,
        }}
      >
        Create account
      </Text>
      <Text style={{ color: '#9AA4B2', marginBottom: 24 }}>
        Join Smart Notes
      </Text>
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={() => signUp(email, password, name)}
        loading={loading}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: '#9AA4B2' }}>
          Have an account? <Text style={{ color: '#7C5CFF' }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
