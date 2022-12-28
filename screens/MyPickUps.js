import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useAuth } from "../context/AuthContext";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyPickUps = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const auth = useAuth();
  const [pickups, setPickUps] = useState([]);
  const fetchData = () => {
    axios
      .get(
        "http://192.168.43.101:8090/offer/get-offers-by-delivery-man/" +
          auth.user.id
      )
      .then((res) => setPickUps(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  //drag

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator >
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={{
            backgroundColor: "white",
            height: 150,
            margin: 15,
            borderRadius: 15,
            elevation: 7,
            padding: 10,
          }}
          key={item.id}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={{ uri: item.image }}
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
                Price : {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                Weight : {item.weight}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 25,
                  marginBottom: 10,
                  fontWeight: "500",
                  color: item.status === "accepted" ? "green" : "black",
                }}
              >
                Status : {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <DraggableFlatList
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={pickups}
        onDragEnd={({ data }) => setPickUps(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyPickUps;
