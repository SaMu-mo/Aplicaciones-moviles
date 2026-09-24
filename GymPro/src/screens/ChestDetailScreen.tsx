import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChestDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutina de Pecho</Text>
      <Text style={styles.item}>Press de banca - 4x10</Text>
      <Text style={styles.item}>Press inclinado - 4x10</Text>
      <Text style={styles.item}>Aperturas con mancuerna - 3x12</Text>
      <Text style={styles.item}>Fondos en paralelas - 3x12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0F',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#E23636',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 6,
  },
});