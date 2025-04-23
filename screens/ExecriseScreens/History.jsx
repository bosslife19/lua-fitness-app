import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View, Text, Animated, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../header/Header";
import ProgressChart from "../../components/chart/ProgressOverViewChart";
import circle from "../../assets/images/fitness/ri_progress-5-fill.png";
import Award from "../../components/chart/Award";
import AChievement from "../../components/chart/AwardCup";
import Trans from "../../styles/Traning/TranExec";
import filter from "../../assets/images/fitness/mdi_filter-outline.png";
import { Feather } from "@expo/vector-icons";
// import searchIco from "../../assets/images/fitness/search.png"; // Add your search icon

const HistorySchedule = ({ progress = 50 }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const weeklyData = [
    { day: "Date" },
    { day: "Training type" },
    { day: "Duration" },
  ];

  const [selectedDay, setSelectedDay] = useState("Date");

  return (
    <View style={{ backgroundColor: "#F8FAFC", height: "100%" }}>
      <Header name="History" arrow="arrow-back" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <Feather name="search" size={18} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search "
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[Trans.tabContainer, { alignItems: "center", backgroundColor: "#F8FAFC" }]}>
          {weeklyData.map((item) => (
            <TouchableOpacity
              key={item.day}
              style={[Trans.tabs, selectedDay === item.day && Trans.activeTab]}
              onPress={() => setSelectedDay(item.day)}
            >
              <Text style={[Trans.tabText, selectedDay === item.day && Trans.activeTabText]}>{item.day}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity>
            <Image source={filter} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Chart */}
      <ProgressChart />

      {/* Progress Sections */}
      <View style={styles.streakContainer}>
        <Text style={styles.streakTitle}>Streak</Text>
        <View style={styles.awardRow}>
          <Award label="1" />
          <Award label="1" />
          <Award label="1" />
          <Award label="1" />
          <AChievement />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth:1,
    borderColor:"#E2E8F0"
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#94A3B8",
    marginLeft:10
  },
  streakContainer: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  streakTitle: {
    fontWeight: "700",
    fontFamily: "montserratMedium",
    marginBottom: 10,
    marginLeft: 4,
  },
  awardRow: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
  },
});

export default HistorySchedule;