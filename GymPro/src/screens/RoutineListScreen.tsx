import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoutines } from '../context/RoutineContext';

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();
  const { routines, deleteRoutine } = useRoutines();

  return (
    <View style={styles.container}>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay rutinas. Toca el boton + para crear una.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.dato}>{item.muscleGroup}</Text>
              <Text style={styles.dato}>{item.duration} mins</Text>
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
  lista: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17171D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#26262F',
    padding: 16,
    marginBottom: 12,
  },
  info: { flex: 1 },
  nombre: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  dato: { color: '#8A8A94', fontSize: 13, marginTop: 2 },
  acciones: { flexDirection: 'row', gap: 16, alignItems: 'center' },
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