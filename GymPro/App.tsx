import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

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
        <NavigationContainer theme={GymProTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="DrawerRoot"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChestDetail"
              component={ChestDetailScreen}
                                          options={{
                title: 'Rutina de Pecho',
                headerStyle: { backgroundColor: '#0B0B0F' },
                headerTintColor: '#FFFFFF',
                headerBackButtonDisplayMode: 'minimal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}