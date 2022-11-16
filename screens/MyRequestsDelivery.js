import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const MyRequestsDelivery = () => {
    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData()
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const auth = useAuth();
  const [requests,setRequests]=useState([])
  const fetchData = () => {
    axios
      .get("http://192.168.43.100:8090/requests/getbydelid/" + auth.user.id)
      .then((res) => setRequests(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView  refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
      {requests.map((el) => (
        <TouchableOpacity
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{el.offer.name}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={{ uri: el.offer.image }}
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
                Price : {el.offer.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                Weight : {el.offer.weight}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  marginBottom: 10,
                  fontWeight: "500",
                  color:el.status==="accepted"?"green":el.status==="rejected"?"red":"black"
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

export default MyRequestsDelivery;
