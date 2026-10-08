import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { colors, radius, shadow } from '../../theme';

const methods = [
  { name: 'GCash', desc: 'Pay with your GCash wallet' },
  { name: 'Cash on Delivery', desc: 'Pay when order arrives' },
  { name: 'Credit / Debit Card', desc: 'Visa, Mastercard' },
];

export default function PaymentScreen({ navigation }) {
  const { items, subtotal, discount, delivery, total, placeOrder } = useCart();
  const [method, setMethod] = useState('GCash');

  const handlePlace = () => {
    if (!items.length) return;
    const order = placeOrder(method);
    navigation.replace('OrderTracking', { order });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Checkout" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.h}>Delivery Address</Text>
        <View style={styles.address}>
          <View style={styles.pin}><Ionicons name="location" size={18} color={colors.primary} /></View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.addrName}>Home</Text>
            <Text style={styles.addrDetail}>Roxas Ave, Davao City, Davao del Sur</Text>
          </View>
        </View>

        <Text style={[styles.h, { marginTop: 24 }]}>Payment Method</Text>
        {methods.map((m) => {
          const on = m.name === method;
          return (
            <TouchableOpacity key={m.name} onPress={() => setMethod(m.name)} style={[styles.method, on && styles.methodOn]}>
              <View style={[styles.icon, on && { backgroundColor: colors.primary }]}>
                <Ionicons name="wallet" size={18} color={on ? colors.white : colors.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.mName}>{m.name}</Text>
                <Text style={styles.mDesc}>{m.desc}</Text>
              </View>
              <View style={[styles.radio, on && styles.radioOn]} />
            </TouchableOpacity>
          );
        })}

        <View style={styles.summary}>
          <Row label="Subtotal" value={`₱${subtotal}`} />
          {discount > 0 && <Row label="Discount" value={`-₱${discount}`} />}
          <Row label="Delivery Fee" value={`₱${delivery}`} />
          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱{total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
        <PrimaryButton label="Place Order" onPress={handlePlace} disabled={!items.length} />
      </View>
    </SafeAreaView>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  h: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: 12 },
  address: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, padding: 16, ...shadow },
  pin: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  addrName: { fontSize: 15, fontWeight: '600', color: colors.dark },
  addrDetail: { fontSize: 13, color: colors.grey, marginTop: 2 },
  method: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: 'transparent' },
  methodOn: { backgroundColor: colors.light, borderColor: colors.primary },
  icon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  mName: { fontSize: 15, fontWeight: '600', color: colors.dark },
  mDesc: { fontSize: 12, color: colors.grey, marginTop: 2 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white },
  radioOn: { borderColor: colors.primary, backgroundColor: colors.primary },
  summary: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 20, marginTop: 12, ...shadow },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rowLabel: { fontSize: 14, color: colors.grey },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.dark },
  totalLabel: { fontSize: 18, fontWeight: '700', color: colors.dark },
  totalValue: { fontSize: 20, fontWeight: '700', color: colors.primary },
});
