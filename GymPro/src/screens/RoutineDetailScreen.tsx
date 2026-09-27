import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRoutines } from '../context/RoutineContext';

export default function RoutineDetailScreen() {
  const route = useRoute<any>();
  const id = route.params?.id as string | undefined;
  const { routines } = useRoutines();
  const rutina = routines.find((r) => r.id === id);

  if (!rutina) {
    return (
      <View style={styles.container}>
        <Text style={styles.dato}>Rutina no encontrada.</Text>
      </View>
    );
  }

  const fecha = new Date(rutina.createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{rutina.name}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Grupo muscular</Text>
        <Text style={styles.value}>{rutina.muscleGroup}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Duracion</Text>
        <Text style={styles.value}>{rutina.duration} mins</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha de creacion</Text>
        <Text style={styles.value}>{fecha}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F', padding: 24 },
  title: { color: '#E23636', fontSize: 26, fontWeight: '900', marginBottom: 24 },
  row: { marginBottom: 18 },
  label: { color: '#8A8A94', fontSize: 13 },
  value: { color: '#FFFFFF', fontSize: 18, marginTop: 4 },
  dato: { color: '#8A8A94', fontSize: 15 },
});