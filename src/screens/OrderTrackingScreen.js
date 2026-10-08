import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { colors, radius, shadow } from '../../theme';

const steps = [
  { title: 'Order Confirmed', desc: 'Restaurant accepted your order' },
  { title: 'Preparing Food', desc: 'Your meal is being cooked' },
  { title: 'On the Way', desc: 'Rider is heading to you' },
  { title: 'Delivered', desc: 'Enjoy your meal!' },
];

export default function OrderTrackingScreen({ route, navigation }) {
  const { order } = route.params;
  const [step, setStep] = useState(1); // simulated live progress for the demo

  useEffect(() => {
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 4000);
    return () => clearTimeout(t);
  }, [step]);

  const done = step === steps.length - 1;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="Track Order" />
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={styles.check}><Ionicons name="checkmark" size={56} color={colors.white} /></View>
        <Text style={styles.title}>{done ? 'Order Delivered!' : 'Order Placed!'}</Text>
        <Text style={styles.sub}>Order #{order.id}  •  {done ? 'Delivered' : 'Arrives in 25 min'}</Text>

        <View style={styles.card}>
          {steps.map((s, i) => {
            const on = i <= step;
            return (
              <View key={s.title} style={styles.stepRow}>
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.dot, on && styles.dotOn]} />
                  {i < steps.length - 1 && <View style={[styles.line, i < step && styles.dotOn]} />}
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={[styles.stepTitle, !on && { color: colors.grey }]}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.rider}>
          <View style={styles.avatar}><Ionicons name="bicycle" size={20} color={colors.white} /></View>
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.riderName}>Mark D.</Text>
            <Text style={styles.riderRole}>Your delivery rider</Text>
          </View>
        </View>
        <Text style={styles.total}>Paid via {order.method}  •  ₱{order.total}</Text>
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
        <PrimaryButton label="Back to Home" onPress={() => navigation.navigate('Tabs', { screen: 'Home' })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  check: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.dark, marginTop: 20 },
  sub: { fontSize: 14, color: colors.grey, marginTop: 6 },
  card: { alignSelf: 'stretch', backgroundColor: colors.white, borderRadius: radius.lg, padding: 24, marginTop: 28, ...shadow },
  stepRow: { flexDirection: 'row', minHeight: 64 },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.border },
  dotOn: { backgroundColor: colors.primary },
  line: { width: 4, flex: 1, backgroundColor: colors.border, marginVertical: 4 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: colors.dark },
  stepDesc: { fontSize: 13, color: colors.grey, marginTop: 2 },
  rider: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, padding: 16, marginTop: 16, ...shadow },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  riderName: { fontSize: 15, fontWeight: '600', color: colors.dark },
  riderRole: { fontSize: 12, color: colors.grey, marginTop: 2 },
  total: { fontSize: 13, color: colors.grey, marginTop: 16 },
});
