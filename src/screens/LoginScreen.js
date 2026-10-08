import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors, radius } from '../../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const err = login(email, password);
    setError(err || '');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.logo}><Text style={styles.logoText}>F</Text></View>
          <Text style={styles.brand}>FoodGo</Text>

          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.sub}>Log in to order your favorite food</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.grey}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passRow}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0, height: 54 }]}
              placeholder="••••••••"
              placeholderTextColor={colors.grey}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!show}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={styles.link}>{show ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.link, { alignSelf: 'flex-end', marginTop: 12 }]}>Forgot password?</Text>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <PrimaryButton label="Log In" onPress={handleLogin} style={{ marginTop: 24 }} />

          <Text style={styles.signup}>Don't have an account?  <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text></Text>
          <Text style={styles.hint}>Demo: any email + a 4+ character password works, or tap Sign Up to register.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingTop: 40 },
  logo: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  logoText: { color: colors.white, fontSize: 52, fontWeight: '700' },
  brand: { fontSize: 28, fontWeight: '700', color: colors.dark, textAlign: 'center', marginTop: 16, marginBottom: 32 },
  title: { fontSize: 24, fontWeight: '700', color: colors.dark },
  sub: { fontSize: 14, color: colors.grey, marginTop: 6, marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: colors.dark, marginBottom: 8, marginTop: 4 },
  input: { height: 56, backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: 20, fontSize: 15, color: colors.dark, marginBottom: 12 },
  passRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, paddingRight: 20 },
  link: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  error: { color: '#DC2626', fontSize: 13, marginTop: 12 },
  signup: { textAlign: 'center', color: colors.grey, fontSize: 14, marginTop: 24 },
  hint: { textAlign: 'center', color: colors.grey, fontSize: 12, marginTop: 12 },
});
