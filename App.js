import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PackagesNearBy from "./screens/PackagesNearBy";
import CreateOffer from "./screens/CreateOffer";
import Signup from "./screens/Signup";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Signin from "./screens/Signin";
import Landing from "./screens/Landing";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./screens/Profile";
import SignupSender from "./screens/SignupSender";
import SignupDelivery from "./screens/SignupDelivery";
import MyPackagesSender from "./screens/MyPackagesSender";
import MyPackagesStackScreen from "./navigations/MyPackagesStackScreen";
import MyRequestsDelivery from "./screens/MyRequestsDelivery";
import MyPickUps from "./screens/MyPickUps";
import { useRef ,useEffect} from "react";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
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
      <Tab.Screen
        options={{
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
        }}
        name="Create Offer"
        component={CreateOffer}
      />
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
      <Tab.Screen
        options={{
          tabBarLabel: "My Packages",
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
        }}
        name="My Packages"
        component={MyPackagesStackScreen}
      />
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
        name="Requests"
        options={{
          tabBarLabel: "Requests",
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
                  source={require("./assets/requestsfocus.png")}
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
                  source={require("./assets/requests.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }}
        component={MyRequestsDelivery}
      />
      <Tab.Screen
        name="Pick-Ups"
        options={{
          tabBarLabel: "Pick-Ups",
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
                  source={require("./assets/pickupfocus.png")}
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
                  source={require("./assets/pickupp.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            );
          },
        }}
        component={MyPickUps}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
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
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}