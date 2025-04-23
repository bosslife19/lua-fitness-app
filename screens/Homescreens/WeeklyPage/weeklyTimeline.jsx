import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import Header from "../../header/Header";
import bell from "../../../assets/images/fitness/dumbell.png";
import Schedule from "../../../assets/images/fitness/minus.png";
import good from "../../../assets/images/fitness/tick-circle.png";
import bad from "../../../assets/images/fitness/minus-cirlce.png";
import { router } from 'expo-router';

// Define the weekly workout data
const weeklyData = [
  { day: "Mon", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: true, missed: true, scheduled: true } },
  { day: "Tue", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: false, missed: true, scheduled: true } },
  { day: "Wed", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: true, missed: false, scheduled: false } },
  { day: "Thu", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: false, missed: true, scheduled: true } },
  { day: "Fri", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: true, missed: false, scheduled: true } },
  { day: "Sat", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: false, missed: true, scheduled: false } },
  { day: "Sun", cardio: "cardio Burn", date: "20th February, 2025", status: { completed: true, missed: false, scheduled: true } },
];

const statusColors = {
  completed: { backgroundColor: "#D8EEEB", textColor: "#0D9488", icon: good, text: "Completed" },
  missed: { backgroundColor: "#FFD8DD", textColor: "#E11D48", icon: bad, text: "Missed" },
  scheduled: { backgroundColor: "#FDECD9", textColor: "#D97706", icon: Schedule, text: "Scheduled" },
};

const WeeklyTabPanel = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const selectedData = weeklyData.find((item) => item.day === selectedDay);

  return (
    <>
      <Header name="Weekly Timeline" arrow="arrow-back" />
      <View style={styles.container}>
        {/* Weekly Tabs */}
         <View style={{flexDirection:"row"}}>
         <ScrollView horizontal     showsHorizontalScrollIndicator={false} 
           contentContainerStyle={styles.tabContainer} >
         {weeklyData.map((item) => (
            <TouchableOpacity
              key={item.day}
              style={[styles.tab, selectedDay === item.day && styles.activeTab]}
              onPress={() => setSelectedDay(item.day)}
            >
              <Text 
              style={[styles.tabText, selectedDay === item.day && styles.activeTabText] }
              >{item.day}</Text>
            </TouchableOpacity>
          ))}
            </ScrollView>
         </View>
      

        {/* Workout Details */}
        <ScrollView   showsHorizontalScrollIndicator={false}   style={styles.content}>
          {selectedData &&
            Object.entries(selectedData.status)
              .filter(([_, value]) => value) // Ensure only true statuses are shown
              .map(([key, _]) => (
                <View key={key} style={styles.details}>
                  <View style={styles.iconContainer}>
                    <Image source={bell} style={styles.icon} />
                  </View>
                  <View style={styles.detailsText}>
                    <View>
                      <Text style={styles.sectionTitle}>{selectedData.cardio}</Text>
                      <Text style={styles.dateText}>{selectedData.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColors[key].backgroundColor }]}>
                      <Image source={statusColors[key].icon} style={styles.statusIcon} />
                      <Text style={[styles.statusText, { color: statusColors[key].textColor }]}>
                        {statusColors[key].text}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={()=> router.push("/(routes)/workout/Details-page")}
         style={[styles.btns, { backgroundColor: "#8A2BE2" }]}
        >
         <Text style={[styles.button, { color: "#fff" }]}>Go to today</Text>
         </TouchableOpacity> 
                   
        <TouchableOpacity style={styles.btns} onPress={()=> router.push("/(routes)/workout/add-workout")} >
         <Text style={styles.button}>Add Workout</Text>
           </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      padding: 15,
      backgroundColor: "#F1F5F9",
    },
    tabContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      marginBottom: 20,
      backgroundColor: "#fff",
      
    },
    tab: {
       
      paddingVertical: 10,
      paddingHorizontal: 15,
      // backgroundColor: "#E5E7EB",
      borderRadius: 10,
      // marginRight: 10,
    },
    activeTab: {
      backgroundColor: "#6D28D9",
    },
    tabText: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Montserrat-Medium",
      color: "#374151",
    },
    activeTabText: {
      color: "#FFF",
      fontFamily: "Montserrat-Medium",
    },
    content: {
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Montserrat-Medium",
    },
    dateText: {
      fontSize: 13,
      fontWeight: "400",
      color: "#6B7280",
      fontFamily: "Montserrat-Medium",
    },
    details: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      paddingVertical: 25,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },
    detailsText: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    iconContainer: {
      backgroundColor: "#F6EAFE",
      padding: 5,
      borderRadius: 4,
    },
    icon: {
      width: 20,
      height: 20,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 10,
    },
    statusIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
    },
    statusText: {
      fontSize: 12,
      fontFamily: "Montserrat-Medium",
      fontWeight: 500,
    },
    buttonContainer: {
        // marginTop:"20%",
        gap: 10,
        // paddingBottom: 20,
        flexDirection: "column",
        alignItems: "center",
         marginBottom:"20%",
         paddingHorizontal:10
      },
    btns: {
        width: "100%",
        paddingVertical: 17,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#8A2BE2",
      },
      button: {
        fontSize: 18,
        fontFamily:"montserratMeduim",
        fontWeight: "700",
        textAlign: "center",
        color: "#8A2BE2",
      },
  });

export default WeeklyTabPanel;
