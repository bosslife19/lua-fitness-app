import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import award from "../../assets/images/game-icons_achievement.png"
const Award = ({
     label,
    
  }) => {
    return (
        <View style={{backgroundColor:"#D97706", paddingHorizontal:6, paddingVertical:7, marginHorizontal:"auto",borderRadius:10,position:"relative"}}>
            <Image source={award} style={{width:30,height:30}} />
           <View style={{position:"absolute",right:-3,bottom:-2,paddingHorizontal:4,borderWidth:1,borderRadius:50,backgroundColor:"#0D9488",borderColor:"#0D9488"}}>
           <Text style={{fontSize:10,color:"#fff"}}>{label}</Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Award;
