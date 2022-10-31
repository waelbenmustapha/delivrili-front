import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PackagesNearBy from "./PackagesNearBy";
import CreateOffer from "./CreateOffer";
import Signup from "./Signup";
import Signin from "./Signin";
import Landing from "./Landing";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./Profile";
import SignupSender from "./SignupSender";
import SignupDelivery from "./SignupDelivery";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="signup-sender" component={SignupSender} />
      <Stack.Screen name="signup-delivery" component={SignupDelivery} />
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="tabs-sender" component={TabNavSender} />
      <Stack.Screen name="tabs-delivery" component={TabNavDelivery} />
    </Stack.Navigator>
  );
}
function TabNavSender() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create Offer" component={CreateOffer} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function TabNavDelivery() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="NearBy" component={PackagesNearBy} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
  
      <NavigationContainer>
          <AuthProvider>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <MyStack />
        </AuthProvider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
