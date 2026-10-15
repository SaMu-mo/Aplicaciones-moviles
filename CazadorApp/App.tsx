import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { DB_NAME, initDatabase } from './src/database/db';
import ListaScreen from './src/screens/ListaScreen';
import FormularioScreen from './src/screens/FormularioScreen';
import { colores } from './src/styles/tema';

export type RootStackParamList = {
  Lista: undefined;
  Formulario:
    | {
        id: number;
        tituloActual: string;
        calificacionActual: number;
        comentariosActuales: string;
        fotoActual: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initDatabase()
      .then(() => setCargando(false))
      .catch(() => {
        setError('No se pudo preparar la base de datos.');
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <Text style={styles.logo}>🍜</Text>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.textoCarga}>Preparando tu despensa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.logo}>⚠️</Text>
        <Text style={styles.textoCarga}>{error}</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName={DB_NAME}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colores.primario },
            headerTintColor: colores.blanco,
            headerTitleStyle: { fontWeight: '800' },
            contentStyle: { backgroundColor: colores.fondo },
          }}
        >
          <Stack.Screen
            name="Lista"
            component={ListaScreen}
            options={{ title: '🍽️ Cazador de Sabores' }}
          />
          <Stack.Screen name="Formulario" component={FormularioScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.fondo,
    gap: 16,
    padding: 24,
  },
  logo: {
    fontSize: 64,
  },
  textoCarga: {
    fontSize: 16,
    color: colores.textoSuave,
    fontWeight: '600',
    textAlign: 'center',
  },
});
