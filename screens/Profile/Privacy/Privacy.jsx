import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../header/Header'
import Transes from '../../../styles/Traning/Transes'

export default function PrivacyOption() {
  return (
    <>
     <Header name="Privacy control" arrow="arrow-back" />
     <View style={{backgroundColor:"#fff",marginHorizontal:20,marginVertical:20,borderRadius:10}}>
       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
        <Text style={[Transes.buttonText,{color:"#0F172A"}]} >Data Collection & Usage</Text>
        <Text style={[Transes.buttonText,{color:"#64748B",fontWeight:500}]}>Workout history and preferences</Text>
       </View>

       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
        <Text style={[Transes.buttonText,{color:"#0F172A"}]}>Cookies & tracking</Text>
        <Text style={[Transes.buttonText,{color:"#64748B",fontWeight:500}]}>Details on tracking technologies</Text>
       </View>

       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
        <Text style={[Transes.buttonText,{color:"#0F172A"}]}>Legal compliance</Text>
        <Text style={[Transes.buttonText,{color:"#64748B",fontWeight:500}]}>Privacy laws</Text>
       </View>
       </View>
    </>
  )
} 