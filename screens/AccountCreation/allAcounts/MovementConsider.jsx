import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const MovementConsider = ({onNext}) => {
      const [movementConsider, setMovementConsider] = useState("");
      const {makeRequest} = useRequest()
    const handleNext = ()=>{
      if(!movementConsider) return onNext();
      makeRequest('/register', {movementConsiderations: movementConsider}).then(res=>{
        onNext();
      }).catch(error=>console.log(error));
    }
    return (
        <View>
            <Text style={styles.TitleHeader}>
            Movement considerations
            </Text>

            <Text style={styles.desc}>
            Share relevant health information while maintaining privacy, agency.
             </Text>
             <Text style={[styles.desc,{marginTop:"10%",fontWeight:"700",color:"#0F172A"}]}>
             Please indicate any areas where you experience discomfort or need additional movement support
             </Text>
        <View style={styles.inputContainer}>
          <TextInput
                             keyboardType="default"
                                placeholder="Write your thoughts"
                                style={styles.input}
                                multiline={true} 
                                numberOfLines={4} 
                                onChangeText={val=>setMovementConsider(val)}
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
export default MovementConsider;
