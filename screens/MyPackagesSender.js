import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const MyPackagesSender = ({navigation}) => {
  const auth = useAuth();
  const [mypackages, setMypackages] = useState([]);
  const fatchMyPackages = () => {
    axios
      .get("http://192.168.43.101:8090/offer/get-offers-by-user/" + auth.user.id)
      .then((res) => {
        setMypackages(res.data);
        console.log(res.data);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fatchMyPackages();
    }, [])
  );

  return (
    <ScrollView>
      {mypackages.map((el) => (
        <TouchableOpacity
        onPress={()=>navigation.navigate("packagerequests",{id:el.id})}
          style={{
            backgroundColor: "white",
            height: 150,
            margin: 15,
            borderRadius: 15,
            elevation: 7,
            padding: 10,
          }}
          key={el.id}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{el.name}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={{ uri: el.image }}
              style={{
                height: 100,
                width: 100,
                marginTop: 5,
                borderRadius: 10,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 25,
                  marginBottom: 10,
                }}
              >
                Price : {el.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                Weight : {el.weight}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  marginBottom: 10,
                  fontWeight: "500",
                  color:el.status==="accepted"?"green":"black"
                }}
              >
                Status : {el.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
    </ScrollView>
  );
};

export default MyPackagesSender;
