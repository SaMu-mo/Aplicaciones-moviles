import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CompanyHeader from './src/components/CompanyHeader';
import EmployeeList from './src/components/EmployeeList';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#E23636" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <CompanyHeader />
        </View>
        <View style={styles.listContainer}>
          <EmployeeList />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E23636',
  },
  headerContainer: {
    flex: 3,
    backgroundColor: '#0B0B0F',
  },
  listContainer: {
    flex: 7,
    backgroundColor: '#0B0B0F',
  },
});