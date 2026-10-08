import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors, radius } from '../../theme';

const Field = ({ label, ...props }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholderTextColor={colors.grey} autoCapitalize="none" {...props} />
  </>
);

export default function SignUpScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => setError(signUp(name, email, password, confirm) || '');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.dark} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Sign up to start ordering delicious food</Text>

          <Field label="Full Name" placeholder="Juan Dela Cruz" value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
          <Field label="Confirm Password" placeholder="••••••••" value={confirm} onChangeText={setConfirm} secureTextEntry />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <PrimaryButton label="Sign Up" onPress={handleSignUp} style={{ marginTop: 16 }} />

          <Text style={styles.footer}>
            Already have an account?  <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Log In</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: colors.dark },
  sub: { fontSize: 14, color: colors.grey, marginTop: 6, marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: colors.dark, marginBottom: 8, marginTop: 4 },
  input: { height: 56, backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: 20, fontSize: 15, color: colors.dark, marginBottom: 12 },
  error: { color: '#DC2626', fontSize: 13, marginTop: 4 },
  footer: { textAlign: 'center', color: colors.grey, fontSize: 14, marginTop: 24 },
  link: { color: colors.primary, fontWeight: '600' },
});
