import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Signup = ({navigation}) => {
  return (
    <View style={{display:"flex",justifyContent:"center",flex:1}}>

      <Text style={{fontSize:18,fontWeight:"600",textAlign:"center",}}>How would you like to use the App ? </Text>
      <Text style={{marginTop:30,textAlign:"center",fontSize:18}}>Sign up as a : </Text>
      <View style={{display:"flex",flexDirection:"row",width:"100%"}}>
      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} onPress={() => {navigation.navigate("signup-sender")}}>
          <LinearGradient colors={["#f3607b", "#fc8783"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sender
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} onPress={() => {navigation.navigate("signup-delivery")}}>
          <LinearGradient colors={["#f3607b", "#fc8783"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Delivery man
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fc8783",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#f3607b",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#f3607b",
  },
  button: {
    alignItems: "center",
    marginTop: 25,
    width:"50%",
  },
  signIn: {
    width: "92%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
export default Signup;
