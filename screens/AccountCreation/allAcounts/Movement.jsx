import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing icon for checkmark
import home from "../../../assets/images/fitness/Group.png";
import Equip from "../../../assets/images/fitness/fluent_dumbbell-16-filled.png";
import Comm from "../../../assets/images/fitness/tdesign_building-filled.png";
import gym from "../../../assets/images/fitness/solar_dumbbells-2-bold.png";
import Outdoor from "../../../assets/images/fitness/ri_tree-fill.png";
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";

export default function Movement({onNext}) {
  const [selectedCycle, setSelectedCycle] = useState(null);
const {makeRequest} = useRequest()
  const cycleOptions = [
    { label: "Home space", img: home, value: "Home space", text: "Any room with open floor space" },
    { label: "Equipment filled room", img: Equip, value: "Equipment filled room", text: "Any room with fitness equipment" },
    { label: "Community center", img: Comm, value: "Community center", text: "Shared community facility" },
    { label: "Community gym", img: gym, value: "Community gym", text: "Commercial gym facility" },
    { label: "Outdoor space", img: Outdoor, value: "Outdoor space", text: "Parks, trails, open area" },
  ];

  const handleNext = async()=>{
    if(!selectedCycle) onNext();
    const {response} = await makeRequest('/register', {movementSpace:selectedCycle});
    if(response){
      return onNext()
    }

    Alert.alert('Error', 'Server Error');
    
  }
  return (
    <View>
<View style={styles.container}>
      <Text style={styles.headerText}>Movement space</Text>
      <Text style={styles.desc}>This helps us better understand your fitness journey</Text>

      {/* Vertical Scrollable List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {cycleOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.optionButton, selectedCycle === option.value && styles.selectedOption]}
            onPress={() => setSelectedCycle(option.value)}
          >
            <View style={styles.imageContainer}>
              <Image source={option.img} style={styles.image} />
              {/* Checkbox */}
              <View style={[styles.checkbox, selectedCycle === option.value && styles.checkedBox]}>
                {selectedCycle === option.value && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
            </View>

            <Text style={[styles.optionText, selectedCycle === option.value && styles.selectedOptionText]}>
              {option.label}
            </Text>
            <Text style={[styles.optionText, { color: "#64748B", fontWeight: "500", fontSize: 12 }]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
      // flex: 1, // Allow scrolling
      backgroundColor: "#F8EFFE",
      // marginBottom: 220,
      // height:"auto"
    },
    headerText: {
      color: "#0F172A",
      fontSize: 26,
      fontWeight: "700",
      fontFamily: "montserratMeduim",
      marginBottom: 10,
      // textAlign: "center",
    },
    desc: {
      color: "#64748B",
      fontFamily: "montserratMeduim",
      fontWeight: "500",
      fontSize: 14,
      maxWidth: "80%",
      marginBottom: 20,
    },
    scrollContainer: {
       flexDirection: "row",
      // justifyContent: "center",
      marginBottom:"20%",
      alignItems: "center",
      flexWrap:"wrap",
      // width:"100%",
      // gap: 1
    },
    imageContainer: {
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between",
      },
    optionButton: {
      height:"32%",
      width: "46%", // Takes full width for vertical stacking
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 15,
      backgroundColor: "#F7EAFF",
      borderWidth: 1,
      borderColor: "#8A2BE2",
      // alignItems: "center",
      marginBottom: 15, // Space between options
      flexDirection: "column",
      marginHorizontal:5
    },
    optionText: {
      color: "#0F172A",
      fontSize: 15,
      fontFamily: "montserratMeduim",
      fontWeight: "bold",
      // textAlign: "center",
    },
    selectedOptionText: {
      fontFamily: "montserratMeduim",
    },
    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 2,
      borderColor: "#8A2BE2",
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
      marginLeft:"auto"
    },
    checkedBox: {
      backgroundColor: "#0D9488", // Green when selected
      borderColor: "#0D9488",
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "contain",
      },
  });
  