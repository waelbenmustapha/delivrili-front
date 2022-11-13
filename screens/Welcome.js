import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Welcome = ({navigation}) => {
  return (
    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("signin")}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
