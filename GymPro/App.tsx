import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutineProvider } from './src/context/RoutineContext';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';

const Stack = createNativeStackNavigator();

const GymProTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0B0B0F',
    card: '#0B0B0F',
    primary: '#E23636',
    text: '#FFFFFF',
    border: '#26262F',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
        <RoutineProvider>
          <NavigationContainer theme={GymProTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="DrawerRoot"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RoutineDetail"
                component={RoutineDetailScreen}
                options={{
                  title: 'Detalle de Rutina',
                  headerStyle: { backgroundColor: '#0B0B0F' },
                  headerTintColor: '#FFFFFF',
                  headerBackButtonDisplayMode: 'minimal',
                }}
              />
              <Stack.Screen
                name="AddRoutine"
                component={AddRoutineScreen}
                options={{
                  title: 'Rutina',
                  headerStyle: { backgroundColor: '#0B0B0F' },
                  headerTintColor: '#FFFFFF',
                  headerBackButtonDisplayMode: 'minimal',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RoutineProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}