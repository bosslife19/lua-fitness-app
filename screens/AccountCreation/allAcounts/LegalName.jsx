import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SectionsLogin from '../../../styles/Login/Login.styles';
import axiosClient from '../../../axiosClient';

const LegalName = ({onNext}) => {
    const [legalName, setLeglName] = useState('')
    const handleNext = async()=>{
        try {
            if(!legalName){
                return Alert.alert('Field is required', 'Please input your legal name to continue')
            }
            const res = await axiosClient.post("/register",{legalName});
            if(res.data.status){
               return onNext();
            }
            Alert.alert('Error', 'Check your internet connection')
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <View>
            <Text style={styles.TitleHeader}>
                Legal name
            </Text>

            <Text style={styles.desc}>
            Input name as it appears on your official documents
            </Text>
            <TextInput placeholder="Full name" style={styles.input} onChangeText={(val)=>setLeglName(val)}/>
            <TouchableOpacity
                          style={[SectionsLogin.loginButton,
                           ]}
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

export default LegalName;
