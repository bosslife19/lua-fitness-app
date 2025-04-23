import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import img from "../../../assets/images/fitness/Vector.png"
import { router } from 'expo-router';
const GetStartedMain = () => {
    return (
     <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ alignItems:"center",justifyContent:"center", flexDirection:"column",marginTop:"30%",paddingHorizontal:"5%",gap:"6%"}}>
          <Image source={img}
          style={{width:140, height:140, marginHorizontal:"auto" }}
          />   

          <Text style={{color:"#0F172A",fontWeight:700,fontSize:20,fontFamily:"montserratMeduim",}}>Welcome to LUA</Text>
          <Text style={{color:"#64748B",fontWeight:500,fontSize:14,fontFamily:"montserratMeduim",}}> Explore your exercise library to find workouts that match your energy levels</Text>
       
        <TouchableOpacity
            style={[styles.btns, { backgroundColor: "#8A2BE2" }]}
             onPress={()=>router.push("/(tabs)/home")}
           >
            <Text style={[styles.button, { color: "#fff" }]}>Get Started</Text>
             </TouchableOpacity>
        </View>
     </>
    );
}

const styles = StyleSheet.create({
    btns: {
        width: "100%",
        paddingVertical: 17,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#8A2BE2",
      },
      button: {
        fontSize: 18,
        fontFamily:"montserratMeduim",
        fontWeight: "700",
        textAlign: "center",
        color: "#8A2BE2",
      },
})

export default GetStartedMain;
