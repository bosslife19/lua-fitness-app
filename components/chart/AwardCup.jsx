import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import award from "../../assets/images/mdi_achievement-variant.png"
const AChievement = ({
 
    
  }) => {
    return (
        <View style={{backgroundColor:"#94A3B8", paddingHorizontal:6, paddingVertical:7, marginHorizontal:"auto",borderRadius:10,position:"relative"}}>
            <Image source={award} style={{width:30,height:30}} />
           
        </View>
    );
}

const styles = StyleSheet.create({})

export default AChievement;
