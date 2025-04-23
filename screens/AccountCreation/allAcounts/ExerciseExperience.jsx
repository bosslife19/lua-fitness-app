import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import weight from "../../../assets/images/fitness/gym.png"
import Cardio from "../../../assets/images/fitness/healthicons_running-outline-24px.png"
import Dance from "../../../assets/images/fitness/mdi_human-female-dance.png"
import Yoga from "../../../assets/images/fitness/mdi_yoga.png"
import TeamSport from "../../../assets/images/fitness/ri_team-fill.png"
import Others from "../../../assets/images/fitness/mdi_dance-ballroom.png"
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";



export default function ExerciseExperience({onNext} ) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const {makeRequest} = useRequest()

  const cycleOptions = [
    { label: "weights", value: "weights", img:weight },
    { label: "Cardio", value: "Cardio",img: Cardio },
    { label: "Dance", value: "Dance", img: Dance },
    { label: "Yoga", value: "Yoga",img:Yoga },
    { label: "Team sports", value: "Team sports",img: TeamSport},
    { label: "Others", value: "Others",img: Others },

   ];

   const handleNext = async ()=>{
    const symptomString = selectedSymptoms.join(', ');
    if(!selectedSymptoms){
      return onNext()
    }
    const {response, error} = await makeRequest('/register', {exerciseExperience:symptomString})
    if(response){
      onNext()
    }
   
  if(error){
    console.log(error)
  }
   }
  const toggleSelection = (value) => {
    if (selectedSymptoms.includes(value)) {
      // Remove the symptom if already selected
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));
    } else if (selectedSymptoms.length < 1) {
      // Add the symptom only if less than 3 are selected
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.headerText}>Exercise experience types</Text>
      <Text style={styles.desc}>
      Tell us more about your experience 
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
             <Image
             source={option.img}
            //    source={require("../../../assets/images")}
               resizeMode="cover"
               style={{height:20, width:20}}
               />
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
    justifyContent: "flex-start",
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
    backgroundColor: "#F1E2FF",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    alignItems: "center",
    marginBottom: 10,
    flexDirection:"row",
    gap:5
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
