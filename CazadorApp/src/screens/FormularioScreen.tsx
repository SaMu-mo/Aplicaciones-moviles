import { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSQLiteContext } from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import type { RootStackParamList } from '../../App';
import { colores, sombra } from '../styles/tema';

type Props = NativeStackScreenProps<RootStackParamList, 'Formulario'>;

const OPCIONES_FOTO: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.4,
  base64: true,
};

export default function FormularioScreen({ navigation, route }: Props) {
  const db = useSQLiteContext();

  const idEdicion = route.params?.id;
  const tituloEdicion = route.params?.tituloActual || '';
  const califEdicion = route.params?.calificacionActual?.toString() || '';
  const comenEdicion = route.params?.comentariosActuales || '';
  const fotoEdicion = route.params?.fotoActual || '';

  const [titulo, setTitulo] = useState(tituloEdicion);
  const [calificacion, setCalificacion] = useState(califEdicion);
  const [comentarios, setComentarios] = useState(comenEdicion);
  const [foto, setFoto] = useState(fotoEdicion);
  const [guardando, setGuardando] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: idEdicion ? '✏️ Ajustar sabor' : '➕ Nuevo sabor' });
  }, [navigation, idEdicion]);

  const procesarResultado = (resultado: ImagePicker.ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets[0].base64) {
      setFoto(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  };

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos la cámara para fotografiar tu plato.');
      return;
    }
    procesarResultado(await ImagePicker.launchCameraAsync(OPCIONES_FOTO));
  };

  const elegirDeGaleria = async () => {
    procesarResultado(await ImagePicker.launchImageLibraryAsync(OPCIONES_FOTO));
  };

  const guardar = async () => {
    const calif = parseInt(calificacion, 10);

    if (!titulo.trim() || !comentarios.trim() || !foto || !calif) {
      Alert.alert('Faltan datos', 'Completa el nombre, la calificación, los comentarios y la foto.');
      return;
    }

    setGuardando(true);
    try {
      if (idEdicion) {
        await db.runAsync(
          'UPDATE registros SET titulo = ?, calificacion = ?, comentarios = ?, fotoBase64 = ? WHERE id = ?',
          titulo.trim(),
          calif,
          comentarios.trim(),
          foto,
          idEdicion
        );
      } else {
        await db.runAsync(
          'INSERT INTO registros (titulo, calificacion, comentarios, fotoBase64, fecha) VALUES (?, ?, ?, ?, ?)',
          titulo.trim(),
          calif,
          comentarios.trim(),
          foto,
          new Date().toISOString()
        );
      }
      navigation.goBack();
    } catch {
      setGuardando(false);
      Alert.alert('Error', 'No se pudo guardar el registro.');
    }
  };

  const califNumero = parseInt(calificacion, 10) || 0;

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.marcoFoto}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoVacia}>
              <Text style={styles.fotoVaciaEmoji}>📸</Text>
              <Text style={styles.fotoVaciaTexto}>Tu plato aparecerá aquí</Text>
            </View>
          )}
        </View>

        <View style={styles.filaBotones}>
          <Pressable
            onPress={tomarFoto}
            style={({ pressed }) => [styles.botonFoto, pressed && styles.presionado]}
          >
            <Text style={styles.botonFotoTexto}>📷 Cámara</Text>
          </Pressable>
          <Pressable
            onPress={elegirDeGaleria}
            style={({ pressed }) => [styles.botonFoto, pressed && styles.presionado]}
          >
            <Text style={styles.botonFotoTexto}>🖼️ Galería</Text>
          </Pressable>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Nombre del plato</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ej: Encebollado de la esquina"
            placeholderTextColor={colores.textoSuave}
          />

          <Text style={styles.etiqueta}>Calificación</Text>
          <View style={styles.filaEstrellas}>
            {[1, 2, 3, 4, 5].map((valor) => (
              <Pressable
                key={valor}
                onPress={() => setCalificacion(valor.toString())}
                hitSlop={6}
                accessibilityLabel={`${valor} estrellas`}
              >
                <Text
                  style={[
                    styles.estrella,
                    { color: valor <= califNumero ? colores.estrella : colores.estrellaVacia },
                  ]}
                >
                  ★
                </Text>
              </Pressable>
            ))}
            <Text style={styles.califTexto}>{califNumero ? `${califNumero}/5` : ''}</Text>
          </View>

          <Text style={styles.etiqueta}>Comentarios</Text>
          <TextInput
            style={[styles.input, styles.inputMultilinea]}
            value={comentarios}
            onChangeText={setComentarios}
            placeholder="¿Qué tal estuvo? ¿Dónde lo probaste?"
            placeholderTextColor={colores.textoSuave}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          onPress={guardar}
          disabled={guardando}
          style={({ pressed }) => [
            styles.botonGuardar,
            (pressed || guardando) && styles.botonGuardarPresionado,
          ]}
          accessibilityLabel="Guardar registro"
        >
          {guardando ? (
            <ActivityIndicator color={colores.blanco} />
          ) : (
            <Text style={styles.botonGuardarTexto}>💾 Guardar</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  scroll: {
    padding: 16,
    gap: 16,
    paddingBottom: 48,
  },
  marcoFoto: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    ...sombra,
  },
  foto: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  fotoVacia: {
    width: '100%',
    aspectRatio: 4 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.acentoSuave,
    gap: 8,
  },
  fotoVaciaEmoji: {
    fontSize: 48,
  },
  fotoVaciaTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: colores.primarioOscuro,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonFoto: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colores.tarjeta,
    borderWidth: 2,
    borderColor: colores.primario,
    alignItems: 'center',
  },
  botonFotoTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: colores.primarioOscuro,
  },
  presionado: {
    opacity: 0.6,
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: 8,
    ...sombra,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '800',
    color: colores.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 6,
  },
  input: {
    backgroundColor: colores.fondo,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colores.texto,
  },
  inputMultilinea: {
    minHeight: 110,
  },
  filaEstrellas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  estrella: {
    fontSize: 36,
  },
  califTexto: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '800',
    color: colores.primarioOscuro,
  },
  botonGuardar: {
    backgroundColor: colores.primario,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    ...sombra,
    shadowOpacity: 0.25,
  },
  botonGuardarPresionado: {
    backgroundColor: colores.primarioOscuro,
  },
  botonGuardarTexto: {
    color: colores.blanco,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
