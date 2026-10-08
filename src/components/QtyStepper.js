import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function QtyStepper({ qty, onMinus, onPlus, size = 40 }) {
  const circle = { width: size, height: size, borderRadius: size / 2 };
  return (
    <View style={styles.row}>
      <TouchableOpacity style={[circle, styles.minus]} onPress={onMinus}>
        <Text style={[styles.sign, { color: colors.primary }]}>−</Text>
      </TouchableOpacity>
      <Text style={[styles.qty, { minWidth: size }]}>{qty}</Text>
      <TouchableOpacity style={[circle, styles.plus]} onPress={onPlus}>
        <Text style={[styles.sign, { color: colors.white }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  minus: { backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  plus: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sign: { fontSize: 20, fontWeight: '700' },
  qty: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.dark },
});
