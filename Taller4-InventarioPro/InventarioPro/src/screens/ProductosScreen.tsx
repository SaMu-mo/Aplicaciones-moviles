import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useProductos } from "../context/ProductoContext";
import { Producto } from "../types/producto";

export default function ProductosScreen() {
  const { productos, cargando, obtenerProductos, eliminarProducto } = useProductos();

  const confirmarEliminar = (producto: Producto) => {
    Alert.alert("Eliminar producto", `¿Seguro que quieres borrar "${producto.nombre}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await eliminarProducto(producto.id);
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el producto");
          }
        },
      },
    ]);
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.tarjeta}>
      {item.fotoBase64 ? (
        <Image source={{ uri: item.fotoBase64 }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, styles.sinImagen]}>
          <Text style={styles.sinImagenTexto}>Sin Imagen</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.categoria}>{item.categoria || "Sin categoría"}</Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.botonEliminar} onPress={() => confirmarEliminar(item)}>
        <Text style={styles.botonEliminarTexto}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducto}
        refreshing={cargando}
        onRefresh={obtenerProductos}
        contentContainerStyle={productos.length === 0 ? styles.listaVacia : styles.lista}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            {cargando ? "Cargando productos..." : "No hay productos todavía"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  lista: {
    padding: 16,
  },
  listaVacia: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vacio: {
    fontSize: 16,
    color: "#667085",
  },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  sinImagen: {
    backgroundColor: "#d0d5dd",
    justifyContent: "center",
    alignItems: "center",
  },
  sinImagenTexto: {
    fontSize: 11,
    color: "#475467",
    textAlign: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#101828",
  },
  categoria: {
    fontSize: 13,
    color: "#667085",
    marginTop: 2,
  },
  precio: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16a34a",
    marginTop: 4,
  },
  botonEliminar: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fee4e2",
  },
  botonEliminarTexto: {
    fontSize: 20,
  },
});
