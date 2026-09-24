import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProfileCard from './ProfileCard';

const empleados = [
  { id: '1', nombre: 'Ana Torres', cargo: 'Racha: 12 dias' },
  { id: '2', nombre: 'Carlos Ruiz', cargo: 'PRs: 8' },
  { id: '3', nombre: 'Lucia Mora', cargo: 'Racha: 5 dias' },
  { id: '4', nombre: 'Diego Salas', cargo: 'PRs: 15' },
  { id: '5', nombre: 'Maria Leon', cargo: 'Racha: 21 dias' },
  { id: '6', nombre: 'Pablo Vega', cargo: 'PRs: 3' },
];

export default function EmployeeList() {
  return (
    <FlatList
      data={empleados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProfileCard nombre={item.nombre} cargo={item.cargo} />
      )}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingVertical: 12,
  },
});