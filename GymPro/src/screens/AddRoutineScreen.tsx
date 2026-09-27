import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRoutines } from '../context/RoutineContext';

export default function AddRoutineScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const id = route.params?.id as string | undefined;
  const { routines, addRoutine, updateRoutine } = useRoutines();

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (id) {
      const rutina = routines.find((r) => r.id === id);
      if (rutina) {
        setName(rutina.name);
        setMuscleGroup(rutina.muscleGroup);
        setDuration(rutina.duration.toString());
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!name.trim() || !muscleGroup.trim() || !duration.trim()) {
      Alert.alert('Campos vacios', 'Por favor completa todos los campos.');
      return;
    }
    const data = {
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      duration: parseFloat(duration),
    };
    if (id) {
      updateRoutine(id, data);
    } else {
      addRoutine(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Pierna"
        placeholderTextColor="#5A5A64"
      />
      <Text style={styles.label}>Grupo Muscular</Text>
      <TextInput
        style={styles.input}
        value={muscleGroup}
        onChangeText={setMuscleGroup}
        placeholder="Ej: Cuadriceps"
        placeholderTextColor="#5A5A64"
      />
      <Text style={styles.label}>Duracion (minutos)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Ej: 45"
        placeholderTextColor="#5A5A64"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{id ? 'Actualizar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F', padding: 24 },
  label: { color: '#8A8A94', fontSize: 13, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#17171D',
    borderWidth: 1,
    borderColor: '#26262F',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#E23636',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
});