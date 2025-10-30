import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
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
    btn: {
      marginTop: theme.spacing.xs,
      fontFamily: 'Lato_700Bold',
    },
    forgotPasswordCta: {
      color: theme.colors.accent,
      marginTop: theme.spacing.lg,
      fontFamily: 'Lato_700Bold',
    },
    signInCta: { marginVertical: theme.spacing.xl, alignSelf: 'center' },
    signInCtaText: { color: theme.colors.accent, fontFamily: 'Lato_700Bold' }
  });

export default function SignInScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    > 
      <Translate axis="y" initialValue={36} toValue={0} duration={450}>
        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          inputProps={{
            textContentType:'emailAddress'
          }}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          showPasswordToggle
        />
        <Button
          title="Sign In"
          onPress={() => signIn(email, password)}
          loading={loading}
          style={styles.btn}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.AUTH.FORGOT)}
        >
          <ThemedText muted style={styles.forgotPasswordCta}>
            Forgot password?
          </ThemedText>
        </TouchableOpacity>
        <Divider />
        <SocialAuth />
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.AUTH.SIGN_UP)}
          style={styles.signInCta}
        >
          <ThemedText muted>
            Don't have an account?{' '}
            <Text style={styles.signInCtaText}>Sign Up</Text>
          </ThemedText>
        </TouchableOpacity>
      </Translate>
    </AuthLayout>
  );
}
