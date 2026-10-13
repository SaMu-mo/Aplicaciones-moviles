import "dotenv/config";
import express from "express";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.json({ mensaje: "API InventarioPro funcionando" });
});

app.use("/productos", productosRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
