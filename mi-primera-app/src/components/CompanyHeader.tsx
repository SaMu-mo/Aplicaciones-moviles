import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function CompanyHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://ui-avatars.com/api/?name=Gym+Bro&background=0B0B0F&color=E23636&size=120&bold=true' }}
        />
      </View>
      <Text style={styles.title}>GYMBRO</Text>
        <Text style={styles.eslogan}>EL HIERRO AFILA EL HIERRO, Y UN HOMBRE AFILA A OTRO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0F',
  },
  logoWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 3,
    borderColor: '#E23636',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontWeight: '900',
    color: '#FFFFFF',
    fontSize: 26,
    letterSpacing: 2,
    marginTop: 14,
  },
    eslogan: {
    fontWeight: 'bold',
    color: '#E23636',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});