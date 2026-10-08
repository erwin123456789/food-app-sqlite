import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { colors, radius, shadow } from '../../theme';
import { getProducts, addProduct, deleteProduct, changeStock } from '../services/db';

export default function InventoryScreen() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });

  const loadProducts = (text = search) => setProducts(getProducts(text));

  useEffect(() => {
    loadProducts('');
  }, []);

  const onSearch = (text) => {
    setSearch(text);
    loadProducts(text);
  };

  const onAdd = () => {
    const { name, category, price, stock } = form;
    if (!name.trim() || !category.trim() || isNaN(parseFloat(price)) || isNaN(parseInt(stock, 10))) {
      Alert.alert('Missing info', 'Please fill in all fields with valid values.');
      return;
    }
    addProduct(name.trim(), category.trim(), parseFloat(price), parseInt(stock, 10));
    setForm({ name: '', category: '', price: '', stock: '' });
    setModal(false);
    loadProducts();
  };

  const onDelete = (item) => {
    Alert.alert('Delete item?', `Remove "${item.name}" from the menu?`, [
      { text: 'No', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteProduct(item.id);
          loadProducts();
        },
      },
    ]);
  };

  const onStock = (id, delta) => {
    changeStock(id, delta);
    loadProducts();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Manage Menu" />

      <View style={styles.topRow}>
        <TextInput
          style={styles.search}
          placeholder="Search items..."
          value={search}
          onChangeText={onSearch}
        />
        <TouchableOpacity style={styles.addBtn} onPress={() => setModal(true)}>
          <Text style={styles.addText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={{ padding: 24, paddingTop: 8 }}
        ListEmptyComponent={<Text style={styles.empty}>No items found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.category}  •  ₱{item.price}</Text>
              <View style={styles.stockRow}>
                <TouchableOpacity style={styles.stockBtn} onPress={() => onStock(item.id, -1)}>
                  <Text style={styles.stockBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stockNum}>Stock: {item.stock}</Text>
                <TouchableOpacity style={styles.stockBtn} onPress={() => onStock(item.id, 1)}>
                  <Text style={styles.stockBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <Text style={{ fontSize: 24 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modal} transparent animationType="slide" onRequestClose={() => setModal(false)}>
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Add Item</Text>
            <TextInput style={styles.input} placeholder="Name" value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })} />
            <TextInput style={styles.input} placeholder="Category" value={form.category}
              onChangeText={(v) => setForm({ ...form, category: v })} />
            <TextInput style={styles.input} placeholder="Price" keyboardType="decimal-pad" value={form.price}
              onChangeText={(v) => setForm({ ...form, price: v })} />
            <TextInput style={styles.input} placeholder="Stock" keyboardType="number-pad" value={form.stock}
              onChangeText={(v) => setForm({ ...form, stock: v })} />
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity style={[styles.sheetBtn, styles.cancel]} onPress={() => setModal(false)}>
                <Text style={{ color: colors.dark, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sheetBtn, styles.save]} onPress={onAdd}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topRow: { flexDirection: 'row', paddingHorizontal: 24, paddingTop: 12, alignItems: 'center' },
  search: { flex: 1, backgroundColor: colors.white, borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 10, marginRight: 10, ...shadow },
  addBtn: { backgroundColor: colors.primary, borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 12 },
  addText: { color: '#fff', fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, padding: 16, marginBottom: 12, ...shadow },
  name: { fontSize: 15, fontWeight: '700', color: colors.dark },
  meta: { fontSize: 12, color: colors.grey, marginTop: 3 },
  stockRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  stockBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stockBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  stockNum: { marginHorizontal: 12, fontWeight: '600', color: colors.dark },
  empty: { textAlign: 'center', marginTop: 60, color: colors.grey },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: colors.dark, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 10 },
  sheetBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  cancel: { backgroundColor: '#eee', marginRight: 8 },
  save: { backgroundColor: colors.primary },
});