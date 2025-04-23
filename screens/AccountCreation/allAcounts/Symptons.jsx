import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from '../../../hooks/useRequest';
export default function Symptoms({ onNext }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const {makeRequest} = useRequest()
const handleNext = async()=>{
  const symptomString = selectedSymptoms.join(', ');
  if(!selectedSymptoms){
    onNext();
  }
  const {response, error} = await makeRequest('/register', {symptoms:symptomString});
  if(response){
return onNext()
  }
  console.log(error);
  
}
  const cycleOptions = [
    { label: "Cramps", value: "Cramps" },
    { label: "Fatigue", value: "Fatigue" },
    { label: "Bloating", value: "Bloating" },
    { label: "Mood changes", value: "Mood changes" },
    { label: "Headaches", value: "Headaches" },
    { label: "Back pain", value: "Back pain" },
    { label: "Breast tenderness", value: "Breast tenderness" },
    { label: "Others", value: "Others" },
  ];

  const toggleSelection = (value) => {
    if (selectedSymptoms.includes(value)) {
      // Remove the symptom if already selected
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));
    } else if (selectedSymptoms.length < 3) {
      // Add the symptom only if less than 3 are selected
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  return (
    <View>
<View style={styles.container}>
      <Text style={styles.headerText}>What are you typical symptoms?</Text>
      <Text style={styles.desc}>
      What sort of PMS and period symptoms do you experience?
      </Text>

      {/* Options Grid */}
      <View style={styles.optionsContainer}>
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
                selectedSymptoms.includes(option.value) &&
                  styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: "#F6EBFE",
    // padding: 20,
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
    // textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  optionButton: {
    width: "29%", // Three items per row
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 30,
    backgroundColor: "#F1E2FF",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    color: "#0F172A",
    fontSize: 13,
    fontFamily: "montserratMeduim",
    fontWeight: "500",
    textAlign: "center",
    marginVertical:"auto",

  },
  selectedOption: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
    backgroundColor: "#EDE2FF",
    borderRadius:30,
  },
  selectedOptionText: {
    color: "#8A2BE2",
    fontWeight: "bold",
    marginVertical:"auto",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: "#8A2BE2",
    fontWeight: "600",
    textAlign: "center",
    marginVertical:"auto",
    width:"100%"

  },
});
