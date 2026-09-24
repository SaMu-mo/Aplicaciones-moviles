import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E23636',
        tabBarInactiveTintColor: '#8A8A94',
        tabBarStyle: {
          backgroundColor: '#0B0B0F',
          borderTopColor: '#26262F',
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Progreso' ? 'stats-chart' : 'barbell';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Rutinas" component={RoutineListScreen} />
    </Tab.Navigator>
  );
}