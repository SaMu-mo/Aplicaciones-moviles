export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  fotoBase64: string | null;
  createdAt: string;
}

export type NuevoProducto = Omit<Producto, "id" | "createdAt">;

export type TabParamList = {
  Productos: undefined;
  NuevoProducto: undefined;
};
