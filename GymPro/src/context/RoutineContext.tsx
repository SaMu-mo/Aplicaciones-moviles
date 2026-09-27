import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SQLite from 'expo-sqlite';

export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  featured: boolean;
  createdAt: string;
};


type RoutineData = Omit<Routine, 'id' | 'createdAt' | 'featured'>;

type RoutineContextType = {
  routines: Routine[];
  loading: boolean;
  addRoutine: (data: RoutineData) => Promise<void>;
  updateRoutine: (id: string, data: RoutineData) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
   setFeatured: (id: string) => Promise<void>;
  borrarTodas: () => Promise<void>;

};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

let db: SQLite.SQLiteDatabase | null = null;

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const mapRow = (r: any): Routine => ({
    id: r.id,
    name: r.name,
    muscleGroup: r.muscleGroup,
    duration: r.duration,
    featured: r.featured === 1,
    createdAt: r.createdAt,
  });

  const cargar = async () => {
    if (!db) return;
    const rows = await db.getAllAsync<any>('SELECT * FROM routines ORDER BY createdAt DESC');
    setRoutines(rows.map(mapRow));
  };

  useEffect(() => {
    const init = async () => {
      db = await SQLite.openDatabaseAsync('gympro.db');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS routines (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          muscleGroup TEXT NOT NULL,
          duration INTEGER NOT NULL,
          featured INTEGER NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL
        );
      `);
      const count = await db.getFirstAsync<{ total: number }>('SELECT COUNT(*) as total FROM routines');
      if (count && count.total === 0) {
        await db.runAsync(
          'INSERT INTO routines (id, name, muscleGroup, duration, featured, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
          ['1', 'Pecho y Triceps', 'Pecho', 45, 1, new Date().toISOString()]
        );
      }
      await cargar();
      setLoading(false);
    };
    init();
  }, []);

  const addRoutine = async (data: RoutineData) => {
    if (!db) return;
    await db.runAsync(
      'INSERT INTO routines (id, name, muscleGroup, duration, featured, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [Date.now().toString(), data.name, data.muscleGroup, data.duration, 0, new Date().toISOString()]
    );
    await cargar();
  };

  const updateRoutine = async (id: string, data: RoutineData) => {
    if (!db) return;
    await db.runAsync(
      'UPDATE routines SET name = ?, muscleGroup = ?, duration = ? WHERE id = ?',
      [data.name, data.muscleGroup, data.duration, id]
    );
    await cargar();
  };

  const deleteRoutine = async (id: string) => {
    if (!db) return;
    await db.runAsync('DELETE FROM routines WHERE id = ?', [id]);
    await cargar();
  };

  const setFeatured = async (id: string) => {
    if (!db) return;
    await db.runAsync('UPDATE routines SET featured = 0');
    await db.runAsync('UPDATE routines SET featured = 1 WHERE id = ?', [id]);
    await cargar();
  };
  const borrarTodas = async () => {
    if (!db) return;
    await db.runAsync('DELETE FROM routines');
    await cargar();
  };
  return (
    <RoutineContext.Provider
      value={{ routines, loading, addRoutine, updateRoutine, deleteRoutine, setFeatured, borrarTodas }}    >
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutineContext);
  if (!context) throw new Error('useRoutines debe usarse dentro de RoutineProvider');
  return context;
}