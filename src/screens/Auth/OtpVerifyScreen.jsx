import React, { useState } from 'react';
import { View, Text } from 'react-native';
import OtpInput from '../../components/ui/OtpInput';
import Button from '../../components/ui/Button';
import { verifyOtp } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { signInThunk } from '../../features/auth/authThunks';

export default function OtpVerifyScreen({ route, navigation }) {
  const dispatch = useAppDispatch();
  const { email } = route.params || {};
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp, context: 'signup' });
      // simulate sign-in with returned token/user
      dispatch(signInThunk.fulfilled(res.data, '')); // direct state sync
      navigation.replace('Tabs');
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
      <Text
        style={{
          color: '#E6EDF3',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 8,
        }}
      >
        Enter the 4-digit code
      </Text>
      <Text style={{ color: '#9AA4B2', marginBottom: 16 }}>
        We sent it to {email || 'your email'}
      </Text>
      <OtpInput
        numDigits={4}
        value={otp}
        onChange={setOtp}
        onComplete={onVerify}
        resend={{ onResend: onVerify }}
      />
      <Button
        title="Verify"
        onPress={onVerify}
        loading={loading}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}
