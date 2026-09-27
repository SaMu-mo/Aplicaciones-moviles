import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

type RoutineData = Omit<Routine, 'id' | 'createdAt'>;

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (data: RoutineData) => void;
  updateRoutine: (id: string, data: RoutineData) => void;
  deleteRoutine: (id: string) => void;
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      name: 'Pecho y Triceps',
      muscleGroup: 'Pecho',
      duration: 45,
      createdAt: new Date().toISOString(),
    },
  ]);

  const addRoutine = (data: RoutineData) => {
    const nueva: Routine = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRoutines((prev) => [...prev, nueva]);
  };

  const updateRoutine = (id: string, data: RoutineData) => {
    setRoutines((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutines debe usarse dentro de RoutineProvider');
  }
  return context;
}