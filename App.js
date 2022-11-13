import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
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
import MyPackagesSender from "./MyPackagesSender";

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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fc8783",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 45,
        },
      }}
    >
      <Tab.Screen  options={{
          tabBarLabel: "Send",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/sendfocus.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/send.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }} name="Create Offer" component={CreateOffer} />
      <Tab.Screen
        options={{
         
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/profilefocus.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/profile.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen  options={{
          tabBarLabel: "Send",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/packagesfocus.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/packages.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }} name="My Packages" component={MyPackagesSender} />
    </Tab.Navigator>
  );
}
function TabNavDelivery() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fc8783",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 45,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
      name="nearby"
        options={{
          tabBarLabel: "NearBy",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/nearbyfocus.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/nearby.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }}
        component={PackagesNearBy}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "NearBy",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/profilefocus.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={require("./assets/profile.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
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
