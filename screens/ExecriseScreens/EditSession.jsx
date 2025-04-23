import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../header/Header';
import Transes from '../../styles/Traning/Transes';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

const EditSession = () => {
      const [difficulty, setDifficulty] = useState(0);
      const [duration, setduration] = useState(0);

      // Flow labels (Full name and Abbreviation)
      const Difficulties = [
        { full: "Beginner", short: "Beginner" },
        { full: "intermediate", short: "intermediate" },
        { full: "Advanced", short: "Advanced" },
      ];

    
      // Flow labels (Full name and Abbreviation)
      const Durations = [
        { full: "10", short: "10" },
        { full: "20", short: "20" },
        { full: "30", short: "30" },
        { full: "40", short: "40" },
        { full: "50", short: "50" },
        { full: "60", short: "60" },

      ];

    return (
        <>
      <Header name="Edit session" arrow="arrow-back" />
      <View style={[Transes.container,{backgroundColor:"#F1F5F9"}]}>
       <View style={{backgroundColor:"#fff",padding:10,borderRadius:10}}>
        <Text style={[Transes.headerText,{lineHeight:30}]}>
            Exercise list
        </Text>
        <View style={[Transes.equipmentContainer,{justifyContent:"space-between",borderTopWidth:1,marginTop:5,borderColor:"#F1F5F9"}]}>
            <Text style={[Transes.equipmentText,{fontSize:13}]}>Squat</Text>
            <MaterialIcons name="keyboard-arrow-right" size={21} color="black" />
        </View>
        <View style={[Transes.equipmentContainer,{justifyContent:"space-between"}]}>
            <Text style={[Transes.equipmentText,{fontSize:13}]}>Deadlifts</Text>
            <MaterialIcons name="keyboard-arrow-right" size={21} color="black" />
        </View>
        <View style={[Transes.equipmentContainer,{justifyContent:"space-between"}]}>
            <Text style={[Transes.equipmentText,{fontSize:13}]}>Calf Raises</Text>
            <MaterialIcons name="keyboard-arrow-right" size={21} color="black" />
        </View>
        <View style={[Transes.equipmentContainer,{justifyContent:"space-between"}]}>
            <Text style={[Transes.equipmentText,{fontSize:13}]}>Glute Abductors</Text>
            <MaterialIcons name="keyboard-arrow-right" size={21} color="black" />
        </View>
       </View>

       {/* Difficulty range */}
       <View style={{backgroundColor:"#fff",padding:10,borderRadius:10,marginTop:10}}>
         <Text style={Transes.headerText}>
              Difficulty
                </Text>
        
              {/* Slider Component */}
              <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                step={1}
                value={difficulty}
                onValueChange={(value) => setDifficulty(value)}
                minimumTrackTintColor="#8A2BE2"
                maximumTrackTintColor="#D8BFD8"
                thumbTintColor="transparent"
              />
               <View
              style={[
              styles.customThumb,
             {
              left: `${(difficulty / (Difficulties.length - 1)) * 90}%`,
              bottom:"55%"
              },
             ]}
             />
        
              {/* Labels Below Slider (Short Form) */}
              <View style={styles.labelsContainer}>
                {Difficulties.map((level, index) => (
                  <Text key={index} style={[styles.label, difficulty === index && styles.selectedLabel,{textAlign:"center",justifyContent:"space-between",marginHorizontal:10}]}>
                    {level.short}
                  </Text>
                ))}
              </View>
              </View>
       </View>


        {/* Difficulty range */}
        <View style={{backgroundColor:"#fff",padding:10,borderRadius:10,marginTop:10}}>
         <Text style={Transes.headerText}>
              Duration<Text style={{color:"#94A3B8",fontWeight:400}}> (Mins)</Text>
                </Text>
        
              {/* Slider Component */}
              <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={Durations.length - 1} // Ensures the max matches array length
                step={1}
                value={duration}
                onValueChange={(value) => setduration(value)}
                minimumTrackTintColor="#8A2BE2"
                maximumTrackTintColor="#D8BFD8"
                thumbTintColor="transparent"
                
              />
              <View
              style={[
              styles.customThumb,
             {
              left: `${(duration / (Durations.length - 1)) * 90}%`,
              },
             ]}
             />
           </View>
        
            {/* Labels Below Slider (Short Form) */}
             <View style={styles.labelsContainer}>
            {Durations.map((level, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              duration === index && styles.selectedLabel, // Corrected comparison
              {textAlign:"center",marginHorizontal:10}
            ]}
          >
            {level.short}
          </Text>
        ))}
           </View>
      </View> 

      {/* notes */}
      <View style={{backgroundColor:"#fff",padding:10,borderRadius:10,marginTop:10}}>
           <Text>Trainer's feedback</Text>
              <TextInput
              keyboardType="default"
              placeholder="Add note"
              style={styles.input}
              multiline={true} // Enables multi-line input
              numberOfLines={4} // Sets the default number of visible lines
            />    
         </View>

         {/* Button */}
         <TouchableOpacity style={Transes.button} onPress={()=> router.push("/(routes)/exercise/track") } >
         <Text style={Transes.buttonText}> Save</Text>
         </TouchableOpacity>
      </View>
        </>
    );
}

const styles = StyleSheet.create({
    labelsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
      },
      sliderContainer: {
        position: "relative",
        width: "100%",
        alignItems: "center",
      
      },
      customThumb: {
        position: "absolute",
        width: 10,
        height: 20,
        backgroundColor: "#8A2BE2",
        marginHorizontal:20,
        zIndex:1000,
        bottom:"25%",
        borderRadius: 3, // Slightly rounded edges
        transform: [{ translateX: -10 }], // Centers the block
      },
      input:{
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingBottom: "30%", // Adjusted for better text entry spacing
        marginTop: 20,
        backgroundColor:"#F8FAFC",
        borderColor: "#F8FAFC",
        borderRadius: 10,
        textAlignVertical: "top", // Ensures text starts at the top (important for textarea-like behavior)
  
      },
      label: {
        fontSize: 12,
        color: "#64748B",
        fontFamily: "montserratMeduim",
      },
      selectedLabel: {
        color: "#8A2BE2",
        fontWeight: "bold",
      },
      selectedText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: "bold",
        color: "#8A2BE2",
        fontFamily: "montserratMeduim",
      },
      slider: {
        width: "100%",
        height: 40,
        // padding:130
      },
})

export default EditSession;
