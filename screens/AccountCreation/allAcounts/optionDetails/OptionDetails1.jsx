import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OptionDetails1({ onNext }) {
  const [selectedCycle, setSelectedCycle] = useState(null);

  const cycleOptions = [
    { label: "🌞 Morning", value: "Morning" },
    { label: "☀️ Afternoon", value: "Afternoon" },
    { label: "🌙 Evening", value: "Evening" },
  ];

  const handleSkip = () => {
    // this will skip
    onNext();
  };

  const handleProceed =()=>{

    // if sucessfull it will go to the next page
    onNext(); 
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Optional Details</Text>
         <Text style={styles.desc}>
         What’s your start date for menstrual tracking?
        </Text>
      {/* First Two Options */}
      <View style={styles.row}>
        {cycleOptions.slice(0, 2).map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedCycle === option.value && styles.selectedOption,
            ]}
            onPress={() => setSelectedCycle(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedCycle === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Last Option Centered */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          styles.centeredOption,
          selectedCycle === cycleOptions[2].value && styles.selectedOption,
        ]}
        onPress={() => setSelectedCycle(cycleOptions[2].value)}
      >
        <Text
          style={[
            styles.optionText,
            selectedCycle === cycleOptions[2].value && styles.selectedOptionText,
          ]}
        >
          {cycleOptions[2].label}
        </Text>
      </TouchableOpacity>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.btns} onPress={handleSkip} >
                  <Text style={styles.buttons}>Skip</Text>
         </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: "2%",
    backgroundColor: "#F8EFFE",
    // flex: 1,
    justifyContent: "center",
  },
  headerText: {
    color:"#0F172A",
    fontSize:26,
    fontWeight:700,
    fontFamily:"montserrat",
    marginBottom:10,
    textAlign:"center"
  },
  desc:{
    color:"#64748B",
    fontFamily:"montserrat",
    fontWeight:500,
    fontSize:14,
//    maxWidth:"80%",
    textAlign:"center",
    marginBottom:20,
},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  optionButton: {
    width:"50%",

    // flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#F8F1FF",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    alignItems: "center",
    marginHorizontal: 5,
  },
  centeredOption: {
    alignSelf: "center",
    width: "80%", 
  },
  optionText: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "montserrat",
    fontWeight: "500",
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
  },
  selectedOptionText: {
    color: "#8A2BE2",
    fontWeight:"bold",
    lineHeight:18,
    fontFamily: "montserrat",
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  btns: {
    marginTop:15,
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8A2BE2",
  },
  buttons: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#8A2BE2",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "montserrat",
    fontWeight: "bold",
  },
});
