import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const MyRequestsDelivery = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [filter, setFilter] = useState("all");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const auth = useAuth();
  const [requests, setRequests] = useState([]);
  const fetchData = () => {
    axios
      .get("http://192.168.43.101:8090/requests/getbydelid/" + auth.user.id)
      .then((res) => setRequests(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{display:"flex",flex:1}}>
      <View style={{ display: "flex", flexDirection: "row",justifyContent:"space-around" }}>
        <TouchableOpacity
          style={styles.filterbutton}
          onPress={() => setFilter("accepted")}
        >
          <Text style={{color:filter==="accepted"?"#fc8783":"black"}}>accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterbutton}
          onPress={() => setFilter("pending")}
        >
          <Text style={{color:filter==="pending"?"#fc8783":"black"}}>pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterbutton}
          onPress={() => setFilter("rejected")}
        >
          <Text style={{color:filter==="rejected"?"#fc8783":"black"}}>rejected</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterbutton}
          onPress={() => setFilter("all")}
        >
          <Text style={{color:filter==="all"?"#fc8783":"black"}}>all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requests
          .filter((el) => {
            if (filter === "all") {
              return el;
            } else {
              return el.status === filter;
            }
          })
          .map((el) => (
            <TouchableOpacity
            onPress={()=>{Alert.alert("Details",`Sender Name :${el.offer.sender.name}  \nSender Email : ${el.offer.sender.email}`);console.log(el)}}
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {el.offer.name}
              </Text>
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
                      color:
                        el.status === "accepted"
                          ? "green"
                          : el.status === "rejected"
                          ? "red"
                          : "black",
                    }}
                  >
                    Status : {el.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  filterbutton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginHorizontal: 10,
    backgroundColor: "#dedede",
  },
});

export default MyRequestsDelivery;
