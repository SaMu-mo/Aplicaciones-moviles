import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileCardProps = {
  nombre: string;
  cargo: string;
};

export default function ProfileCard({ nombre, cargo }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{nombre.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.cargo}>{cargo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17171D',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3A1414',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E23636',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cargo: {
    fontSize: 13,
    color: '#8A8A94',
    marginTop: 2,
  },
});