import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const listarProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({ orderBy: { createdAt: "desc" } });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar productos" });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, categoria, fotoBase64 } = req.body;

    if (!nombre || precio === undefined || precio === null || precio === "") {
      res.status(400).json({ mensaje: "El nombre y el precio son obligatorios" });
      return;
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio: Number(precio),
        categoria: categoria ?? "",
        fotoBase64: fotoBase64 ?? null,
      },
    });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, precio, categoria, fotoBase64 } = req.body;

    const existe = await prisma.producto.findUnique({ where: { id } });
    if (!existe) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    const producto = await prisma.producto.update({
      where: { id },
      data: {
        nombre,
        precio: precio !== undefined ? Number(precio) : undefined,
        categoria,
        fotoBase64,
      },
    });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el producto" });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existe = await prisma.producto.findUnique({ where: { id } });
    if (!existe) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    await prisma.producto.delete({ where: { id } });
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el producto" });
  }
};
