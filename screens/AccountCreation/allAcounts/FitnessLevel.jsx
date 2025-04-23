import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";

export default function FitNess({onNext}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const {makeRequest} = useRequest();
 const handleNext = async ()=>{
  const symptomString = selectedSymptoms.join(', ');
  if(!selectedSymptoms){
    return onNext()
  }
  const {response, error} = await makeRequest('/register', {fitnessLevel:symptomString})
  if(response){
    onNext()
  }
 
if(error){
  console.log(error)
}
 }
  const cycleOptions = [
    { label: "Beginner", value: "Beginner", text: "New to exercise" },
    { label: "Novice", value: "Novice", text: "Some exercise experience" },
    { label: "Intermediate", value: "Intermediate", text: "Regular exerciser" },
    { label: "Advanced", value: "Advanced", text: "Very experienced" },
  ];

  const toggleSelection = (value) => {
    if (selectedSymptoms.includes(value)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));
    } else if (selectedSymptoms.length < 1) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.headerText}>Fitness Level</Text>
      <Text style={styles.desc}>Let’s know more about your fitness level</Text>

      {/* Scrollable Options */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {cycleOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedSymptoms.includes(option.value) && styles.selectedOption,
            ]}
            onPress={() => toggleSelection(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedSymptoms.includes(option.value) && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
            <Text style={styles.optionSubText}>{option.text}</Text>
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
    backgroundColor: "#F6EBFE",
    // paddingVertical: 20,
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
    // lineHeight:20,
    // textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    // paddingHorizontal: 10, // Ensures space at the start and end
  },
  optionButton: {
    width: "22%", // Adjust width for better spacing
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#F1E2FF",
    borderWidth: 1,
    borderColor: "#8A2BE2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10, // Space between items
  },
  optionText: {
    color: "#0F172A",
    fontSize: 9.86,
    fontFamily: "montserratMeduim",
    fontWeight: "700",
    textAlign: "center",
  },
  optionSubText: {
    fontSize: 8.52,
    color: "#64748B",
    textAlign: "center",
    marginTop: 2,
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
    backgroundColor: "#EDE2FF",
  },
  selectedOptionText: {
    color: "#8A2BE2",
    fontWeight: "bold",
  },
});

