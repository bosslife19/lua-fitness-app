// import Toast from "react-native-toast-message";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (email) {
      setLoading(true);
      try {
        const res = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/user/request-reset-password`,
          { email }
        );
        if (res.data.error) {
          setLoading(false);
          Alert.alert("Error", "This user email does not exist");
        //   Toast.show({
        //     type: "error",
        //     text1: res.data.error,
        //     text2: "The user email does not exist",
        //     position: "top", // Can be 'top', 'bottom', or 'center'
        //     visibilityTime: 4000,
        //   });

          return;
        }
        if (res.data.message) {
          setLoading(false);
        //   Toast.show({
        //     type: "success",
        //     text1: res.data.message,
        //     text2: "Check your email to verify the Otp",
        //     position: "top", // Can be 'top', 'bottom', or 'center'
        //     visibilityTime: 3000,
        //   });
        Alert.alert('OTP sent', 'Check your email to verify otp')
        }

        setTimeout(() => {
          router.push({
            pathname: "/(routes)/password-reset-otp",
            params: { email },
          });
        }, 5000);
      } catch (error) {
        setLoading(false);
        Alert.alert("Email is invalid", "Invalid email entered");
        // Toast.show({
        //   type: "error",
        //   text1: 'Error',
        //   text2: error.response.data.message||'Some error occured. try again',
        // });
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Please enter a valid email address.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{marginVertical:20, left:'5%'}}>
        <TouchableOpacity onPress={() => router.back()}>
          {/* <Image
            source={require("../../../assets/images/headerback.png")}
            width={20}
            height={20}
            resizeMode="contain"
          /> */}
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/logomain.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to reset your password
        </Text>
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={[styles.inputContainer, { top: "-10%" }]}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#6a11cb"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { top: "-10%" }]}
          onPress={handleForgotPassword}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Code</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8A2BE2",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  formContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
