import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

import Header from "../header/HeaderWithIconRIght";
import Movement from "../../components/chart/Movement";
import Trans from "../../styles/Traning/TranExec";

import image from "../../assets/images/fitnessbg.png";
import bg from "../../assets/images/bgs.png";
import clock from "../../assets/images/clock.png";
import flash from "../../assets/images/flash.png";
import front from "../../assets/images/front.png";
import flue from "../../assets/images/fitness/fluent_dumbbell-24-filled.png";
import sched from "../../assets/images/fitness/ion_time-sharp.png";
import location from "../../assets/images/ph_note-fill.png";

const weeklyData = [
  { day: "Mon", cardio: "Cardio Burn", date: "20th February, 2025", status: { completed: true, missed: true, scheduled: true } },
  { day: "Tue", cardio: "Yoga", date: "21st February, 2025", status: { completed: false, missed: true, scheduled: true } },
  { day: "Wed", cardio: "Strength Training", date: "22nd February, 2025", status: { completed: true, missed: false, scheduled: false } },
  { day: "Thu", cardio: "HIIT", date: "23rd February, 2025", status: { completed: false, missed: true, scheduled: true } },
  { day: "Fri", cardio: "Running", date: "24th February, 2025", status: { completed: true, missed: false, scheduled: true } },
  { day: "Sat", cardio: "Pilates", date: "25th February, 2025", status: { completed: false, missed: true, scheduled: false } },
  { day: "Sun", cardio: "Rest Day", date: "26th February, 2025", status: { completed: true, missed: false, scheduled: true } },
];

const TraningSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");

  // Find the selected day's training details
  const selectedData = weeklyData.find((item) => item.day === selectedDay);

  return (
    <>
      <Header name="Weekly Timeline" arrow="arrow-back" />
      <ScrollView>
        <View style={Trans.container}>
          {/* Weekly Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={Trans.tabContainer}>
            {weeklyData.map((item) => (
              <TouchableOpacity
                key={item.day}
                style={[Trans.tab, selectedDay === item.day && Trans.activeTab]}
                onPress={() => setSelectedDay(item.day)}
              >
                <Text style={[Trans.tabText, selectedDay === item.day && Trans.activeTabText]}>{item.day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Current training */}
          {selectedData && selectedData.status.scheduled && (
            <ImageBackground source={bg} style={Trans.imageBackground}>
              <Text style={[Trans.imageText, { paddingTop: 12 }]}>Current Training</Text>
              <View style={Trans.flexD}>
                <View style={[Trans.flexD, { position: "relative" }]}>
                  <View style={Trans.flexD}>
                    <Image source={clock} style={{ width: 16, height: 16 }} />
                    <Text style={[Trans.imageText, { color: "#E2E8F0", fontSize: 14, fontWeight: "500" }]}>
                      15 Minutes
                    </Text>
                  </View>
                  <View style={Trans.flexD}>
                    <Image source={flash} style={{ width: 16, height: 16 }} />
                    <Text style={[Trans.imageText, { color: "#E2E8F0", fontSize: 14, fontWeight: "500" }]}>
                      {selectedData.cardio}
                    </Text>
                  </View>
                </View>
                <Image source={front} style={{ width: "30%", height: 105, position: "absolute", right: 0, top: "-50%" }} resizeMode="cover" />
              </View>
              <TouchableOpacity style={Trans.btnss}   onPress={() => router.push("/(routes)/exercise/Traningsession")}              >
                <Text style={Trans.buttons}>Start Now</Text>
                <AntDesign name="arrowright" size={14} color="#0D9488" />
              </TouchableOpacity>
            </ImageBackground>
          )}

          {/* Upcoming session */}
          {selectedData && selectedData.status.scheduled && (
            <View style={[Trans.scrollContainer, { justifyContent: "space-between" }]}>
              <Text style={Trans.Header}>Upcoming session</Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/progressOverview")}>
                <Text style={[Trans.optionText, { color: "#8A2BE2" }]}>See more</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Exercise Details */}
          {selectedData && selectedData.status.scheduled && (
            <View style={Trans.containers}>
              <View style={[Trans.imageContainer, { position: "relative" }]}>
                <Image source={image} resizeMode="cover" style={Trans.mainImage} />
                {/* play button */}
                <TouchableOpacity style={Trans.favButton} onPress={() => router.push("/(routes)/exercise/execriseSaved")}>
                  <Entypo name="controller-play" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {/* execrise  */}
              <View style={Trans.details}>
                <Text style={Trans.title}>{selectedData.cardio} - Training</Text>
                <View style={[Trans.equipmentContainer, { gap: 20 }]}>
                  <View style={Trans.equipmentContainer}>
                    <Image source={flue} resizeMode="contain" style={Trans.icons} />
                    <Text style={Trans.equipmentText}>Dumbbell, Yoga mat</Text>
                  </View>
                  <View style={Trans.equipmentContainer}>
                    <Image source={sched} resizeMode="contain" style={Trans.icons} />
                    <Text style={Trans.equipmentText}>30 Minutes</Text>
                  </View>
                  <View style={{ position: "absolute", right: "0%", bottom: "15%" }}>
                    <Movement progress={0.45} label="45%" progressColor="#7F56D9" size={35} />
                  </View>
                </View>
                <View style={Trans.equipmentContainer}>
                  <Image source={location} resizeMode="contain" style={Trans.icons} />
                  <Text style={Trans.equipmentText}>Stay hydrated before starting</Text>
                </View>
              </View>

              {/* Button */}
              <View style={Trans.buttonContainer}>
                <TouchableOpacity
                  onPress={() => router.push("/(routes)/exercise/edit")}
                  style={[Trans.btns, { backgroundColor: "#8A2BE2" }]}
                >
                  <Text style={[Trans.button, { color: "#fff" }]}>Reschedule</Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default TraningSchedule;
