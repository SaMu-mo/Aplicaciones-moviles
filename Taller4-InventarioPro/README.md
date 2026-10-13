# InventarioPro — Taller Práctico 4

App fullstack de inventario: backend en Node.js (Express + TypeScript + Prisma + PostgreSQL) y app móvil en React Native con Expo (Bottom Tabs + cámara en Base64).

## Estructura

```
backend-inventario/   API REST en el puerto 3000
InventarioPro/        App móvil con Expo
```

## Backend

```bash
cd backend-inventario
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Rutas:

| Método | Ruta              | Descripción                  |
|--------|-------------------|------------------------------|
| GET    | /productos        | Lista el inventario          |
| POST   | /productos        | Crea un producto con su foto |
| PUT    | /productos/:id    | Edita el precio o la foto    |
| DELETE | /productos/:id    | Borra un producto            |

## App móvil

```bash
cd InventarioPro
npm install
npx expo start
```

Antes de abrirla, cambia la IP en `src/api.ts` por la IP local de tu PC. El celular y la PC deben estar en la misma red WiFi.
