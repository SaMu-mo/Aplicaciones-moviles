import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSQLiteContext } from 'expo-sqlite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { Registro } from '../database/db';
import { colores, pintarEstrellas, sombra } from '../styles/tema';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

const formatearFecha = (fecha: string) =>
  new Date(fecha).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export default function ListaScreen({ navigation }: Props) {
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();
  const [registros, setRegistros] = useState<Registro[]>([]);

  const cargarRegistros = async () => {
    const resultado = await db.getAllAsync<Registro>('SELECT * FROM registros ORDER BY id DESC');
    setRegistros(resultado);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
    });
    return unsubscribe;
  }, [navigation]);

  const confirmarEliminar = (registro: Registro) => {
    Alert.alert('🗑️', `¿Eliminar "${registro.titulo}" de tus sabores?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await db.runAsync('DELETE FROM registros WHERE id = ?', registro.id);
          cargarRegistros();
        },
      },
    ]);
  };

  const irAEditar = (registro: Registro) => {
    navigation.navigate('Formulario', {
      id: registro.id,
      tituloActual: registro.titulo,
      calificacionActual: registro.calificacion,
      comentariosActuales: registro.comentarios,
      fotoActual: registro.fotoBase64,
    });
  };

  const renderItem = ({ item }: { item: Registro }) => (
    <View style={styles.tarjeta}>
      <Image source={{ uri: item.fotoBase64 }} style={styles.foto} />
      <View style={styles.cuerpo}>
        <View style={styles.filaTitulo}>
          <Text style={styles.titulo} numberOfLines={1}>
            {item.titulo}
          </Text>
          <View style={styles.insignia}>
            <Text style={styles.insigniaTexto}>{item.calificacion}/5</Text>
          </View>
        </View>
        <Text style={styles.estrellas}>{pintarEstrellas(item.calificacion)}</Text>
        <Text style={styles.comentarios} numberOfLines={3}>
          {item.comentarios}
        </Text>
        <View style={styles.pie}>
          <Text style={styles.fecha}>📅 {formatearFecha(item.fecha)}</Text>
          <View style={styles.acciones}>
            <Pressable
              onPress={() => irAEditar(item)}
              style={({ pressed }) => [styles.botonIcono, pressed && styles.presionado]}
              accessibilityLabel="Modificar registro"
            >
              <Text style={styles.icono}>✏️</Text>
            </Pressable>
            <Pressable
              onPress={() => confirmarEliminar(item)}
              style={({ pressed }) => [
                styles.botonIcono,
                styles.botonPeligro,
                pressed && styles.presionado,
              ]}
              accessibilityLabel="Eliminar registro"
            >
              <Text style={styles.icono}>🗑️</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.lista,
          registros.length === 0 && styles.listaVacia,
          { paddingBottom: insets.bottom + 110 },
        ]}
        ListHeaderComponent={
          registros.length > 0 ? (
            <Text style={styles.contador}>
              {registros.length} {registros.length === 1 ? 'sabor cazado' : 'sabores cazados'}
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.vacioEmoji}>🍽️</Text>
            <Text style={styles.vacioTitulo}>Aún no has cazado ningún sabor</Text>
            <Text style={styles.vacioTexto}>Toca ➕ para registrar tu primer plato con foto.</Text>
          </View>
        }
      />
      <Pressable
        onPress={() => navigation.navigate('Formulario')}
        style={({ pressed }) => [
          styles.fab,
          { bottom: insets.bottom + 24 },
          pressed && styles.fabPresionado,
        ]}
        accessibilityLabel="Nuevo registro"
      >
        <Text style={styles.fabIcono}>➕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  lista: {
    padding: 16,
    gap: 16,
  },
  listaVacia: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contador: {
    fontSize: 13,
    fontWeight: '700',
    color: colores.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colores.borde,
    ...sombra,
  },
  foto: {
    width: '100%',
    height: 190,
    backgroundColor: colores.acentoSuave,
  },
  cuerpo: {
    padding: 16,
    gap: 6,
  },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: colores.texto,
  },
  insignia: {
    backgroundColor: colores.acentoSuave,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  insigniaTexto: {
    color: colores.primarioOscuro,
    fontWeight: '800',
    fontSize: 13,
  },
  estrellas: {
    fontSize: 18,
    color: colores.estrella,
    letterSpacing: 2,
  },
  comentarios: {
    fontSize: 15,
    lineHeight: 21,
    color: colores.textoSuave,
  },
  pie: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fecha: {
    fontSize: 13,
    color: colores.textoSuave,
    fontWeight: '600',
  },
  acciones: {
    flexDirection: 'row',
    gap: 10,
  },
  botonIcono: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colores.acentoSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPeligro: {
    backgroundColor: colores.peligroSuave,
  },
  presionado: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  icono: {
    fontSize: 20,
  },
  vacio: {
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  vacioEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  vacioTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: colores.texto,
    textAlign: 'center',
  },
  vacioTexto: {
    fontSize: 15,
    color: colores.textoSuave,
    textAlign: 'center',
    lineHeight: 21,
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombra,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  fabPresionado: {
    backgroundColor: colores.primarioOscuro,
    transform: [{ scale: 0.94 }],
  },
  fabIcono: {
    fontSize: 26,
  },
});
