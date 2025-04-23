import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Transes from '../../../../styles/Traning/Transes';

const Email = () => {
    return (
        <View style={{paddingHorizontal:20}}>
             <TextInput
              keyboardType="default"
              placeholder="write your complaint.."
              style={{width:"100%",backgroundColor:"#fff",paddingBottom:"20%",paddingLeft:10,borderRadius:5}}
             />  
             <TouchableOpacity style={Transes.button}  >
            <Text style={Transes.buttonText}> Send</Text>
         </TouchableOpacity>  
        </View>
    );
}

const styles = StyleSheet.create({})

export default Email;
 