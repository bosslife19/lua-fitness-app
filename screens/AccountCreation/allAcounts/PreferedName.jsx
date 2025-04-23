import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SectionsLogin from '../../../styles/Login/Login.styles';
import axiosClient from '../../../axiosClient';

const PreferedName = ({onNext}) => {
    const [preferredName, setPreferredName] = useState('')
    
    const handleNext = async()=>{
        if(!preferredName){
            return Alert.alert('Required', 'Please tell us your preferred name')
        }
        const res = await axiosClient.post('/register', {preferredName});
        if(res.data.status){
            return onNext();
        }
        return Alert.alert('Error', 'Please check your internet connection')
        

    }
    return (
        <View>
            <Text style={styles.TitleHeader}>
            Preferred name            
            </Text>

            <Text style={styles.desc}>
            What name feels most comfortable?           
             </Text>
            <TextInput placeholder="Preferred name" style={styles.input} onChangeText={val=>setPreferredName(val)}/>
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
       maxWidth:"60%"
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

export default PreferedName;
