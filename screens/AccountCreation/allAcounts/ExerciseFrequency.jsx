import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const ExerciseFrequency = ({onNext}) => {
      const [exercise, setExercise] = useState("");
      const {makeRequest} = useRequest()
    const handleNext = async()=>{
      if(!exercise){
        onNext()
      }
      const {response} = await makeRequest('/register', {exerciseFrequency:exercise});
      if(response){
        return onNext();
      }
      Alert.alert('Error', 'Server Error');
    }
    return (
        <View>
            <Text style={styles.TitleHeader}>
            Exercise frequency
            </Text>

            <Text style={styles.desc}>
            Tell us more about your experience 
             </Text>
        <View style={styles.inputContainer}>
        <RNPickerSelect
        // value={gender}
          onValueChange={(value) => setExercise(value)}
          
          items={[
            { label: "Daily", value: "Daily" },
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
             
          ]}
          placeholder={{ label: "Frequency", value: null }}
          style={pickerStyles}
        />
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
    desc:{
        color:"#64748B",
        fontFamily:"montserratMeduim",
        fontWeight:500,
        fontSize:14,
       maxWidth:"80%"
    },
    inputContainer:{
      borderWidth:1,
      borderColor:"#ECDAFE",
      borderRadius:30,
      backgroundColor:"#F8F1FF",
      marginTop:"10%"
  },
    TitleHeader:{
        color:"#0F172A",
        fontSize:26,
        fontWeight:700,
        fontFamily:"montserratMeduim",
        marginBottom:10
    },
    input:{
         borderWidth:1,
         paddingLeft:20,
         paddingBottom:20,
         paddingTop:20,
         marginTop:20,
         borderColor:"#ECDAFE",
         borderRadius:30
    }
})

// Custom picker styles
const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    color: "#0F172A",
    fontFamily: "montserratMeduim",
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 5,
    color: "#0F172A",
    fontFamily: "montserratMeduim",
  },
};
export default ExerciseFrequency;
