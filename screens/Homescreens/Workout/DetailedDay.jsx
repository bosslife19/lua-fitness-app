import React, { useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../header/Header';
import image from "../../../assets/images/Rectangle 5919.png";
import dumbell from "../../../assets/images/fitness/dumbell.png";
import DetailsChart from '../../../components/chart/DetailsChart';
import MinusSchedule from "../../../assets/images/fitness/minus.png";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";
import { router } from 'expo-router';

const DetailedDay = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [animation] = useState(new Animated.Value(0));
    const [isWorkoutEnabled, setIsWorkoutEnabled] = useState(false);

    const toggleWorkout = () => setIsWorkoutEnabled(previousState => !previousState);

    const notes = [
        { title: "Trainer’s note", content: "Start with light jogging, followed by stretching exercises." },
     ];

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: false }).start();
        } else {
            setActiveIndex(index);
            Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: false }).start();
        }
    };
    return (
   
         <View style={styles.mainContainer}>
            <Header name="Detailed Day view" arrow="arrow-back" />
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={image} style={styles.image} resizeMode='cover' />
                </View>
               <View style={{backgroundColor:"#fff", paddingBottom:10,paddingHorizontal:10,borderBottomEndRadius:10,borderBottomStartRadius:10,}}>
               <View style={{marginTop:10,backgroundColor:"#fff", flexDirection:"row",alignItems:"center",gap:5,justifyContent:"space-between"}}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5, }}>
                <View style={{backgroundColor:"#F6EAFE",width:30,padding:7, alignItems:"center",}}>
               <Image source={dumbell} style={{width:15,height:15, }} resizeMode='contain' />
               </View>
               <Text style={{fontFamily:"inter", fontWeight:700,fontSize:17}}>
                Cardio Burn
               </Text>
                    
                </View>
                {/* DetailsChart */}
                <DetailsChart/>
                </View>

                <View style={{backgroundColor:"#FDECD9",flexDirection:"row",alignItems:"center",gap:4, width:"34%",justifyContent:"center",paddingVertical:5,borderRadius:20}}>
                <Image source={MinusSchedule} style={{width:15,height:15, }} resizeMode='contain' />
                <Text style={{color:"#D97706", fontFamily:"inter"}}>45 Minutes</Text>
                </View>
                <Text style={{fontFamily:"inter",color:"#64748B"}}>
                    <Text style={{fontWeight:"700",lineHeight:30,color:"#475569"}}>Equipment needed: </Text>
                    Dumbbell, Yoga mat
                </Text>
               </View>

                {/* Traniners Note */}
                <View style={{marginTop:5}}>
               {notes.map((note, index) => (
                <View key={index} style={styles.accordionItem}>
                    <TouchableOpacity style={styles.header} onPress={() => toggleAccordion(index)}>
                        <Text style={styles.title}>{note.title}</Text>
                        <MaterialIcons name={activeIndex === index ? "keyboard-arrow-down":"keyboard-arrow-up"}  size={24} color="black" />
                     </TouchableOpacity>
                    <Collapsible collapsed={activeIndex !== index}>
                        <View style={styles.content}>
                            <Text style={styles.text}>{note.content}</Text>
                        </View>
                    </Collapsible>
                </View>
            ))}
          </View>
         <View style={styles.togglebtn}>
         <Text style={styles.label}>
            Complete workout
             </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#7F56D9" }} // Inactive/Active colors
                thumbColor={isWorkoutEnabled ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleWorkout}
                value={isWorkoutEnabled}
            />
         </View>
          <TouchableOpacity style={styles.button} onPress={()=> router.push("(routes)/workout/edit-workout")}>
                   <Text style={styles.buttonText}>Edit Workout</Text>
                 </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,  
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    imageWrapper: {
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        overflow: "hidden",  // This makes the border-radius work on the image
    },
    image: {
        width: "100%",
        height: 200,
    },
    accordionItem: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    togglebtn:{
      flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,

        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
         borderBottomWidth:1,
        borderColor:"#F1F5F9"
    },
    title: {
        fontSize: 16,
        fontFamily:"inter",
        fontWeight: "bold",
    },
    content: {
        padding: 15,
        backgroundColor: "white",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    text: {
        fontSize: 12,
        color: "#64748B",
       
    },
    button: {
        backgroundColor: "#8A2BE2",
        padding: 15,
        borderRadius: 30,
        alignItems: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: 14,
        padding: 4,
        fontFamily: "montserratMedium",
        fontWeight: "bold",
      },
});

export default DetailedDay;
