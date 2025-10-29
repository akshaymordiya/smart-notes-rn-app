import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import OtpVerifyScreen from '../screens/Auth/OtpVerifyScreen';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.AUTH.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={ROUTES.AUTH.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.AUTH.OTP_VERIFY} component={OtpVerifyScreen} />
      <Stack.Screen
        name={ROUTES.AUTH.FORGOT}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
