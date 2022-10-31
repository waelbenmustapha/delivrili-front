import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDataObj,
  getDataVal,
  storeDataObj,
  storeDataVal,
} from "../utils/AsyncStorageFunctions";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("loading");
  const navigation = useNavigation()
  useEffect(() => {
    getDataObj("user").then((res) => setUser(res));
  }, []);

  const login = (user) => {
    storeDataObj("user", user);
    setUser(user);
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "signin" }],
    });
    setUser(null);
    AsyncStorage.removeItem("user");
    console.log("logging out");
  };
  if (user === "loading") {
    return (
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Welcome to Delivrili ...
        </Text>
        <Image source={require("../assets/loading.gif")} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
