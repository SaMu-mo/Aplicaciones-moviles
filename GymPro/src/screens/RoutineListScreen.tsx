import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RoutineListScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutinas</Text>
      <Text style={styles.subtitle}>Selecciona una rutina para ver el detalle</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChestDetail')}
      >
        <Text style={styles.buttonText}>Ver Rutina de Pecho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0F',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8A94',
    marginTop: 8,
    marginBottom: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E23636',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});