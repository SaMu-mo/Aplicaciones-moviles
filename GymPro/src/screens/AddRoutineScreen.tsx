import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRoutines } from '../context/RoutineContext';
import { GRUPOS } from '../constants';

export default function AddRoutineScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const id = route.params?.id as string | undefined;
  const { routines, addRoutine, updateRoutine } = useRoutines();

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [duration, setDuration] = useState('');
  const [errores, setErrores] = useState<{ name?: string; muscleGroup?: string; duration?: string }>({});

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

  const validar = () => {
    const nuevos: typeof errores = {};
    if (!name.trim()) nuevos.name = 'El nombre es obligatorio.';
    if (!muscleGroup.trim()) nuevos.muscleGroup = 'Selecciona un grupo muscular.';
    const dur = parseFloat(duration);
    if (!duration.trim() || isNaN(dur)) {
      nuevos.duration = 'La duracion debe ser un numero.';
    } else if (dur < 10 || dur > 180) {
      nuevos.duration = 'La duracion debe estar entre 10 y 180 minutos.';
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const handleSave = async () => {
    if (!validar()) return;
    const data = {
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      duration: parseFloat(duration),
    };
    if (id) {
      await updateRoutine(id, data);
    } else {
      await addRoutine(data);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={[styles.input, errores.name && styles.inputError]}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Pierna intensa"
        placeholderTextColor="#5A5A64"
      />
      {errores.name && <Text style={styles.error}>{errores.name}</Text>}

      <Text style={styles.label}>Grupo Muscular</Text>
      <View style={styles.grupos}>
        {GRUPOS.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.grupoChip, muscleGroup === g && styles.grupoChipActivo]}
            onPress={() => setMuscleGroup(g)}
          >
            <Text style={[styles.grupoChipText, muscleGroup === g && styles.grupoChipTextActivo]}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errores.muscleGroup && <Text style={styles.error}>{errores.muscleGroup}</Text>}

      <Text style={styles.label}>Duracion (minutos)</Text>
      <TextInput
        style={[styles.input, errores.duration && styles.inputError]}
        value={duration}
        onChangeText={setDuration}
        placeholder="Entre 10 y 180"
        placeholderTextColor="#5A5A64"
        keyboardType="numeric"
      />
      {errores.duration && <Text style={styles.error}>{errores.duration}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{id ? 'Actualizar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F' },
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
  inputError: { borderColor: '#E23636' },
  error: { color: '#E23636', fontSize: 12, marginTop: 4 },
  grupos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grupoChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#17171D',
    borderWidth: 1,
    borderColor: '#26262F',
  },
  grupoChipActivo: { backgroundColor: '#E23636', borderColor: '#E23636' },
  grupoChipText: { color: '#8A8A94', fontSize: 13, fontWeight: 'bold' },
  grupoChipTextActivo: { color: '#FFFFFF' },
  button: {
    backgroundColor: '#E23636',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
});