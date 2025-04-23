import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for checkbox
import SectionsLogin from "../../../styles/Login/Login.styles";

const Aggrement = ({onNext}) => {
  const [selectedCycle, setSelectedCycle] = useState(false);

  const toggleCheckbox = () => {
    setSelectedCycle(!selectedCycle);
  };
const handleNext = ()=>{
  if(!selectedCycle){
    return Alert.alert('Required', 'Please agree to our waiver release before proceeding')
  }
  onNext()
}
  return (
    <View>
 <View style={styles.container}>
      <Text style={styles.TitleHeader}>
      Waiver, Release and Indemnification Agreement
      </Text>
      <Text style={styles.desc}>
      Before proceeding, please review and agree to our  <Text style={{color:"#8A2BE2", textDecorationLine:"underline"}}>Waiver release and indemnification agreement </Text>      </Text>

      {/* Checkbox Section */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
        <View style={[styles.checkbox, selectedCycle && styles.checkedBox]}>
          {selectedCycle && <Ionicons name="checkmark" size={8} color="white" />}
        </View>
        <Text style={styles.checkboxText}>I understand and consent to participation</Text>
      </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  desc: {
    color: "#64748B",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "montserratMeduim",
    
    marginBottom: 15,
  },
  TitleHeader: {
    color: "#0F172A",
    fontSize: 22,
    fontFamily: "montserratMeduim",
    fontWeight: "700",
    marginBottom: 10,
    maxWidth: "82%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // gap:3,
    marginBottom: 20,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#0D9488",
    borderColor: "#0D9488",
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "montserratMeduim",
    color: "#475569",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F8F1FF",
    borderColor: "#ECDAFE",
    borderRadius: 10,
    textAlignVertical: "top",
    minHeight: 100,
    fontFamily: "montserratMeduim",
  },
});

export default Aggrement;
