import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadow } from '../../theme';

export default function ProfileScreen({ navigation }) {
  const { orders, reset } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          reset();
          logout();
        },
      },
    ]);
  };

  const menu = [
    { label: 'My Orders', icon: 'receipt-outline', onPress: () => navigation.navigate('Orders') },
    { label: 'Manage Menu', icon: 'restaurant-outline', onPress: () => navigation.navigate('Inventory') },
    { label: 'Delivery Addresses', icon: 'location-outline' },
    { label: 'Payment Methods', icon: 'wallet-outline' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Profile" />
      <View style={styles.card}>
        <View style={styles.avatar}><Text style={styles.initial}>{user.name.charAt(0).toUpperCase()}</Text></View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.sub}>{user.email}</Text>
        <Text style={styles.stat}>{orders.length} order(s) placed</Text>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        {menu.map((m) => (
          <TouchableOpacity key={m.label} style={styles.row} onPress={m.onPress} activeOpacity={m.onPress ? 0.7 : 1}>
            <View style={styles.rowIcon}><Ionicons name={m.icon} size={18} color={colors.primary} /></View>
            <Text style={styles.rowLabel}>{m.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.grey} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 'auto', marginBottom: 16 }}>
        <TouchableOpacity style={styles.logout} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  card: { margin: 24, marginTop: 8, backgroundColor: colors.white, borderRadius: radius.lg, padding: 24, alignItems: 'center', ...shadow },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  initial: { color: colors.white, fontSize: 40, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.dark, marginTop: 14 },
  sub: { fontSize: 14, color: colors.grey, marginTop: 4 },
  stat: { fontSize: 13, fontWeight: '600', color: colors.primary, marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.md, padding: 14, marginBottom: 12 },
  rowIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, marginLeft: 14, fontSize: 15, fontWeight: '600', color: colors.dark },
  logout: { height: 56, borderRadius: radius.md, borderWidth: 1.5, borderColor: '#DC2626', backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: '#DC2626', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});