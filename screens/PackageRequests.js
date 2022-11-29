import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PackageRequests = ({ route, navigations }) => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const acceptOrReject = (reqid, num) => {
    axios
      .post(
        "http://192.168.1.46:8090/requests/changerequeststatus/" +
          reqid +
          "/" +
          num
      )
      .finally(() => fetchData());
  };
  const fetchData = () => {
    axios
      .get("http://192.168.1.46:8090/requests/getbyofferid/" + id)
      .then((res) => setRequests(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { id } = route.params;
  return (
    <View>
      <TouchableOpacity onPress={() => setFilter("accepted")}>
        <Text>accepted</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("pending")}>
        <Text>rejected</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("rejected")}>
        <Text>pending</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("all")}>
        <Text>all</Text>
      </TouchableOpacity>
      <ScrollView>
        {requests
          .filter((el) => {
            if (filter === "all") {
              return el;
            } else {
              return el.status === filter;
            }
          })
          .map((el) => (
            <View
              style={{
                backgroundColor: "white",
                margin: 15,
                borderRadius: 15,
                elevation: 7,
                padding: 10,
              }}
              key={el.id}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={{
                    uri: "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png",
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 100,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      marginLeft: 25,
                    }}
                  >
                    Name : {el.deliveryMan.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 25,
                      fontWeight: "500",
                    }}
                  >
                    Phone Number : {el.deliveryMan.phoneNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 25,
                      fontWeight: "500",
                    }}
                  >
                    Car : {el.deliveryMan.vehicle}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 25,
                      fontWeight: "500",
                    }}
                  >
                    Email : {el.deliveryMan.email}
                  </Text>
                </View>
              </View>
              {el.status == "pending" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => acceptOrReject(el.id, -1)}
                    style={{
                      marginHorizontal: 10,
                      padding: 5,
                      backgroundColor: "#f44336",
                      borderRadius: 7,
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => acceptOrReject(el.id, 1)}
                    style={{
                      marginHorizontal: 10,
                      padding: 5,
                      backgroundColor: "#4CAF50",
                      borderRadius: 7,
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : el.status == "accepted" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4CAF50",
                    }}
                  >
                    Accepted
                  </Text>
                </View>
              ) : el.status == "rejected" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#f44336",
                    }}
                  >
                    Rejected
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default PackageRequests;
