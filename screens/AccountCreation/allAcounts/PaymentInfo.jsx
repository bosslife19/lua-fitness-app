import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from "react-native";
import SectionsLogin from "../../../styles/Login/Login.styles";

export default function PaymentInfo({onNext}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardName, setCardName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleNext = ()=>{
    onNext()
  }

  return (
    <View>

    
    <View style={styles.container}>
      <Text style={styles.header}>Payment Information</Text>

      {/* Card Number */}
      <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
          placeholder="Card Number"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

    <View style={{flexDirection:"row", alignItems:"center",gap:20}}>
          {/* Expiration Date */}
      <View style={[SectionsLogin.contains, {height:"65%", borderColor: "#ECDAFE", borderWidth: 1 ,width:"47%"}]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
          placeholder="Expiration Date (MM/YY)"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          keyboardType="numeric"
          value={expirationDate}
          onChangeText={setExpirationDate}
        />
      </View>

      {/* CVV */}
      <View style={[SectionsLogin.contains, {height:"65%", borderColor: "#ECDAFE", borderWidth: 1 ,width:"45%"}]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder ]}
          placeholder="CVV"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

    </View>
      {/* Zip Code */}
      <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
          placeholder="Zip Code"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          keyboardType="numeric"
          value={zipCode}
          onChangeText={setZipCode}
        />
      </View>

      {/* Name on Card */}
      <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
          placeholder="Name on Card"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          value={cardName}
          onChangeText={setCardName}
        />
      </View>

      {/* Billing Address */}
      <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
        <TextInput
          style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
          placeholder="Billing Address"
          placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
          value={billingAddress}
          onChangeText={setBillingAddress}
        />
      </View>
    </View>
    <TouchableOpacity
                    style={[SectionsLogin.loginButton]}
                    onPress={handleNext}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6ECFE",
    paddingVertical: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "montserratMeduim",
    marginBottom: 15,
    color: "#0F172A",
  },
  inputContainer: {
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    fontFamily: "montserratMeduim",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#0F172A",
  },
  iosPlaceholder: {
    color: "#94A3B8",
  },
});
