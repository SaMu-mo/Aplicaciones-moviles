import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ProductoProvider } from "./src/context/ProductoContext";
import ProductosScreen from "./src/screens/ProductosScreen";
import NuevoProductoScreen from "./src/screens/NuevoProductoScreen";
import { TabParamList } from "./src/types/producto";

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  return (
    <ProductoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#16a34a",
            tabBarInactiveTintColor: "#98a2b3",
            headerStyle: { backgroundColor: "#101828" },
            headerTintColor: "#ffffff",
          }}
        >
          <Tab.Screen
            name="Productos"
            component={ProductosScreen}
            options={{
              title: "Inventario",
              tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="NuevoProducto"
            component={NuevoProductoScreen}
            options={{
              title: "Nuevo Producto",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </ProductoProvider>
  );
}
