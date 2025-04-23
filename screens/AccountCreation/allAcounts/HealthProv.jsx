import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const HealthProv = ({onNext}) => {
      const [healthProv, setHealthProv] = useState("");
      const {makeRequest} = useRequest()
    const handleNext=async()=>{
      if(!healthProv) return onNext();
      const {response} = await makeRequest("/register", {healthProv});
      if(response) return onNext();
      Alert.alert('Error', 'Server Error');
    }
    return (
        <View >
            <Text style={styles.TitleHeader}>
            Healthcare Provider
            </Text>

            <Text style={styles.desc}>
            Share relevant health information while maintaining privacy, agency.
             </Text>
             <Text style={[styles.desc,{marginTop:"10%",fontWeight:"700",color:"#0F172A"}]}>
             Has a healthcare provider given you specific movement guidance?
             </Text>
        <View style={styles.inputContainer}>
         <TextInput
                                    keyboardType="default"
                                       placeholder="Write your thoughts"
                                       style={styles.input}
                                       multiline={true} 
                                       numberOfLines={4} 
                                       onChangeText={val=>setHealthProv(val)}
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
        //  borderWidth:1,
         paddingLeft:20,
         paddingBottom:20,
         paddingTop:20,
         marginTop:20,
         borderColor:"#ECDAFE",
         borderRadius:30,
         
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
export default HealthProv;
