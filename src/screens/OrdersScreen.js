import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { useCart } from '../context/CartContext';
import { colors, radius, shadow } from '../../theme';

export default function OrdersScreen({ navigation }) {
  const { orders, cancelOrder } = useCart();

  const confirmCancel = (id) => {
    Alert.alert(
      'Cancel order?',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, cancel', style: 'destructive', onPress: () => cancelOrder(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="My Orders" />
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 24, paddingTop: 12 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <Text style={{ fontSize: 64 }}>🧾</Text>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySub}>Your placed orders will show up here.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const status = item.status || 'Preparing';
          const isCancelled = status === 'Cancelled';
          const canCancel = !isCancelled && status !== 'Delivered';

          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('OrderTracking', { order: item })}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.id}>Order #{item.id}</Text>
                  <Text style={styles.meta}>{item.items.length} item(s)  •  {item.method}</Text>
                  <Text style={styles.meta}>{item.createdAt}</Text>
                  <Text style={[styles.status, isCancelled && styles.statusCancelled]}>
                    {status}
                  </Text>
                </View>
                <Text style={[styles.total, isCancelled && styles.totalCancelled]}>
                  ₱{item.total}
                </Text>
              </TouchableOpacity>

              {canCancel && (
                <TouchableOpacity style={styles.cancelBtn} onPress={() => confirmCancel(item.id)}>
                  <Text style={styles.cancelText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 16, marginBottom: 12, ...shadow },
  row: { flexDirection: 'row', alignItems: 'center' },
  id: { fontSize: 15, fontWeight: '700', color: colors.dark },
  meta: { fontSize: 12, color: colors.grey, marginTop: 3 },
  status: { fontSize: 12, fontWeight: '600', color: colors.primary, marginTop: 6 },
  statusCancelled: { color: '#E53935' },
  total: { fontSize: 16, fontWeight: '700', color: colors.primary },
  totalCancelled: { color: colors.grey, textDecorationLine: 'line-through' },
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E53935',
    alignItems: 'center',
  },
  cancelText: { color: '#E53935', fontWeight: '600' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.dark, marginTop: 12 },
  emptySub: { fontSize: 14, color: colors.grey, marginTop: 4 },
});