import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import MailIcon from '../../../assets/images/smstracking';
import Locks from '../../../assets/images/lock';
import { Ionicons } from '@expo/vector-icons';
import SectionsLogin from '../../../styles/Login/Login.styles';
import { Platform } from "react-native";
import Locks2 from '../../../assets/images/lock2';
import MailIcon2 from '../../../assets/images/smstracking2';
import { useRequest } from '../../../hooks/useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/AuthContex';
import { supabase } from '../../../supabase';

const CreateAccount = ({onNext}) => {
      const [isPasswordVisible, setPasswordVisible] = useState(false);
      const {makeRequest} = useRequest();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmpassword, setconfirmpassword] = useState("");
      
      const [isPasswordVisibles, setPasswordVisibles] = useState(false);
       const {setUserDetails} = useContext(AuthContext)
    
      const handleNext=async ()=>{
        if(!email || !password || !confirmpassword){
          return Alert.alert('Required', 'Please fill all fields to continue')
        }
        if(password !== confirmpassword){
          return Alert.alert('Passwords do not match', 'Your password has to match the confirm password')
        }
        if(password.length <6){
          return Alert.alert('Weak Password', 'Your password should contain 6 or more characters')
        }
        const {response} = await makeRequest('/register-user', {email, password});
        if(response){
          
          setUserDetails(response.user);
          await AsyncStorage.setItem('signedUp', 'Yes');
          await AsyncStorage.setItem('userDetails', JSON.stringify(response.user));
          try {
            const user = await supabase.auth.signUp({
              email,password,
            })
           
          } catch (error) {
            console.log(error);
          }
          
          return onNext();
        }
        Alert.alert('Error', 'Server Error');
        
      }
    return (
        <View>
            <Text style={styles.TitleHeader}>
            Create your account
            </Text>
             <View style={[SectionsLogin.contains, 
            { borderColor: "#ECDAFE", borderWidth: 1 }]}>
          <MailIcon2/>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 },
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                // keyboardType="email-address"
                value={email}
                placeholder="email Address"
                
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setEmail(value)}
              />
            </View>

            <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
            <Locks2/>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 },
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                placeholder="password"
               
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity
                style={[SectionsLogin.visibleIcon, { fontFamily: "montserratMeduim" }]}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={"#747474"} />
                )}
              </TouchableOpacity>
            </View>

            {/* confirm password */}
            <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
            <Locks2/>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "montserratMeduim", paddingHorizontal: 0 },
                  Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
                ]}
                secureTextEntry={!isPasswordVisibles}
                value={confirmpassword}
                placeholder="Confirm password"
               
                placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined} 
                onChangeText={(value) => setconfirmpassword(value)}
              />
              <TouchableOpacity
                style={[SectionsLogin.visibleIcon, { fontFamily: "montserratMeduim" }]}
                onPress={() => setPasswordVisibles(!isPasswordVisibles)}
              >
                {isPasswordVisibles ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={"#747474"} />
                )}
              </TouchableOpacity>
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
    TitleHeader: {
        color: "#0F172A",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
      },
      iosPlaceholder: {
        fontFamily: "montserratMeduim", // Ensure the placeholder uses the same font
        color:'#aaa'
      },
})

export default CreateAccount;
