import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const Preg = ({onNext}) => {
      const [preg, setPreg] = useState("");
      const {makeRequest} = useRequest();
    const handleNext = ()=>{
      if(!preg) return onNext();
      makeRequest('/register', {pregnant:preg}).then(res=>onNext()).catch(e=>console.log(e));

      
    }
    return (
        <View >
            <Text style={styles.TitleHeader}>
            Pregnancy
            </Text>

            <Text style={styles.desc}>
            Share relevant health information while maintaining privacy, agency.
             </Text>
             <Text style={[styles.desc,{marginTop:"10%",fontWeight:"700",color:"#0F172A"}]}>
             Are you currently pregnant or in your postpartum journey?
             </Text>
        <View style={styles.inputContainer}>
        <RNPickerSelect
        // value={gender}
          onValueChange={(value) => setPreg(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
             
          ]}
          placeholder={{ label: "Select your status", value: null ,color:"#94A3B8"}}
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
       maxWidth:"82%"
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
export default Preg;
