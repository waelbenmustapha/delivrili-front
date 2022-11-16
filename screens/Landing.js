import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Landing = ({ navigation }) => {
  const auth = useAuth();
  useEffect(() => {
    setTimeout(() =>
      !auth.user
        ? (navigation.replace("signin"), 2000)
        : auth.user.role === "sender"
        ? (navigation.replace("tabs-sender"), 2000)
        : auth.user.role === "delivery"
        ? (navigation.replace("tabs-delivery"), 2000)
        : (navigation.replace("signin"), 2000)
    );
  }, []);

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
};

export default Landing;
