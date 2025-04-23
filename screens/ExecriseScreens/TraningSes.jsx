import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../header/Header";
import Transes from "../../styles/Traning/Transes";

const flue = require("../../assets/images/fitness/fluent_dumbbell-24-filled.png");
const gym = require("../../assets/images/healthicons_exercise-bicycle (1).png");
const sched = require("../../assets/images/fitness/ion_time-sharp.png");

const AccordionItem = ({ title, imageSource, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const [isRunning, setIsRunning] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
    setChecked(false);
    setIsRunning(false);
    progress.setValue(0); 
  };

  const startProgressBar = () => {
    setIsRunning(true);
    setChecked(false);
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 300000, // 5 minutes countdown
      useNativeDriver: false,
    }).start(() => {
      setChecked(true);
      setIsRunning(false);
    });
  };

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={Transes.accordionContainer}>
      <TouchableOpacity onPress={toggleAccordion} style={[Transes.header,{backgroundColor:"#fff"}]}>
        <View style={{ flexDirection: "row", gap: 5 }}>
       {/* check box */}
        {checked ? (
      <Ionicons name="checkmark-circle" size={24} color="#0D9488" />
       ) : (
      <MaterialIcons name="radio-button-unchecked" size={24} color="#CBD5E1" />
        )}        
      <Text style={Transes.headerText}>{title}</Text>
        </View>
        {/* Arrows */}
        <View style={Transes.headerRight}>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>

      {/* image, execrise and contents */}
      {expanded && (
        <View style={Transes.content}>
          <Image source={imageSource} style={Transes.image} resizeMode="contain" />
          <TouchableOpacity style={{position:"absolute",right:20,top:20,backgroundColor:"#C1C1C133",padding:8,borderRadius:30}}>
         <Feather name="edit-3" size={12} color="#fff" />
          </TouchableOpacity>
          <View style={Transes.detailsContainer}>
            <View style={[Transes.equipmentContainer, { gap: 6, flexWrap: "wrap", paddingVertical: 10 }]}>
              <View style={Transes.equipmentContainer}>
                <Image source={flue} resizeMode="contain" style={Transes.icon} />
                <Text style={Transes.equipmentText}>Dumbbell, mat</Text>
              </View>
              <View style={Transes.equipmentContainer}>
                <Image source={sched} resizeMode="contain" style={Transes.icon} />
                <Text style={Transes.equipmentText}>5 Minutes</Text>
              </View>
              <View style={Transes.equipmentContainer}>
                <Image source={gym} resizeMode="contain" style={Transes.icon} />
                <Text style={Transes.equipmentText}>2 sets of 12 reps</Text>
              </View>
            </View>
          </View>

          <Text style={[Transes.headerText, { paddingVertical: 5, borderTopWidth: 1, borderColor: "#F1F5F9" }]}>Steps</Text>
          <Text style={Transes.contentText}>{content}</Text>

          {/* progress loading bar */}
          {isRunning && (
            <View style={{ marginVertical: 10, borderTopWidth: 1, borderColor: "#F1F5F9", paddingTop: 10 }}>
              <Text style={Transes.headerText}>Countdown for recovery phases</Text>
              <View style={Transes.progressBarContainer}>
                <Animated.View style={[Transes.progressBar, { width: widthInterpolation }]} />
              </View>
            </View>
          )}

          <TouchableOpacity style={Transes.button} onPress={startProgressBar}>
            <Text style={Transes.buttonText}>{isRunning ? "Running..." : "Start"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const TrainingSession = () => {
  return (
    <>
      <Header name="Traning session" arrow="arrow-back" />
      <ScrollView>
        <View style={Transes.container}>
          <AccordionItem
            title="Warm-up (3-5 mins) "
            imageSource={require("../../assets/images/Rectangle 180.png")}
            content="Prepare your body with a proper warm-up session for 5 minutes."
          />
          <AccordionItem
            title="Strength Training"
            imageSource={require("../../assets/images/Rectangle 180.png")}
            content="Follow the strength training routine with controlled reps and sets."
          />
          <AccordionItem
            title="Cool Down (5 mins)"
            imageSource={require("../../assets/images/Rectangle 180.png")}
            content="End the session with a cooldown to relax your muscles."
          />
        </View>
      </ScrollView>
    </>
  );
};

export default TrainingSession;
