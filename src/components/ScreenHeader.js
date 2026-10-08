import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../theme';

export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.white }]} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={colors.dark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btn} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  btn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: fonts.title, fontWeight: '700', color: colors.dark },
});
