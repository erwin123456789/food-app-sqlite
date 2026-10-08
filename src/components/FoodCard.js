import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radius, shadow } from '../../theme';

export default function FoodCard({ food, onPress, onAdd }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.image}>
        <Text style={{ fontSize: 48 }}>{food.emoji}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>₱{food.price}</Text>
        <TouchableOpacity style={styles.add} onPress={onAdd}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.white, borderRadius: radius.lg, padding: 8, margin: 6, ...shadow },
  image: { height: 92, borderRadius: 14, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '600', color: colors.dark, marginTop: 10, marginHorizontal: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 4, marginTop: 8 },
  price: { fontSize: fonts.medium, fontWeight: '700', color: colors.primary },
  add: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  plus: { color: colors.white, fontSize: 18, fontWeight: '700' },
});
