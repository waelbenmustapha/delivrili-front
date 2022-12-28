import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PackageRequests = ({ route, navigations }) => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  async function sendPushNotification(expoPushToken, packagename, status) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Request status change",
      body: "Your request got " + status,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
  const acceptOrReject = (reqid, num) => {
    axios
      .post(
        "http://192.168.43.101:8090/requests/changerequeststatus/" +
          reqid +
          "/" +
          num
      )
      .finally(() => fetchData());
  };
  const fetchData = () => {
    axios
      .get("http://192.168.43.101:8090/requests/getbyofferid/" + id)
      .then((res) => setRequests(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { id } = route.params;
  return (
    <View>
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
                    onPress={() => {
                      acceptOrReject(el.id, -1);
                      sendPushNotification(
                        "ExponentPushToken[pPr4sXE83esKV1THC7aQ4k]",
                        el.name,
                        "Rejected"
                      );
                    }}
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
                    onPress={() => {
                      acceptOrReject(el.id, 1);
                      sendPushNotification(
                        "ExponentPushToken[pPr4sXE83esKV1THC7aQ4k]",
                        el.name,
                        "Accepted"
                      );
                    }}
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

const styles = StyleSheet.create({
  filterbutton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginHorizontal: 10,
    backgroundColor: "#dedede",
  },
})

export default PackageRequests;
