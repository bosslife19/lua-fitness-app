import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";
 
 
export default function DailyActivity( {onNext}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const {makeRequest} = useRequest()
  const cycleOptions = [
    { label: "Mostly sedentary", value: "Mostly sedentary", Text:"Sitting most of the day" },
    { label: "Light activity", value: "Light activity",Text: "some walking" },
    { label: "Moderately active", value: "Moderately active", Text: "Regular movement" },
    { label: "Very active", value: "Very active",Text: "Constant movement" },
   
   ];

  const toggleSelection = (value) => {
    if (selectedSymptoms.includes(value)) {
      // Remove the symptom if already selected
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));
    } else if (selectedSymptoms.length < 1) {
      // Add the symptom only if less than 3 are selected
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const handleNext = async()=>{
    
    const symptomString = selectedSymptoms.join(', ');
    if(!selectedSymptoms){
      return onNext()
    }
    const {response} = await makeRequest('/register', {activityLevel:symptomString});
    if(response){
      return onNext()
    }
    Alert.alert('Error', 'Server Error');
    
  }
  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.headerText}>Daily activity level</Text>
      <Text style={styles.desc}>
      What is your typical activity level during the day?
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

            <Text
              style={[
                styles.desc,
                selectedSymptoms.includes(option.value) &&
                  styles.selectedOptionText,{fontSize:12,textAlign:"center"}
              ]}
            >
              {option.Text}
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
    marginBottom: 5,
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
    justifyContent: "center",
    // gap: 10,
    alignItems: "center",

  },
  optionButton: {
    width:"40%",
    height:"36%",
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: "#F1E2FF",
    borderWidth: 1,
    borderColor: "#8A2BE2",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal:"1%",
    // marginLeft:"auto",
    justifyContent:"center",
    // flexDirection:"row",
    // gap:5
  },
  optionText: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: "montserratMeduim",
    fontWeight: "700",
    textAlign: "center",
    // marginVertical:"auto",

  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#8A2BE2",
    backgroundColor: "#EDE2FF",
    // borderRadius:30,
  },
  selectedOptionText: {
    // color: "#8A2BE2",
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
