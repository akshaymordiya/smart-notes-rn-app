import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Translate from '../../components/animations/Translate';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import Input from '../../components/ui/Input';
import { ThemedText } from '../../components/ui/Themed';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../navigation/routes';
import { useAppTheme } from '../../theme/ThemeProvider';
import AuthLayout from './Layout';
import SocialAuth from './SocialAuth';

const getStyles = (theme) =>
  StyleSheet.create({
    signUpCta: { marginVertical: theme.spacing.xl, alignSelf: 'center' },
    signUpCtaText: { color: theme.colors.accent, fontWeight: '800' },
  });

export default function SignUpScreen({ navigation }) {
  const { signUp, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <AuthLayout
      title="Register Now"
      subtitle="Create an account to get started"
      leftToRightAnimation={true}
    >
      <Translate axis="y" initialValue={36} toValue={0} duration={250}>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
      </Translate>
      <Translate axis="y" initialValue={36} toValue={0} duration={450}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
      </Translate>
      <Translate axis="y" initialValue={36} toValue={0} duration={650}>
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
      </Translate>
      <Translate axis="y" initialValue={36} toValue={0} duration={850}>
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
        />
      </Translate>
      <Translate axis="y" initialValue={36} toValue={0} duration={1050}>
        <Button
          title="Sign Up"
          onPress={() => signUp(email, password, name)}
          loading={loading}
        />
        <Divider />
        <SocialAuth />
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.AUTH.SIGN_IN)}
          style={styles.signUpCta}
        >
          <ThemedText muted>
            Already have an account?{' '}
            <Text style={styles.signUpCtaText}>Sign In</Text>
          </ThemedText>
        </TouchableOpacity>
      </Translate>
    </AuthLayout>
  );
}
