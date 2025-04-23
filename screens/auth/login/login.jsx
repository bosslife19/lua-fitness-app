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
import { useRef } from "react";


import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
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
import {AuthContext} from '../../../context/AuthContex'
import { supabase } from "../../../supabase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import SpinningLogo from "@/LoadingScreen/SpinningLogo";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
   const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const { setUserDetails} = useContext(AuthContext);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [authToken, setAuthToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const scrollViewRef = useRef(null);

  
  // Enable button when both email and password fields are filled
  useEffect(() => {
    setIsButtonEnabled(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSignIn = async () => {
  
    if (!email || !password) {
      return Toast.show({
        type: "error",
        text1: "All Fields Required",
        text2: "Please fill in all the fields to continue.",
      });
    }
   
    setButtonSpinner(true);
    setIsButtonEnabled(false); // Disable button when clicked
    
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });

      if (response.data.status) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem("authToken", response.data.token);
        await AsyncStorage.setItem('userDetails', JSON.stringify(response.data.user))
        setUserDetails(response.data.user);
       
          await AsyncStorage.setItem('loggedIn', 'yes');
          const {data} = await supabase.auth.signInWithPassword({email, password})
          if(data){
            Toast.show({
              type: "success",
              text1: "Login Successful",
              text2: "Welcome back!",
            });
            setButtonSpinner(false);
            router.push("/(tabs)/home");
          }else{
            Alert.alert('Error', 'Error occured during login');
          }
        
          

       
      }
      setButtonSpinner(false);
    } catch (error) {
      console.log(error.response.data, error)
      setButtonSpinner(false);
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: "Please provide the correct credentials to login.",
      });
    } finally {
      setButtonSpinner(false);
      setIsButtonEnabled(email.trim() !== "" && password.trim() !== ""); // Re-enable button if fields are filled
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
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#F7EEFD" }}
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled"
  >
    <View
        contentContainerStyle={{
          flexGrow: 1, // Allows content to grow and scroll
          // paddingBottom: "21%,
          height: "100%",
          backgroundColor:"#F7EEFD"
        }}
        keyboardShouldPersistTaps="handled" // Ensures keyboard doesn't block input
        showsVerticalScrollIndicator={false} // Op
        // ref={scrollViewRef}
      >
 
        <View style={styles.container}>
      {/* Image */}
      <Image
        source={require("../../../assets/images/sign2.jpg")}
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
          Welcome back
        </Text>
       
           <Text style={[ SectionsLogin.welcomeText,
            {
              fontFamily: "montserratMeduim",
              color: "#475569",
              fontSize:14,
              paddingHorizontal:20,
              // lineHeight: 43.95,
              fontWeight: "500",
            }
          ]}>
          Sign in to continue your personalized fitness journey
          </Text>
          <View style={SectionsLogin.inputContainer}>
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
                onFocus={() => {
                  setIsFocused(true);
                  // scrollViewRef.current?.scrollToEnd({ animated: true }); // or use scrollTo({ y: someOffset })
                }}
                
                  onBlur={() => setIsFocused(false)}
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setEmail(value)}
                
              />
            </View>

            <View style={[SectionsLogin.contains, isFocused && { borderColor: "#8A2BE2", borderWidth: 1 }]}>
            <Locks/>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 },
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                placeholder="password"
                onFocus={() => {
                  setIsFocused(true);
                  // scrollViewRef.current?.scrollToEnd({ animated: true }); // or use scrollTo({ y: someOffset })
                }}
                // onBlur={() => setIsFocused(false)}
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
             
            <TouchableOpacity
              style={[SectionsLogin.loginButton,
                !isButtonEnabled && { backgroundColor: "#64748B", opacity:0.8 } // Gray out if disabled
              ]}
              onPress={handleSignIn}
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
                  Sign in
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <Text
                style={[
                  SectionsLogin.forgotSection,
                  { fontFamily: "montserratMeduim" },
                ]}
              >
                Forgot Password?
              </Text>
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
                  fontFamily: "montserratMeduim",
                  fontSize: 18,
                  lineHeight: 26.37,
                  fontWeight: "400",
                  color: "#3E3E3E",
                }}
              >
                Don’t have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/register")}>
                <Text style={SectionsLogin.signUpText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
       
       
      </View>
    </KeyboardAwareScrollView>

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
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%", // Adjust this to control the fade intensity
  },
});