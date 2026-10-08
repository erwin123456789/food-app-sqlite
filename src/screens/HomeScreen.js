import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FoodCard from '../components/FoodCard';
import { foods, categories } from '../data/foods';
import { useCart } from '../context/CartContext';
import { colors, fonts, spacing, radius } from '../../theme';

export default function HomeScreen({ navigation }) {
  const { addItem } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const data = useMemo(
    () =>
      foods.filter(
        (f) =>
          (category === 'All' || f.category === category) &&
          f.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  const header = (
    <View>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.deliver}>Deliver to</Text>
          <Text style={styles.location}>Davao City</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>E</Text></View>
      </View>
      <Text style={styles.greeting}>What would you like to eat today?</Text>
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.grey} />
        <TextInput
          style={styles.input}
          placeholder="Search food or restaurant"
          placeholderTextColor={colors.grey}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: spacing.lg }}>
        {categories.map((c) => {
          const on = c === category;
          return (
            <TouchableOpacity key={c} onPress={() => setCategory(c)} style={[styles.chip, on && styles.chipOn]}>
              <Text style={[styles.chipText, on && { color: colors.white }]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.sectionRow}>
        <Text style={styles.section}>Popular Near You</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={data}
        keyExtractor={(f) => f.id}
        numColumns={2}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingHorizontal: spacing.xl - 6, paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>No food found.</Text>}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            onPress={() => navigation.navigate('FoodDetails', { food: item })}
            onAdd={() => addItem(item, 1, 'Regular')}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 6, paddingTop: spacing.md },
  deliver: { fontSize: 13, color: colors.grey },
  location: { fontSize: 18, fontWeight: '700', color: colors.dark },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  greeting: { fontSize: fonts.heading, fontWeight: '700', color: colors.dark, marginTop: spacing.xl, marginHorizontal: 6, width: '85%' },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.md, height: 52, paddingHorizontal: 16, marginTop: spacing.lg, marginHorizontal: 6 },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: colors.dark },
  chip: { paddingHorizontal: 22, height: 38, borderRadius: 19, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.dark },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 6, marginBottom: 6 },
  section: { fontSize: 18, fontWeight: '700', color: colors.dark },
  seeAll: { fontSize: 14, fontWeight: '600', color: colors.primary },
  empty: { textAlign: 'center', color: colors.grey, marginTop: 40 },
});
