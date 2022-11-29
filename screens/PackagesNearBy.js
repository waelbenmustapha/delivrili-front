import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import pickup from "../assets/pickup.png";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function PackagesNearBy() {
  const auth = useAuth();
  const [offers, setOffers] = useState([]);
  const requestPickup = (offerid) => {
    axios
      .post(
        "http://192.168.1.61:8090/requests/request-offer/" + auth.user.id + "/" + offerid
      )
      .then(() => Alert.alert("Request was Succesfull"));
  };
  const [selectedOffer, setSelectedOffer] = useState(null);
  function fetchOffers() {
    axios
      .get("http://192.168.1.61:8090/offer/getall")
      .then((res) => setOffers(res.data));
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchOffers();
      console.log("hi");
    }, [])
  );

  return (
    <View style={styles.container}>
      {selectedOffer && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            bottom: 0,
            height: "30%",
            paddingTop: 15,
            width: "100%",
            borderTopLeftRadius: 30,
            display: "flex",

            borderTopRightRadius: 30,
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 5,
              padding: 5,
              zIndex: 55,
            }}
            onPress={() => setSelectedOffer(null)}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              opacity: 0.8,
              left: 20,
              top: 5,
              paddingVertical: 5,
              paddingHorizontal: 15,
              zIndex: 55,
              backgroundColor: "orange",
              borderRadius: 15,
            }}
            onPress={() => {
              requestPickup(selectedOffer.id);
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Request
            </Text>
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{ display: "flex", alignItems: "center" }}
          >
            <Text
              style={{ fontSize: 17, textAlign: "center", marginBottom: 10 }}
            >
              {selectedOffer.name}
            </Text>
            <Image
              source={{ uri: selectedOffer.image }}
              style={{ height: 100, width: 100, marginBottom: 10 }}
            />
            <Text
              style={{ fontSize: 17, textAlign: "center", marginBottom: 10 }}
            >
              {selectedOffer.weight}KG
            </Text>
            <Text
              style={{ fontSize: 17, textAlign: "center", marginBottom: 10 }}
            >
              {new Date(selectedOffer.date).toDateString() +
                " " +
                new Date(selectedOffer.date).toLocaleTimeString()}
            </Text>
            <Text
              style={{ fontSize: 17, textAlign: "center", marginBottom: 10 }}
            >
              {selectedOffer.price}Dt
            </Text>
          </ScrollView>
        </View>
      )}
      <MapView
        initialRegion={{
          latitude: 36.3981215,
          longitude: 10.2935752,
          latitudeDelta: 0.4,
          longitudeDelta: 0.9,
        }}
        style={styles.map}
      >
        {selectedOffer && (
          <Marker coordinate={selectedOffer.dropDownLocation} />
        )}
        {selectedOffer && (
          <Polyline
            strokeWidth={4}
            coordinates={[
              selectedOffer.pickUpLocation,
              selectedOffer.dropDownLocation,
            ]}
          />
        )}
        {offers.map((el) => (
          <Marker
            key={el.id}
            onPress={() => setSelectedOffer(el)}
            coordinate={el.pickUpLocation}
          >
            <Image source={pickup} style={{ height: 35, width: 35 }} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
