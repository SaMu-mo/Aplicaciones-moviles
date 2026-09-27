import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

const COLORES: Record<string, string> = {
  Pecho: '#E23636',
  Espalda: '#3B82F6',
  Piernas: '#22C55E',
  Brazos: '#A855F7',
  Hombros: '#F59E0B',
};
const colorDe = (g: string) => COLORES[g] || '#8A8A94';

export default function ProgressScreen() {
  const { routines } = useRoutines();

  const total = routines.length;
  const duracionTotal = routines.reduce((sum, r) => sum + r.duration, 0);
  const promedio = total > 0 ? Math.round(duracionTotal / total) : 0;

  const conteo: Record<string, number> = {};
  routines.forEach((r) => {
    conteo[r.muscleGroup] = (conteo[r.muscleGroup] || 0) + 1;
  });
  const distribucion = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  const maxBar = distribucion.length ? distribucion[0][1] : 1;
  const grupoTop = distribucion.length ? distribucion[0][0] : '—';

  const destacada = routines.find((r) => r.featured);

  const stats = [
    { label: 'Rutinas', value: total, color: '#E23636', icon: 'barbell' as const },
    { label: 'Min totales', value: duracionTotal, color: '#3B82F6', icon: 'time' as const },
    { label: 'Min promedio', value: promedio, color: '#22C55E', icon: 'pulse' as const },
    { label: 'Grupo top', value: grupoTop, color: '#A855F7', icon: 'trophy' as const },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.header}>Tu Progreso</Text>

      {destacada && (
        <View style={styles.hero}>
          <Ionicons name="star" size={30} color="#F5C518" />
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={styles.heroLabel}>RUTINA DESTACADA</Text>
            <Text style={styles.heroNombre}>{destacada.name}</Text>
            <Text style={styles.heroDato}>
              {destacada.muscleGroup} · {destacada.duration} min
            </Text>
          </View>
        </View>
      )}

      <View style={styles.grid}>
        {stats.map((s) => (
          <View key={s.label} style={styles.stat}>
            <View style={[styles.iconWrap, { backgroundColor: s.color }]}>
              <Ionicons name={s.icon} size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.statNum, { color: s.color }]} numberOfLines={1} adjustsFontSizeToFit>
              {s.value}
            </Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subheader}>Rutinas por grupo</Text>
      {distribucion.length > 0 ? (
        distribucion.map(([grupo, count]) => (
          <View key={grupo} style={styles.barRow}>
            <Text style={styles.barLabel}>{grupo}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${(count / maxBar) * 100}%`, backgroundColor: colorDe(grupo) },
                ]}
              />
            </View>
            <Text style={styles.barCount}>{count}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.vacio}>Crea rutinas para ver tus estadisticas.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F' },
  header: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', marginBottom: 18 },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245,197,24,0.10)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5C518',
    padding: 16,
    marginBottom: 20,
  },
  heroLabel: { color: '#F5C518', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  heroNombre: { color: '#FFFFFF', fontSize: 19, fontWeight: 'bold', marginTop: 2 },
  heroDato: { color: '#8A8A94', fontSize: 13, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: {
    width: '47%',
    backgroundColor: '#141419',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#26262F',
    padding: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNum: { fontSize: 26, fontWeight: '900' },
  statLabel: { color: '#8A8A94', fontSize: 12, marginTop: 4 },
  subheader: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 28, marginBottom: 16 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  barLabel: { color: '#FFFFFF', fontSize: 13, width: 70 },
  barTrack: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1E1E26',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  barFill: { height: '100%', borderRadius: 7 },
  barCount: { color: '#8A8A94', fontSize: 13, width: 22, textAlign: 'right' },
  vacio: { color: '#8A8A94', fontSize: 14 },
});