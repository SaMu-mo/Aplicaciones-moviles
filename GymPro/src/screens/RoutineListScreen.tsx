import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoutines } from '../context/RoutineContext';
import { GRUPOS } from '../constants';

const FILTROS = ['Todos', ...GRUPOS];

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();
  const { routines, deleteRoutine, setFeatured } = useRoutines();
  const [filtro, setFiltro] = useState('Todos');

  const visibles =
    filtro === 'Todos'
      ? routines
      : routines.filter((r) => r.muscleGroup.toLowerCase() === filtro.toLowerCase());

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {FILTROS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filtro === f && styles.chipActivo]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.chipText, filtro === f && styles.chipTextActivo]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={visibles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.vacio}>No hay rutinas en este grupo.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.card, item.featured && styles.cardFeatured]}>
            <TouchableOpacity onPress={() => setFeatured(item.id)} style={styles.estrella}>
              <Ionicons
                name={item.featured ? 'star' : 'star-outline'}
                size={24}
                color={item.featured ? '#F5C518' : '#5A5A64'}
              />
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.dato}>{item.muscleGroup} · {item.duration} min</Text>
            </View>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => navigation.navigate('RoutineDetail', { id: item.id })}>
                <Ionicons name="eye" size={22} color="#8A8A94" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddRoutine', { id: item.id })}>
                <Ionicons name="pencil" size={22} color="#E23636" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteRoutine(item.id)}>
                <Ionicons name="trash" size={22} color="#E23636" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddRoutine')}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F' },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#17171D',
    borderWidth: 1,
    borderColor: '#26262F',
  },
  chipActivo: { backgroundColor: '#E23636', borderColor: '#E23636' },
  chipText: { color: '#8A8A94', fontSize: 13, fontWeight: 'bold' },
  chipTextActivo: { color: '#FFFFFF' },
  lista: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17171D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#26262F',
    padding: 14,
    marginBottom: 12,
  },
  cardFeatured: { borderColor: '#F5C518' },
  estrella: { marginRight: 12 },
  info: { flex: 1 },
  nombre: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  dato: { color: '#8A8A94', fontSize: 13, marginTop: 2 },
  acciones: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  vacio: { color: '#8A8A94', textAlign: 'center', marginTop: 40 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E23636',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});