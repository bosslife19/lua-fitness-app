import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const Medical = ({onNext}) => {
      const [medical, setMedical] = useState("");
      const {makeRequest} = useRequest()
      const handleNext = async ()=>{
        if(!medical) return onNext();

        const {response} = await makeRequest('/register', {medicalHistory:medical});

        if(response) return onNext();

        Alert.alert('Error', 'Server Error');
      }
    
    return (
        <View>
            <Text style={styles.TitleHeader}>
           Medical history questions
            </Text>

            <Text style={styles.desc}>
            Share relevant health information while maintaining privacy, agency.
             </Text>
             <Text style={[styles.desc,{marginTop:"10%",fontWeight:"700",color:"#0F172A"}]}>
             Please tell us any current or past health considerations that may affect your movement
             </Text>
        <View style={styles.inputContainer}>
        <TextInput
                     keyboardType="default"
                        placeholder="Write your thoughts"
                        style={styles.input}
                        multiline={true} 
                        numberOfLines={4} 
                        onChangeText={val=>setMedical(val)}
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
    input: {
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingBottom: "30%", // Adjusted for better text entry spacing
      marginTop: 20,
      backgroundColor:"#F8F1FF",
      borderColor: "#ECDAFE",
      borderRadius: 10,
      textAlignVertical: "top", // Ensures text starts at the top (important for textarea-like behavior)
  },
})

// Custom picker styles

export default Medical;
