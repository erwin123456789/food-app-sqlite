import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../../theme';

export default function PrimaryButton({ label, onPress, variant = 'solid', disabled, style }) {
  const outline = variant === 'outline';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, outline && styles.outline, disabled && { opacity: 0.5 }, style]}
    >
      <Text style={[styles.label, outline && { color: colors.primary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { height: 56, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  outline: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.primary },
  label: { color: colors.white, fontSize: fonts.medium, fontWeight: '600' },
});
