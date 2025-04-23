import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../header/Header';
import Transes from '../../styles/Traning/Transes';
import { router } from 'expo-router';

const TrackExecrise = () => {

    const [weight, setWeight] = useState(0); // Default weight

  const increaseWeight = () => setWeight((prev) => prev + 1);
  const decreaseWeight = () => setWeight((prev) => (prev > 1 ? prev - 1 : 1));

  const handleWeightChange = (value) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setWeight(parsed);
    } else if (value === "") {
      setWeight(""); // Allow clearing input
    }
  };

    return (
        <>
       <Header name="Track your exercise" arrow="arrow-back" />
       <View style={{height:"79%",display:"flex",justifyContent:"space-between", flexDirection:"column",marginBottom:"10%"}}>
       <View style={[Transes.container,{backgroundColor:"#F1F5F9"}]}>
       <View style={{backgroundColor:"#fff",padding:10,borderTopRadius:15,marginTop:5}}>
         <Text style={[Transes.headerText,{ marginBottom:10 }]}>Exercise type</Text>
          <TextInput 
             keyboardType="default"
             placeholder="Glute Abdcutors"
             style={[styles.input,{ paddingBottom: "5%",// Adjusted for better text entry spacing
             }]}
             multiline={true} // Enables multi-line input
             numberOfLines={4} // Sets the default number of visible lines
            />    
        </View>
        
        {/* weight count */}
       <View style={{backgroundColor:"#fff",borderBottomRadius:15}}>
       <Text style={[Transes.headerText,{marginTop:10, paddingLeft:20,paddingTop:20,borderTopWidth:1,borderColor:"#F1F5F9"}]}>Weight input</Text>
     <View style={styles.container}>
      <TouchableOpacity onPress={decreaseWeight} style={[styles.button,{backgroundColor:"#E2E8F0",}]}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input,{flex:1}]}
        keyboardType="numeric"
        placeholder='Enter weight'
        value={weight.toString()}
        onChangeText={handleWeightChange}
        maxLength={3} // Prevents large values
      />

      <TouchableOpacity onPress={increaseWeight} style={[styles.button,{backgroundColor:"#0F172A"}]}>
        <Text style={[styles.buttonText,{color: "#fff",}]}>+</Text>
      </TouchableOpacity>
    </View>
       </View>
        </View>
      
        <TouchableOpacity style={[Transes.button]} onPress={()=> router.push("/(tabs)/exercise") } >
         <Text style={Transes.buttonText}> Save</Text>
         </TouchableOpacity>
          </View> 
        </>
    );
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        paddingHorizontal: 15,
        // marginTop: 20,
        backgroundColor:"#F8FAFC",
        borderColor: "#CBD5E1",
        borderRadius: 30,
        textAlignVertical: "top", // Ensures text starts at the top (important for textarea-like behavior)
  
      },
        container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    gap:10,
    borderRadius: 10,
  },
  button: {
    
    paddingHorizontal: 20,
    paddingVertical:10,
    borderRadius: 30,
    // width: 40,
    alignItems: "center",
  },
  buttonText: {
    
    fontSize: 20,
  },

})

export default TrackExecrise;
