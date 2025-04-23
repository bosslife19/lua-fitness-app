import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../../header/Header";
import RNPickerSelect from "react-native-picker-select";

const EditWorkout = ({ navigation, addWorkout }) => {
  const [workoutType, setWorkoutType] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [equipment, setEquipment] = useState("");
  const [trainerNotes, setTrainerNotes] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleEditWorkout = () => {
    navigation.goBack();
  };

  const cycleOptions = [
    { label: "Dumbbells", value: "Dumbbells" },
    { label: "Resistance", value: "Resistance" },
    { label: "Bells", value: "Bells" },
    { label: "Rope", value: "Rope" },
    { label: "Dumbbell", value: "Dumbbell" },
    { label: "Yoga mat", value: "Yoga mat" },
     
  ];

  const toggleSelection = (value) => {
    setSelectedSymptoms((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : prev.length < 3 ? [...prev, value] : prev
    );
  };

  return (
    <>
      <Header name="Add workout" arrow="arrow-back" />
      <View style={styles.container}>
      <RNPickerSelect
        onValueChange={setEquipment}
        items={[
          { label: "Strength and Recovery", value: "Strength and Recovery" },
        ]}
        placeholder={{ label: "Workout type", value: "",color:"#000" }}
        style={pickerStyles}
      />
         <RNPickerSelect
        onValueChange={setEquipment}
        items={[
          { label: "10 Minutes", value: "10 Minutes" },
          { label: "30 Minutes", value: "30 Minutes" },
          { label: "45 Minutes", value: "45 Minutes" },
        ]}
        placeholder={{ label: "Workout Duration", value: "Workout Duration", color:"#000" }}
        
        style={pickerStyles}
      />
        
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
                  selectedSymptoms.includes(option.value) && styles.selectedOptionText,
                  
                ]}
                
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Trainer's Note"
          value={trainerNotes}
          onChangeText={setTrainerNotes}
          style={[styles.input,{paddingBottom:70}]}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleEditWorkout}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F1F5F9",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    fontFamily: "montserratMedium",
  },
  button: {
    backgroundColor: "#8A2BE2",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    padding: 4,
    fontFamily: "montserratMedium",
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems:"flex-start",
    backgroundColor:"#fff",
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:15
  },
  optionButton: {
    flexBasis: "30%",
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    color: "#0F172A",
    fontSize: 13,
    fontFamily: "montserratMedium",
    fontWeight: "500",
    textAlign: "center",
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
    // backgroundColor: "#EDE2FF",
  },
  selectedOptionText: {
    color: "#8A2BE2",
    fontWeight: "bold",
  },
});

const pickerStyles = {
  inputIOS: {
    backgroundColor: "#fff",
    padding: 2,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputAndroid: {
    backgroundColor: "#fff",
    padding: 2,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
};

export default EditWorkout;
