import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import CartItem from '../components/CartItem';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { colors, radius, shadow } from '../../theme';

export default function CartScreen({ navigation }) {
  const { items, subtotal, discount, delivery, total, promo, unitPrice, changeQty, applyPromo } = useCart();
  const [code, setCode] = useState('');

  if (!items.length) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="My Cart" />
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 72 }}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add something delicious from the menu.</Text>
          <PrimaryButton label="Browse Food" style={{ marginTop: 24, alignSelf: 'stretch' }} onPress={() => navigation.navigate('Home')} />
        </View>
      </SafeAreaView>
    );
  }

  const handleApply = () => {
    if (!applyPromo(code)) Alert.alert('Invalid code', 'Try FOOD10 for 10% off.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="My Cart" />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 12 }} showsVerticalScrollIndicator={false}>
        {items.map((it) => (
          <CartItem key={it.key} item={it} unitPrice={unitPrice(it)} onMinus={() => changeQty(it.key, -1)} onPlus={() => changeQty(it.key, 1)} />
        ))}

        <View style={styles.promo}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            placeholderTextColor={colors.grey}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity onPress={handleApply}>
            <Text style={styles.apply}>{promo ? 'Applied' : 'Apply'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summary}>
          <Row label="Subtotal" value={`₱${subtotal}`} />
          {discount > 0 && <Row label="Discount (FOOD10)" value={`-₱${discount}`} />}
          <Row label="Delivery Fee" value={`₱${delivery}`} />
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱{total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton label="Proceed to Checkout" onPress={() => navigation.navigate('Payment')} />
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
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.dark, marginTop: 12 },
  emptySub: { fontSize: 14, color: colors.grey, marginTop: 4 },
  promo: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.primary, height: 52, paddingHorizontal: 20, marginTop: 4 },
  promoInput: { flex: 1, fontSize: 14, color: colors.dark },
  apply: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  summary: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 20, marginTop: 20, ...shadow },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { fontSize: 14, color: colors.grey },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.dark },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  totalLabel: { fontSize: 18, fontWeight: '700', color: colors.dark },
  totalValue: { fontSize: 20, fontWeight: '700', color: colors.primary },
  footer: { paddingHorizontal: 24, paddingBottom: 12, paddingTop: 8 },
});
