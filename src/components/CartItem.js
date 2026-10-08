import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QtyStepper from './QtyStepper';
import { colors, radius, shadow } from '../../theme';

export default function CartItem({ item, unitPrice, onMinus, onPlus }) {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <Text style={{ fontSize: 34 }}>{item.emoji}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.size}>{item.size}</Text>
        <Text style={styles.price}>₱{unitPrice * item.qty}</Text>
      </View>
      <QtyStepper qty={item.qty} onMinus={onMinus} onPlus={onPlus} size={28} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, padding: 12, marginBottom: 12, ...shadow },
  image: { width: 72, height: 72, borderRadius: 14, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '600', color: colors.dark },
  size: { fontSize: 12, color: colors.grey, marginTop: 2 },
  price: { fontSize: 16, fontWeight: '700', color: colors.primary, marginTop: 6 },
});
