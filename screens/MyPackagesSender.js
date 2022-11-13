import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const MyPackagesSender = () => {
  const auth = useAuth();
  const [mypackages, setMypackages] = useState([]);
  const fatchMyPackages = () => {
    axios
      .get("http://192.168.1.60:8090/offer/get-offers-by-user/" + auth.user.id)
      .then((res) => {setMypackages(res.data);console.log(res.data)});
  };

  useFocusEffect(
    React.useCallback(() => {
        fatchMyPackages();
    }, [])
  );

  return (
    <View>
      <Text>MyPackagesSender</Text>
      {mypackages.map((el) => (
        <View key={el.id}>
        <Text>{el.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default MyPackagesSender;
