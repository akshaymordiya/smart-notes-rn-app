import React, { useState } from 'react';
import { View } from 'react-native';
import { forgotPassword, resetPassword, verifyOtp } from '../../api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import OtpInput from '../../components/ui/OtpInput';
import AuthLayout from './Layout';

const steps = {
  email: 'email',
  otp: 'otp',
  reset: 'reset',
};

const textBySteps = {
  [steps.email]: {
    title: 'Reset password',
    subtitle: 'We\'ll send a code to your email.',
    heroImage: "forgotPassword",
  },
  [steps.otp]: {
    title: 'Enter code',
    subtitle: 'We sent it to your email.',
    heroImage: "otpVerify",
  },
  [steps.reset]: {
    title: 'Set new password',
    subtitle: 'Enter your new password.',
    heroImage: "resetPassword",
  },
}

export default function ForgotPasswordScreen({ navigation }) {
  const [step, setStep] = useState(steps.email);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      await forgotPassword({ email });
      setStep(steps.otp);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setLoading(true);
    try {
      await verifyOtp({ email, otp, context: 'reset' });
      setStep(steps.reset);
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
    <AuthLayout 
      title={textBySteps[step].title} 
      subtitle={textBySteps[step].subtitle}
      heroImage={textBySteps[step].heroImage}
    >
      <View
      >
        {step === steps.email && (
          <>
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              inputProps={{
                textContentType: 'emailAddress',
              }}
            />
            <Button title="Send Code" onPress={sendOtp} loading={loading} />
          </>
        )}
        {step === steps.otp && (
          <OtpInput
            numDigits={4}
            value={otp}
            onChange={setOtp}
            onComplete={verify}
            resend={{ onResend: sendOtp }}
          />
        )}
        {step === steps.reset && (
          <>
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
    </AuthLayout>
  );
}
