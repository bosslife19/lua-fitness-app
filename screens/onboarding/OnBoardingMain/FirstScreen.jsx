import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { commonstyles } from "../../../styles/common/common.style";
import AntDesign from "@expo/vector-icons/AntDesign";


export const onboardingSwiperData = [
  {
    id: 1,
    title: "Empower your",
    description: "fitness",
    sortDescription: "journey",
    image: require("../../../assets/images/1.jpg"),
    note: "Discover workouts tailored to your body, synced with your cycle",
  },
  {
    id: 2,
    title: "Support Every",
    description: "Step of the",
    sortDescription: "way",
    image: require("../../../assets/images/2.jpg"),
    note: "Join a community built on encouragement and understanding",
  },
  {
    id: 3,
    title: "Simplicity meets",
    description: "",
    sortDescription: "elegance",
    image: require("../../../assets/images/3.jpg"),
    note: "Experience a seamless, intuitive app that makes your fitness journey effortless",
  },
];

export default function FirstScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("onboarding", "completed");
    router.push("/login");
  };

  const renderItem = ({ item }) => (
    
 <ImageBackground source={item.image} style={styles.slide} resizeMode="cover">
      {/* Darker Gradient Overlay at the top */}
      <LinearGradient
      colors={["rgb(0, 0, 0)", "rgba(0, 0, 0, 0.82)", "transparent"]}
      style={styles.gradientTop}
    />
      <View style={styles.textContainer}>
        <Text style={commonstyles.title}>{item.title}</Text>
        <View style={commonstyles.flexD}>
          <Text style={commonstyles.description}>{item.description}</Text>
          {item.sortDescription && (
            <Text style={commonstyles.description2}>{item.sortDescription}</Text>
          )}
        </View>
        <Text style={styles.texts}>{item.note}</Text>
      </View>
    </ImageBackground>

   
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onSlideChange={(index) => setCurrentIndex(index)}
      renderNextButton={() => (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>router.push('/(routes)/register')} style={commonstyles.welcomeButton}>
            <Text style={commonstyles.Getstart}>{currentIndex === 0 ? "Get Started" : "Continue"}</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
          {currentIndex === 0 && (
             <TouchableOpacity onPress={handleGetStarted} style={commonstyles.skipButton}>
              <Text style={commonstyles.textSkip}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleGetStarted} style={commonstyles.welcomeButton}>
            <Text style={commonstyles.Getstart}>Continue</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
      showSkipButton={false}
      bottomButton={true}
      dotStyle={false}
      activeDotStyle={false}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    // paddingTop:140

  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "20%", // Adjust this to control the dark area
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "25%", // Adjust this to control the shadow area
  },
  textContainer: {
    flex: 0.9,
    alignItems: "center",
    width: "100%",
    gap: 2,
    paddingHorizontal: 20,
  },
  texts: {
    color: "#CBD5E1",
    fontFamily: "montserratMeduim",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
    paddingTop: 8,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    top:'-45%'
  },
});
