import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SectionsLogin from '../../../styles/Login/Login.styles';
import { useRequest } from '../../../hooks/useRequest';

const BirthControl = ({onNext}) => {
  const [birthConrolType, setBirthControlType] = useState('')
  const {makeRequest} = useRequest();
    const handleNext = async()=>{
      if(!birthConrolType){
       return onNext()

      }
      try {
        const { error} =await makeRequest('/register', {birthControlType:birthConrolType});
      if(error){
         return Alert.alert('Error', error);
      }
      } catch (error) {
        console.log(error)
      }
      
         onNext()
    }
    return (
        <View>
            <Text style={styles.TitleHeader}>
            Birth Control
            </Text>
            <Text style={styles.desc}>
            If you take birth control, please specify the form you are using.
            </Text>
            <TextInput
             keyboardType="default"
                placeholder="Write your thoughts"
                style={styles.input}
                multiline={true} // Enables multi-line input
                numberOfLines={4} // Sets the default number of visible lines
                onChangeText={(val)=>setBirthControlType(val)}
            />
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
    desc: {
        color: "#64748B",
        fontFamily: "montserratMeduim",
        fontWeight: "500",
        fontSize: 14,
        maxWidth: "70%",
    },
    TitleHeader: {
        color: "#0F172A",
        fontSize: 26,
        fontWeight: "700",
        fontFamily: "montserratMeduim",
        marginBottom: 10,
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
});

export default BirthControl;
