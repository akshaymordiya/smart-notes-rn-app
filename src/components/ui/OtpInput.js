import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

export default function OtpInput({
  numDigits = 4,
  value = '',
  onChange,
  onComplete,
  resend,
}) {
  const inputs = Array.from({ length: numDigits });
  const refs = useRef([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (text, idx) => {
    const chars = value.split('');
    const next = [...chars];
    next[idx] = text.replace(/\D/g, '').slice(-1);
    const joined = next.join('').slice(0, numDigits);
    onChange?.(joined);
    if (text && idx < numDigits - 1) refs.current[idx + 1]?.focus();
    if (joined.length === numDigits) onComplete?.(joined);
  };

  const handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === 'Backspace' && !value[idx] && idx > 0)
      refs.current[idx - 1]?.focus();
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {inputs.map((_, idx) => (
          <TextInput
            key={idx}
            ref={(r) => (refs.current[idx] = r)}
            value={value[idx] || ''}
            onChangeText={(t) => handleChange(t, idx)}
            onKeyPress={(e) => handleKeyPress(e, idx)}
            accessibilityLabel={`OTP digit ${idx + 1}`}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 52,
              height: 56,
              marginHorizontal: 6,
              textAlign: 'center',
              color: '#E6EDF3',
              backgroundColor: '#121319',
              borderWidth: 1,
              borderColor: '#242832',
              borderRadius: 12,
              fontSize: 20,
            }}
          />
        ))}
      </View>
      {resend && (
        <TouchableOpacity
          disabled={timer > 0}
          onPress={resend.onResend}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: timer > 0 ? '#9AA4B2' : '#7C5CFF' }}>
            {timer > 0
              ? `Resend in 00:${String(timer).padStart(2, '0')}`
              : 'Resend code'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
