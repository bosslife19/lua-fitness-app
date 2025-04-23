import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Platform } from "react-native";
import SectionsLogin from "../../../styles/Login/Login.styles";
 
 
export default function SubDetails( {onNext}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const cycleOptions = [
    { label: "Annual plan", amount:"$3,057", save:"$162", value: "Annual plan", Text:"One-time yearly payment" },
    { label: "Monthly plan",amount:"$270,00", value: "Monthly plan",Text: " Recurring payment every month" },   
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

  const handleNext = ()=>{
    onNext()
  }

  return (
    <View>

    
    <View style={styles.container}>
      <Text style={[styles.headerText,{marginBottom:30}]}>Subscription Details</Text>
      

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
            
           <View>
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
                  styles.selectedOptionText,{fontSize:12,  maxWidth:"80%",
                  }
              ]}
            >
              {option.Text}
            </Text>
             
           </View>
           <View>
           <Text
              style={[
                styles.optionText,
                selectedSymptoms.includes(option.value) &&
                  styles.selectedOptionText,
                  {color:"#8A2BE2",fontSize:14}
              ]}
            >
              {option.amount} /Month
            </Text>

            {option.save && ( // Only render this block if option.save exists

            <Text
              style={[
                styles.desc,
                selectedSymptoms.includes(option.value) &&
                  styles.selectedOptionText,{ marginHorizontal:"auto",paddingHorizontal:10,paddingBottom:8, fontSize:12,textAlign:"center",backgroundColor:"#2DD4BF", paddingVertical:5, borderRadius:30,fontFamily:"inter",color:"#fff",marginTop:12}
              ]}
            >
             save {option.save}
            </Text>
          )}
           </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[SectionsLogin.contains, 
            { borderColor: "#ECDAFE", borderWidth: 1 }]}>

       <TextInput
         style={[
           SectionsLogin.input,
           { fontFamily: "montserrat", paddingHorizontal: 0 },
         Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
            ]}
             placeholder="Enter DISCOUNT CODE HERE"
              placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
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
    // flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "flex-start",
    // gap: 10,
    alignItems: "flex-start",

  },
  optionButton: {
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent:"space-between",
    width:"100%",
    // height:"40%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#F1E2FF",
    borderWidth: 1,
    borderColor: "#8A2BE2",
    alignItems: "center",
    marginBottom: 10,
    // marginHorizontal:"1%",
    // marginLeft:"auto",
    // justifyContent:"center",
    // flexDirection:"row",
    // gap:5
  },
  optionText: {
    color: "#0F172A",
    fontSize: 17,
    fontFamily: "montserratMeduim",
    fontWeight: "700",
    // textAlign: "center",
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
