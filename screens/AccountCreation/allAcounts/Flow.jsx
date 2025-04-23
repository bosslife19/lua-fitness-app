import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import SectionsLogin from "../../../styles/Login/Login.styles";
import { useRequest } from "../../../hooks/useRequest";

export default function FlowSlider({onNext}) {
  const [flowLevel, setFlowLevel] = useState(0);
  const {makeRequest} = useRequest();
const handleNext = async()=>{
  if(!flowLevel){
    onNext()
  }

 const {response, error} = await makeRequest('/register', {flowLevel: flowLevels[flowLevel]});
 if(response){
  onNext();
 }
}
  // Flow labels (Full name and Abbreviation)
  const flowLevels = [
    { full: "Light", short: "L" },
    { full: "Medium Light", short: "ML" },
    { full: "Medium", short: "M" },
    { full: "Medium High", short: "MH" },
    { full: "High", short: "H" },
    { full: "Ultra High", short: "UH" },
  ];

  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.headerText}>What is your typical flow?</Text>
      <Text style={styles.desc}>
      Light, medium light, medium, medium high, high, ultra high
        </Text>

      {/* Slider Component */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={5}
        step={1}
        value={flowLevel}
        onValueChange={(value) => setFlowLevel(value)}
        minimumTrackTintColor="#8A2BE2"
        maximumTrackTintColor="#D8BFD8"
        thumbTintColor="#8A2BE2"
      />

      {/* Labels Below Slider (Short Form) */}
      <View style={styles.labelsContainer}>
        {flowLevels.map((level, index) => (
          <Text key={index} style={[styles.label, flowLevel === index && styles.selectedLabel]}>
            {level.short}
          </Text>
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
    paddingHorizontal: 0,
    backgroundColor: "#F8EFFE",
    alignItems: "center",
  },
  headerText: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "montserratMeduim",
    marginBottom: 10,
    // maxWidth:"70%"
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
  slider: {
    width: "100%",
    height: 40,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: "montserratMeduim",
  },
  selectedLabel: {
    color: "#8A2BE2",
    fontWeight: "bold",
  },
  selectedText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A2BE2",
    fontFamily: "montserratMeduim",
  },
});
