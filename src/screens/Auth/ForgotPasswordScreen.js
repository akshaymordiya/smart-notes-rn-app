import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import OtpInput from '../../components/ui/OtpInput';
import { forgotPassword, resetPassword, verifyOtp } from '../../api';

export default function ForgotPasswordScreen({ navigation }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      await forgotPassword({ email });
      setStep('otp');
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setLoading(true);
    try {
      await verifyOtp({ email, otp, context: 'reset' });
      setStep('reset');
    } finally {
      setLoading(false);
    }
  };

  const doReset = async () => {
    if (password !== confirm) return;
    setLoading(true);
    try {
      await resetPassword({ email, otp, password });
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F1115',
        padding: 24,
        justifyContent: 'center',
      }}
    >
      {step === 'email' && (
        <>
          <Text
            style={{
              color: '#E6EDF3',
              fontSize: 24,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            Reset password
          </Text>
          <Text style={{ color: '#9AA4B2', marginBottom: 24 }}>
            We'll send a code to your email.
          </Text>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <Button title="Send code" onPress={sendOtp} loading={loading} />
        </>
      )}
      {step === 'otp' && (
        <>
          <Text
            style={{
              color: '#E6EDF3',
              fontSize: 24,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            Enter code
          </Text>
          <OtpInput
            numDigits={4}
            value={otp}
            onChange={setOtp}
            onComplete={verify}
            resend={{ onResend: sendOtp }}
          />
        </>
      )}
      {step === 'reset' && (
        <>
          <Text
            style={{
              color: '#E6EDF3',
              fontSize: 24,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            Set new password
          </Text>
          <Input
            label="New password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          <Input
            label="Confirm"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="••••••••"
            secureTextEntry
          />
          <Button title="Update password" onPress={doReset} loading={loading} />
        </>
      )}
    </View>
  );
}
