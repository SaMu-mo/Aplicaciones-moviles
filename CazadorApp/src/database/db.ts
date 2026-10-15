import * as SQLite from 'expo-sqlite';

export const DB_NAME = 'cazador.db';

export interface Registro {
  id: number;
  titulo: string;
  calificacion: number;
  comentarios: string;
  fotoBase64: string;
  fecha: string;
}

export async function initDatabase(): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      calificacion INTEGER NOT NULL,
      comentarios TEXT NOT NULL,
      fotoBase64 TEXT NOT NULL,
      fecha TEXT NOT NULL
    );
  `);
  await db.closeAsync();
}
