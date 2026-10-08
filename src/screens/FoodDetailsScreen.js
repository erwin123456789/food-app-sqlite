import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import QtyStepper from '../components/QtyStepper';
import { sizeExtra } from '../data/foods';
import { useCart } from '../context/CartContext';
import { colors, radius } from '../../theme';

export default function FoodDetailsScreen({ route, navigation }) {
  const { food } = route.params;
  const { addItem } = useCart();
  const [size, setSize] = useState('Regular');
  const [qty, setQty] = useState(1);
  const total = (food.price + sizeExtra[size]) * qty;

  const handleAdd = () => {
    addItem(food, qty, size);
    navigation.navigate('Tabs', { screen: 'Cart' });
  };

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <Text style={{ fontSize: 120 }}>{food.emoji}</Text>
        <SafeAreaView edges={['top']} style={styles.backWrap}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.dark} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.meta}>★ {food.rating}  •  {food.reviews} reviews  •  {food.time}</Text>
          <Text style={styles.price}>₱{food.price + sizeExtra[size]}</Text>

          <Text style={styles.h}>Description</Text>
          <Text style={styles.desc}>{food.description}</Text>

          <Text style={styles.h}>Choose Size</Text>
          <View style={{ flexDirection: 'row' }}>
            {Object.keys(sizeExtra).map((s) => {
              const on = s === size;
              return (
                <TouchableOpacity key={s} onPress={() => setSize(s)} style={[styles.sizeChip, on && styles.sizeOn]}>
                  <Text style={[styles.sizeText, on && { color: colors.primary }]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.qtyRow}>
            <Text style={styles.h2}>Quantity</Text>
            <QtyStepper qty={qty} onMinus={() => setQty(Math.max(1, qty - 1))} onPlus={() => setQty(qty + 1)} />
          </View>
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <PrimaryButton label={`Add to Cart  •  ₱${total}`} onPress={handleAdd} />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.light },
  hero: { height: 320, alignItems: 'center', justifyContent: 'center' },
  backWrap: { position: 'absolute', top: 0, left: 24 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  sheet: { flex: 1, backgroundColor: colors.white, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, marginTop: -30, padding: 24, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: colors.dark },
  meta: { fontSize: 14, color: colors.grey, marginTop: 6 },
  price: { fontSize: 28, fontWeight: '700', color: colors.primary, marginTop: 12 },
  h: { fontSize: 16, fontWeight: '700', color: colors.dark, marginTop: 20, marginBottom: 8 },
  h2: { fontSize: 16, fontWeight: '700', color: colors.dark },
  desc: { fontSize: 14, color: colors.grey, lineHeight: 21 },
  sizeChip: { flex: 1, height: 44, borderRadius: 14, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sizeOn: { backgroundColor: colors.light, borderColor: colors.primary },
  sizeText: { fontSize: 14, fontWeight: '600', color: colors.grey },
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 24 },
});
