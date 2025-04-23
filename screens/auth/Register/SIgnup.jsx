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
// import SpinningLogo from "@/LoadingScreen/SpinningLogo";

export default function SignupScreen() {
   const [buttonSpinner, setButtonSpinner] = useState(false);
   const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [email, setEmail] = useState("");
   // const { setUserDetails, userDetails } = useContext(AuthContext);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [authToken, setAuthToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  
  // Enable button when both email and password fields are filled
  useEffect(() => {
    setIsButtonEnabled(email.trim() !== "");
  }, [email]);

  const handleSignUp = async () => {
    setButtonSpinner(true);
    
    try {
     
      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/register-email`,{emailFirst:email});
      if(res.data.status){
        
        await AsyncStorage.clear();
        await AsyncStorage.setItem("authToken", res.data.token);
        setTimeout(() => {
        
          setIsButtonEnabled(true);
          router.push("/(routes)/account-creation");
        }, 2000);
        return;
      }
      throw new Error('Sign up failed')
     
    } catch (error) {
      console.log(error)
    }finally{
      setButtonSpinner(false);
    }
    
   };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);
    };
    const checkLogin = async ()=>{
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if(loggedIn){
        setLoggedIn(true);
        setIsInitialized(true);

      }else{
        setLoggedIn(false);
        setIsInitialized(true);

      }
    }
    getToken();
    checkLogin();
  }, []);
  if (!isInitialized) {
    // Render loading state while determining the login status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SpinningLogo/>
      </View>
    );
  }
  // if(loggedIn){
  //   router.push('/(tabs)/home');
  //   return null
  // }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1, // Allows content to grow and scroll
          paddingBottom: "21%",
          height: "100%",
          backgroundColor:"#F7EEFD"
        }}
        keyboardShouldPersistTaps="handled" // Ensures keyboard doesn't block input
        showsVerticalScrollIndicator={false} // Op
      >
       <View style={styles.container}>
      {/* Image */}
      <Image
        source={require("../../../assets/images/sign1.jpg")}
        resizeMode="cover"
        style={SectionsLogin.img}
      />
      
      {/* White Gradient Overlay at the Bottom */}
      <LinearGradient
        colors={["transparent", "rgba(255, 255, 255, 0.73)", "white"]} 
        style={styles.gradient}
      />
      </View>
      
        <View style={{paddingHorizontal:"7%"}}>
          <Image
        source={require("../../../assets/images/load.png")}
        resizeMode="contain"
        style={{height:"14%",marginTop:"-30%", width:"100%"}}
      />
      
       <Text 
         style={[
              SectionsLogin.welcomeText,
              {
                fontFamily: "montserratMeduim",
                color: "#0F172A",
                lineHeight: 43.95,
                // fontSize:26,
                paddingTop:10,
                fontWeight: "700",
              },
            ]}
        >
          Join Your Journey
        </Text>
       
           <Text style={[ SectionsLogin.welcomeText,
            {
              fontFamily: "montserratMeduim",
              color: "#475569",
              fontSize:14,
               paddingHorizontal:10,
              //   lineHeight: 43.95,
              fontWeight: "500",
              marginVertical:20
            }
          ]}>
            Create an account and start transforming your health today          
        </Text>
          <View style={SectionsLogin.inputContainers}>
          <View style={[SectionsLogin.contains, isFocused && 
            { borderColor: "#8A2BE2", borderWidth: 1 }]}>
          <MailIcon/>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 },
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                // keyboardType="email-address"
                value={email}
                placeholder="email"
                onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setEmail(value)}
              />
            </View>
 
            <TouchableOpacity
              style={[SectionsLogin.loginButton,
                !isButtonEnabled && { backgroundColor: "#64748B", opacity:0.8 } // Gray out if disabled
              ]}
              onPress={handleSignUp}
              disabled={!isButtonEnabled}
             >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={[
                    SectionsLogin.loginButtonText,
                    { fontFamily: "montserratMeduim" },
                  ]}
                >
                 Register
                </Text>
              )}
            </TouchableOpacity>
 
             {/* <View style={{paddingVertical:20}}>
              <Text style={{textAlign:"center",color:"#334155",fontFamily:"montserratMeduim", fontWeight:600, fontSize:14}}>Or Sign up With</Text>
              <View style={{flexDirection:"row",gap:10, alignItems:"center",marginTop:20}}>
              <TouchableOpacity>
                  <Facebook/>
                </TouchableOpacity>
             
               
                <TouchableOpacity>
                  <Google/>
                </TouchableOpacity>

                <TouchableOpacity>
              <Image
               source={require("../../../assets/images/appless.png")}
               resizeMode="cover"
               style={{height:57, width:90}}
              />
                </TouchableOpacity>
              </View>
             </View> */}
            <View style={SectionsLogin.signupRedirect}>
              <Text
                style={{
                  fontFamily: "montserratMeduimMeduim",
                  fontSize: 18,
                  lineHeight: 26.37,
                  fontWeight: "400",
                  color: "#3E3E3E",
                }}
              >
                 Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
                <Text style={SectionsLogin.signUpText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );

}
 

const styles = StyleSheet.create({
  iosPlaceholder: {
    fontFamily: "montserratMeduimMeduim", // Ensure the placeholder uses the same font
    color:'#aaa'
  },
  container: {
    position: "relative",
    width: "100%",
    height: 300, // Adjust height as needed
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%", // Adjust this to control the fade intensity
  },
});