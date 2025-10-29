import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../theme/ThemeProvider';

const getStyles = (theme) =>
  StyleSheet.create({
    socialLoginButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: theme.spacing.md,
      flexWrap: 'wrap',
      width: '100%'
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

export default function SocialAuth() {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { signIn, loading } = useAuth();

  return (
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
  );
}