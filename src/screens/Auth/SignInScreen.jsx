import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedHeader from '../../components/ui/AnimatedHeader';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import Input from '../../components/ui/Input';
import { ThemedText, ThemedView } from '../../components/ui/Themed';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../navigation/routes';
import { useAppTheme } from '../../theme/ThemeProvider';

const getStyles = (theme) =>
  StyleSheet.create({
    view: {
      flex: 1,
    },
    contentContainer: {
      padding: 0,
      flexGrow: 1,
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // Allow the white card to grow with content instead of fixed height
      flexGrow: 1,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.xl,
      position: 'relative',
      backgroundColor: theme.cardColors.black.background,
    },
    formBackground: {
      backgroundColor: theme.colors.background,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderTopRightRadius: theme.radii['3xl'],
    },
    btn: {
      marginTop: theme.spacing.xs,
    },
    forgotPassword: {
      color: theme.colors.accent,
      fontWeight: '800',
      marginTop: theme.spacing.lg,
    },
    signUpCta: { marginVertical: theme.spacing.xl, alignSelf: 'center' },
    signUpCtaText: { color: theme.colors.accent, fontWeight: '800' },
    socialLoginButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: theme.spacing.md,
      flexWrap: 'wrap',
      width: '100%',
    },
    googleBtn: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;',
      fontSize: 20,
    },
    googleBtnTitle: { color: '#000000', fontSize: 14 },
    appleBtnTitle: { color: '#FFFFFF', fontSize: 14 },
    appleBtn: {
      flex: 1,
      backgroundColor: '#000000',
      borderColor: '#FFFFFF',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;',
    },
  });

export default function SignInScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedView style={styles.view}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled
        >
          <AnimatedHeader
            title="Welcome Back"
            subtitle="Sign in to your account"
          />
          <View style={styles.formContainer}>
            <View style={styles.formBackground}></View>
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
              title="Sign In"
              onPress={() => signIn(email, password)}
              loading={loading}
              style={styles.btn}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.AUTH.FORGOT)}
            >
              <ThemedText muted style={styles.forgotPassword}>
                Forgot password?
              </ThemedText>
            </TouchableOpacity>
            <Divider />
            <View style={styles.socialLoginButtons}>
              <Button
                title="Google"
                onPress={() => signIn(email, password)}
                loading={loading}
                style={[styles.btn, styles.googleBtn]}
                titleStyle={styles.googleBtnTitle}
                svgIcon={require('../../assets/images/google.png')}
              />
              <Button
                title="Apple"
                icon="apple"
                onPress={() => signIn(email, password)}
                loading={loading}
                style={[styles.btn, styles.appleBtn]}
                iconColor="#FFFFFF"
                titleStyle={styles.appleBtnTitle}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.AUTH.SIGN_UP)}
              style={styles.signUpCta}
            >
              <ThemedText muted>
                Don't have an account?{' '}
                <Text style={styles.signUpCtaText}>Sign Up</Text>
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
