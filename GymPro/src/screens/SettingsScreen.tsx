import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function SettingsScreen() {
  const { routines, borrarTodas } = useRoutines();

  const confirmarBorrado = () => {
    if (routines.length === 0) {
      Alert.alert('Sin rutinas', 'No hay rutinas para borrar.');
      return;
    }
    Alert.alert(
      'Borrar todas las rutinas',
      'Esta accion eliminara todas tus rutinas de forma permanente. Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: () => borrarTodas() },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.header}>Configuracion</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="barbell" size={20} color="#E23636" />
          <Text style={styles.rowLabel}>Rutinas guardadas</Text>
          <Text style={styles.rowValue}>{routines.length}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botonBorrar} onPress={confirmarBorrado}>
        <Ionicons name="trash" size={20} color="#FFFFFF" />
        <Text style={styles.botonBorrarText}>Borrar todas las rutinas</Text>
      </TouchableOpacity>

      <Text style={styles.subheader}>Acerca de</Text>
      <View style={styles.card}>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Aplicacion</Text>
          <Text style={styles.aboutValue}>GymPro</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Desarrollador</Text>
          <Text style={styles.aboutValue}>Samuel Meneses Orozco</Text>
        </View>
      </View>
      <Text style={styles.footer}>
        GymPro te ayuda a organizar tus rutinas de entrenamiento, filtrarlas por grupo muscular y
        seguir tu progreso.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F' },
  header: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', marginBottom: 18 },
  card: {
    backgroundColor: '#141419',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#26262F',
    padding: 16,
    marginBottom: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowLabel: { color: '#FFFFFF', fontSize: 15, marginLeft: 12, flex: 1 },
  rowValue: { color: '#E23636', fontSize: 20, fontWeight: '900' },
  botonBorrar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E23636',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 8,
  },
  botonBorrarText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15 },
  subheader: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  aboutLabel: { color: '#8A8A94', fontSize: 14 },
  aboutValue: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  footer: { color: '#8A8A94', fontSize: 13, lineHeight: 20, marginTop: 12 },
});