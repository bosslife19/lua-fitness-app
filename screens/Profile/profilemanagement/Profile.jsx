import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../header/Header'
import edit from "../../../assets/images/account/mingcute_edit-fill.png";
import Transes from '../../../styles/Traning/Transes';
import home from "../../../assets/images/logo.png";
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContex';
import {useRequest} from '../../../hooks/useRequest'
import { router } from 'expo-router';


export default function Profile() {
  const {userDetails, setUserDetails} = useContext(AuthContext);
  const {makeRequest, loading} = useRequest();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const updateUserDetails = async ()=>{
  if(!email && !password && !name){
    return;
  }
    const {response, error} = await makeRequest('/update-details', {name, email, password})
    if(error){
      console.log(error)
    }
    if(response){
      const{user} = response
      setUserDetails(prev=>({...prev, user}))
      return Alert.alert('Success', 'Succesfully update user details')
    }
  }
 
  return (
    <>
     <Header name="Profile management" arrow="arrow-back" />
     <View style={{marginHorizontal:20,backgroundColor:"#F1F5F9"}}>

    
     <TouchableOpacity  
    //  onPress={()=> router.push("/(routes)/profile/profilemanagement")} 
     style={{position:"relative", justifyContent:"center",alignItems:"center",marginVertical:20,backgroundColor:"#fff",paddingVertical:20,borderRadius:10}}>
       <View style={{}}>
        {/* <Image source={home} style={{width:69,height:69}} /> */}
        <EvilIcons name="user" size={60} color="black" />
        </View>
        <Image source={edit} style={{width:19,height:19,position:"absolute",top:50,right:"37%"}} />

       </TouchableOpacity>

       <View style={{backgroundColor:"#fff"}}>
       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9", flexDirection:"row",justifyContent:"space-between",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
       <View style={{ width:"90%"}}>
       <Text>{userDetails?.name}</Text>
         <TextInput
            keyboardType="default"
            placeholder="Name"
            style={{width:"100%",backgroundColor:"#fff"}}
            onChangeText={val=>setName(val)}
           />    
       </View>
       <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
       </View>

       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9", flexDirection:"row",justifyContent:"space-between",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
       <View style={{ width:"90%"}}>
       <Text>{userDetails?.email}</Text>
         <TextInput
            keyboardType="default"
            placeholder="Email address"
            style={{width:"100%",backgroundColor:"#fff"}}
            onChangeText={val=>setEmail(val)}
           />    
       </View>
       <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
       </View>

       {/* <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9", flexDirection:"row",justifyContent:"space-between",marginVertical:1,backgroundColor:"#fff",paddingVertical:10,borderRadius:10,paddingHorizontal:10}}>
       <View style={{ width:"90%"}}>
       <Text>+1 3548353463</Text>
         <TextInput
            keyboardType="default"
            placeholder="mobile number"
            style={{width:"100%",backgroundColor:"#fff"}}
           />    
       </View>
       <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
       </View> */}

       <View  style={{borderBottomWidth:1,borderColor:"#F1F5F9", flexDirection:"row",justifyContent:"space-between",marginVertical:1,backgroundColor:"#fff",paddingVertical:20,borderRadius:10,paddingHorizontal:10}}>
       <View style={{ width:"90%"}}>
       <Text>*************</Text>
         <TextInput
            keyboardType="default"
            placeholder="password"
            style={{width:"100%",backgroundColor:"#fff"}}
            onChangeText={val=>setPassword(val)}
           />    
       </View>
       <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
       </View>
       </View>
       <TouchableOpacity style={Transes.button} onPress={updateUserDetails} >
        {
          loading?<ActivityIndicator color='white' size={20}/>:
          <Text style={Transes.buttonText}> Update</Text>
        }
        
         
         </TouchableOpacity>
     <View>

     </View>
       </View>
    </>
  )
}

const styles = StyleSheet.create({

})