import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useProductos } from "../context/ProductoContext";
import { TabParamList } from "../types/producto";

export default function NuevoProductoScreen() {
  const { agregarProducto } = useProductos();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const formularioValido = nombre.trim() !== "" && precio.trim() !== "";

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitas dar permiso a la cámara para tomar la foto");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      const foto = resultado.assets[0];
      const tipo = foto.mimeType ?? "image/jpeg";
      setFotoBase64(`data:${tipo};base64,${foto.base64}`);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setCategoria("");
    setFotoBase64(null);
  };

  const guardarProducto = async () => {
    if (!formularioValido) return;

    const precioNumero = Number(precio.replace(",", "."));
    if (isNaN(precioNumero)) {
      Alert.alert("Precio inválido", "Escribe un número válido en el precio");
      return;
    }

    setGuardando(true);
    try {
      await agregarProducto({
        nombre: nombre.trim(),
        precio: precioNumero,
        categoria: categoria.trim(),
        fotoBase64,
      });
      limpiarFormulario();
      navigation.navigate("Productos");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el producto. Revisa que el backend esté encendido.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
      <Text style={styles.etiqueta}>Nombre *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Mouse inalámbrico"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Precio *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 15.99"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="decimal-pad"
      />

      <Text style={styles.etiqueta}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Tecnología"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity style={styles.botonCamara} onPress={tomarFoto}>
        <Text style={styles.botonCamaraTexto}>📷 Tomar Foto</Text>
      </TouchableOpacity>

      {fotoBase64 && (
        <View style={styles.previewContenedor}>
          <Text style={styles.etiqueta}>Vista previa</Text>
          <Image source={{ uri: fotoBase64 }} style={styles.preview} />
        </View>
      )}

      <TouchableOpacity
        style={[styles.botonGuardar, (!formularioValido || guardando) && styles.botonDeshabilitado]}
        onPress={guardarProducto}
        disabled={!formularioValido || guardando}
      >
        {guardando ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.botonGuardarTexto}>Guardar Producto</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    backgroundColor: "#f2f4f7",
    flexGrow: 1,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botonCamara: {
    backgroundColor: "#2563eb",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  botonCamaraTexto: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  previewContenedor: {
    alignItems: "center",
    marginBottom: 16,
  },
  preview: {
    width: 140,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d0d5dd",
  },
  botonGuardar: {
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: "#98a2b3",
  },
  botonGuardarTexto: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
