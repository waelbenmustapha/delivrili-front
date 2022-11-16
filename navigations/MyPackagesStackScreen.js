import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPackagesSender from "../screens/MyPackagesSender";
import PackageRequests from "../screens/PackageRequests";
const Stack = createStackNavigator();

const MyPackagesStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mypackages" component={MyPackagesSender} />
      <Stack.Screen name="packagerequests" component={PackageRequests} />
    </Stack.Navigator>
  );
};

export default MyPackagesStackScreen;
