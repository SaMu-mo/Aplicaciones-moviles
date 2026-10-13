import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../api";
import { NuevoProducto, Producto } from "../types/producto";

interface ProductoContextType {
  productos: Producto[];
  cargando: boolean;
  obtenerProductos: () => Promise<void>;
  agregarProducto: (producto: NuevoProducto) => Promise<void>;
  eliminarProducto: (id: number) => Promise<void>;
}

const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

export function ProductoProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);

  const obtenerProductos = async () => {
    setCargando(true);
    try {
      const respuesta = await api.get<Producto[]>("/productos");
      setProductos(respuesta.data);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (producto: NuevoProducto) => {
    const respuesta = await api.post<Producto>("/productos", producto);
    setProductos((anteriores) => [respuesta.data, ...anteriores]);
  };

  const eliminarProducto = async (id: number) => {
    await api.delete(`/productos/${id}`);
    setProductos((anteriores) => anteriores.filter((p) => p.id !== id));
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{ productos, cargando, obtenerProductos, agregarProducto, eliminarProducto }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductoContext);
  if (!contexto) {
    throw new Error("useProductos debe usarse dentro de ProductoProvider");
  }
  return contexto;
}
