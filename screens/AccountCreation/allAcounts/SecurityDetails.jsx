import Toast from "react-native-toast-message";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Locks from "../../../assets/images/lock"
 import { LinearGradient } from "expo-linear-gradient";
import Google from "../../../assets/images/google"
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Redirect, router } from "expo-router";
// import SectionsLogin from "@/styles/Login/Login.styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "@/context/AuthContext";
// import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";
import SpinningLogo from "../../../components/Loading/spinner";
import SectionsLogin from "../../../styles/Login/Login.styles";
import MailIcon from "../../../assets/images/smstracking";
import Apple from "../../../assets/images/apple";
import Facebook from "../../../assets/images/Facebook";
import axiosClient from "../../../axiosClient";
// import SpinningLogo from "@/LoadingScreen/SpinningLogo";

export default function SecurityDetails({onNext}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisibles, setPasswordVisibles] = useState(false);

     const [password, setPassword] = useState("");
     const [confirmpassword, setconfirmpassword] = useState("");
  
  const [isFocused, setIsFocused] = useState(false);

 

  const handleSignIn =async()=>{

    if(password&&confirmpassword){
      if(password!== confirmpassword){
        return Alert.alert("Passwords don't match", 'Confirm password has to be the same with password')
      }
      try {
        const res = await axiosClient.post('/register', {password});
        if(res.data.status){
          return onNext(); 
        }
        throw new Error('Error ocuured')
        
      } catch (error) {
        console.log(error)
      }
      
    }
    
  }

  const handleSkip =() =>{

     // if it will skip to the next page
     onNext(); 
  }
 

  return (
    <>
      <View  style={{paddingHorizontal:"2%"}} >
        <Text 
         style={[
              SectionsLogin.welcomeText,
              {
                fontFamily: "montserratMeduim",
                color: "#0F172A",
                lineHeight: 43.95,
                // fontSize:26,
                 fontWeight: "700",
              },
            ]}
        >
         Security Details
        </Text>
       
           <Text style={[ SectionsLogin.welcomeText,
            {
              fontFamily: "montserratMeduim",
              color: "#475569",
              fontSize:14,
              paddingHorizontal:30,
              // lineHeight: 43.95,
              fontWeight: "500",
            }
          ]}>
            Secure your account with a strong password
        </Text>
          <View style={SectionsLogin.inputContainers}>
          
            <View style={[SectionsLogin.contains, isFocused && { borderColor: "#8A2BE2", borderWidth: 1 }]}>
            <Locks/>
              <TextInput
                style={[
                  styles.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 , marginLeft:5},
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                placeholder="password"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity
                style={[SectionsLogin.visibleIcon, { fontFamily: "montserratMeduim" }]}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={"#747474"} />
                )}
              </TouchableOpacity>
            </View>

            <View style={[SectionsLogin.contains, isFocused && { borderColor: "#8A2BE2", borderWidth: 1 }]}>
            <Locks/>
              <TextInput
                style={[
                  styles.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 ,marginLeft:5},
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                secureTextEntry={!isPasswordVisibles}
                value={confirmpassword}
                 placeholder="confirm password"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setconfirmpassword(value)}
              />
              <TouchableOpacity
                style={[SectionsLogin.visibleIcon, { fontFamily: "montserratMeduim" }]}
                onPress={() => setPasswordVisibles(!isPasswordVisibles)}
              >
                {isPasswordVisibles ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={"#747474"} />
                )}
              </TouchableOpacity>
            </View>
             
            <TouchableOpacity
              style={[SectionsLogin.loginButton,
               ]}
              onPress={handleSignIn}
              >
            
                <Text
                  style={[
                    SectionsLogin.loginButtonText,
                    { fontFamily: "montserratMeduim" },
                  ]}
                >
                 Proceed
                </Text>
              
            </TouchableOpacity>

            <TouchableOpacity style={styles.btns} onPress={handleSkip} >
            <Text style={styles.button}>Skip</Text>
            </TouchableOpacity>

            
          </View>
        </View>
       <Toast />
    </>
  );

}
 

const styles = StyleSheet.create({
  iosPlaceholder: {
    fontFamily: "montserratMeduim", // Ensure the placeholder uses the same font
    color:'#aaa'
  },
  container: {
    position: "relative",
    width: "100%",
    height: 300, // Adjust height as needed
  },
  btns: {
    marginTop:15,
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8A2BE2",
  },
  button: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#8A2BE2",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%", // Adjust this to control the fade intensity
  },
  input:{
    width:"100%"
  }
});