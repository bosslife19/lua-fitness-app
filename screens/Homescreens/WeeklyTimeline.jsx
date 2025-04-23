import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import gym from "../../assets/images/Group 127.png";
import time from "../../assets/images/Group 127 (1).png";
import run from "../../assets/images/Group 127 (2).png";
import { router } from "expo-router";
import axiosClient from "../../axiosClient";
import { AuthContext } from "../../context/AuthContex";



const WeeklyTimeline = () => {
  const {setUserDetails} = useContext(AuthContext)
  const cycleOptions = [
    {
      label: "Monday",
      img: gym,
      color: "#E2F0E9",
      time: "10.00AM ",
      value: "Monday",
      text: "Completed",
    },
    {
      label: "Tuesday",
      img: time,
      color: "#FEEBEF",
      time: "10.00AM ",
      value: "Tuesday",
      text: "Missed",
    },
    {
      label: "Wednesday",
      img: run,
      color: "#E8EAFC",
      time: "10.00AM ",
      value: "Wednesday",
      text: "Scheduled",
    },
  ];
  const [dailyTracking, setDailyTracking] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(null)

  useEffect(() => {
    const getWeeklyLogs = async () => {
      try {
        const res = await axiosClient.get("/get-weekly");
       
        setDailyTracking(res.data.logs);
        setUserDetails(prev=>({...prev, totalMinutes:res.data.total_minutes}))
      } catch (error) {
        console.log(error);
      }
    };
    getWeeklyLogs();
  }, []);

  useEffect(()=>{
   let completed = dailyTracking.filter((item)=>item.status=="Completed");
   setCurrentStreak(completed);
  
  }, [dailyTracking])

  useEffect(()=>{
    if(currentStreak){
      setUserDetails((prev)=>({
        ...prev, streak: currentStreak.length
      }))
    }
    
  }, [currentStreak])

  


  return (
    <View>
      {/* <View
        style={[styles.scrollContainer, { justifyContent: "space-between" }]}
      >
        <Text style={styles.Header}>Weekly timeline</Text>
        <TouchableOpacity
          onPress={() => router.push("/(routes)/weekly-timeline")}
        >
          <Text style={[styles.optionText, { color: "#8A2BE2" }]}>See all</Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dailyTracking?.map((option, index) => (
          <TouchableOpacity
            weekly-timeline
            key={index}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  option.status == "Completed"
                    ? "#E2F0E9"
                    : option.status == "Uncompleted"
                    ? "#E8EAFC"
                    : "#FEEBEF",
                borderColor:
                  option.status == "Completed"
                    ? "#E2F0E9"
                    : option.status == "Uncompleted"
                    ? "#E8EAFC"
                    : "#FEEBEF",
                borderWidth: 1,
              },
            ]}
          >
            <Image
              source={
                option.status == "Completed"
                  ? cycleOptions[0].img
                  : option.status == "Uncompleted"
                  ? cycleOptions[2].img
                  : cycleOptions[1].img
              }
              style={{ width: 37, height: 37, borderRadius: 10 }}
            />

            <Text style={[styles.optionText]}>{option.day}</Text>
            <Text
              style={[
                styles.optionText,
                { color: "#7A7E82", fontWeight: 500, fontSize: 12 },
              ]}
            >
              {option.time}
            </Text>
            <Text style={[styles.optionText, { fontSize: 14 }]}>
              {option.status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    color: "#0F172A",
    fontFamily: "montserratMeduim",
    fontSize: 16,
    fontWeight: 700,
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionButton: {
    width: 140,
    height: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    // backgroundColor: "#F7EAFF",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    // alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#8A2BE2",
    flexDirection: "column",
    gap: 10, // Space between checkbox and text
  },
  optionText: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: "montserratMeduim",
    fontWeight: "bold",
    // textAlign: "center",
  },
  selectedOption: {
    // backgroundColor: "#E6D4FF",
  },
  selectedOptionText: {
    fontFamily: "montserratMeduim",
  },
});

export default WeeklyTimeline;
