import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = ({ navigation }) => {
  const auth = useAuth();
  const connectedUser = auth.user;
  return (
    <View style={{ display: "flex", flex: 1, justifyContent: "center" }}>
      <Text
        style={{
          marginLeft: "15%",
          marginVertical: 10,
          fontSize: 16,
          fontWeight: "600",
          opacity: 0.7,
        }}
      >
        Name:
      </Text>
      <TextInput
        value={connectedUser?.name}
        style={{
          borderWidth: 1,
          width: "70%",
          alignSelf: "center",
          borderRadius: 10,
          padding: 5,
        }}
      />

      {connectedUser?.role === "delivery" && (
        <>
          <Text
            style={{
              marginLeft: "15%",
              marginVertical: 10,
              fontSize: 16,
              fontWeight: "600",
              opacity: 0.7,
            }}
          >
            Vehicle:
          </Text>
          <TextInput
            value={connectedUser?.vehicle}
            style={{
              borderWidth: 1,
              width: "70%",
              alignSelf: "center",
              borderRadius: 10,
              padding: 5,
            }}
          />
        </>
      )}
      <Text
        style={{
          marginLeft: "15%",
          marginVertical: 10,
          fontSize: 16,
          fontWeight: "600",
          opacity: 0.7,
        }}
      >
        Email:
      </Text>
      <TextInput
        value={connectedUser?.email}
        style={{
          borderWidth: 1,
          width: "70%",
          alignSelf: "center",
          borderRadius: 10,
          padding: 5,
        }}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          marginTop: 30,
          alignSelf: "center",
          width: "60%",
          backgroundColor: "#ccefef",
        }}
        onPress={() => {
          auth.logout();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            opacity: 0.8,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
