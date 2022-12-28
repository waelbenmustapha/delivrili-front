import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const CreateOffer = () => {
  const auth = useAuth();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [weight, setWeight] = useState();
  const [pickUp, setPickUp] = useState();
  const [dropDown, setDropDown] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [locationType, setLocationType] = useState("pick");
  const [marker, setMarker] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  function submit() {
    if (name && image && price && weight && pickUp && dropDown) {
      axios
        .post("http://192.168.43.101:8090/offer/add-offer", {
          date: date,
          pickUpLocation: pickUp,
          dropDownLocation: dropDown,
          sender: { id: auth.user.id },
          name: name,
          weight: weight,
          image: image,
          price: price,
        })
        .then((res) => Alert.alert("Added successfuly"))
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Please fill all fields");
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    if (mode === "date") {
      setDate(currentDate);
      showTimepicker();
    } else if (mode === "time") {
      setDate(currentDate);
      setShow(false);
    }
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      alert("you need to give up permission to work");
    }
  };

  function changePickUp(location) {
    setPickUp(location);
    setMarker(null);
  }
  function changeDropDown(location) {
    setDropDown(location);
    setMarker(null);
  }
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "delivri");
    data.append("cloud_name", "dq1i1g9th");
    fetch("https://api.cloudinary.com/v1_1/dq1i1g9th/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setImage(data.url);
      })
      .catch((err) => {
        alert("error while uploading");
      });
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setMode(currentMode);

      setShow(true);
      // for iOS, add a button that closes the picker
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView
      style={{
        display: "flex",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setMarker(null);
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                setModalVisible(false);
                setMarker(null);
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
                padding: 5,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              X
            </Text>
            <Text
              onPress={() => {
                if (marker) {
                  setModalVisible(false);

                  locationType === "pick"
                    ? changePickUp(marker)
                    : changeDropDown(marker);
                } else {
                  Alert.alert("Please select a location");
                }
              }}
              style={{
                position: "absolute",
                bottom: 10,
                zIndex: 1,
                color: "rgba(255,255,255,0.8)",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 10,
                backgroundColor: "rgba(133,196,65,0.8)",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Save
            </Text>
            <MapView
              onLongPress={(e) => {
                setMarker(e.nativeEvent.coordinate);
              }}
              style={{
                width: Dimensions.get("window").width * 0.8,
                height: Dimensions.get("window").height * 0.8,
              }}
            >
              {marker && <Marker coordinate={marker} />}
            </MapView>
          </View>
        </View>
      </Modal>

      <Text style={styles.txt}>Name</Text>

      <TextInput
        onChangeText={(e) => setName(e)}
        style={{
          borderWidth: 3,
          flex: 1,
          height: 50,
          borderColor: "#c7eae4",
          backgroundColor: "#ededed",
          padding: 5,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      />

      <Text style={styles.txt}>Image</Text>
      <TouchableOpacity onPress={() => pickFromGallery()}>
        <Image
          style={{ height: 100, width: 100 }}
          source={{
            uri: image
              ? image
              : "https://static.thenounproject.com/png/49665-200.png",
          }}
        />
      </TouchableOpacity>

      <Text style={styles.txt}>Weight in KG</Text>

      <TextInput
        keyboardType="numeric"
        onChangeText={(e) => setWeight(e)}
        style={{
          borderWidth: 3,
          padding: 5,
          borderColor: "#c7eae4",
          backgroundColor: "#ededed",

          height: 50,
          flex: 1,
          borderRadius: 10,
        }}
      />

      <Text style={styles.txt}>Price in DT</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(e) => setPrice(e)}
        style={{
          borderWidth: 3,
          height: 50,
          padding: 5,
          borderColor: "#c7eae4",
          backgroundColor: "#ededed",

          flex: 1,
          borderRadius: 10,
        }}
      />
      <Text style={styles.txt}>Pick Up Date</Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0,0,0,0.3)",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity onPress={showDatepicker}>
          <Image
            style={{ height: 70, width: 70 }}
            source={{
              uri: "https://iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.ico",
            }}
          />
        </TouchableOpacity>
        {date && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              marginLeft: 7,
              color: "black",
            }}
          >
            {date.toDateString() + "-" + date.toLocaleTimeString()}
          </Text>
        )}
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0,0,0,0.3)",
          paddingBottom: 10,
        }}
      >
        <Text style={styles.txt}>Pick Up Location</Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setLocationType("pick");
          }}
        >
          <Image
            source={{
              uri: "https://www.upload.ee/image/14592379/image_2022-10-17_232512491-removebg-preview__1_.png",
            }}
            style={{ height: 80, width: 80 }}
          />
        </TouchableOpacity>
        {pickUp && (
          <Image
            style={{ height: 30, width: 30 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png",
            }}
          />
        )}
      </View>
      <Text style={styles.txt}>Drop Down Location</Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setLocationType("drop");
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2075/2075097.png",
          }}
          style={{ height: 80, width: 80 }}
        />
      </TouchableOpacity>
      {dropDown && (
        <Image
          style={{ height: 30, width: 30 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png",
          }}
        />
      )}
      <TouchableOpacity
        style={{
          alignSelf: "center",
          paddingVertical: 10,
          marginVertical:20,
          paddingHorizontal: 20,
          backgroundColor: "green",
          borderRadius: 5,
        }}
        onPress={() => {
          submit();
        }}
      >
        <Text style={{ color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "relative",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  txt: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 20,
    color: "black",
  },
});

export default CreateOffer;
