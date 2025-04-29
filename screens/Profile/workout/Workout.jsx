import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Header from "../../header/Header";
import Transes from "../../../styles/Traning/Transes";
import Award from "../../../components/chart/Award";
import AChievement from "../../../components/chart/AwardCup";
import axiosClient from "../../../axiosClient";

const Workout = () => {
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState({ startDate: null, endDate: null });
  const [streak, setStreak] = useState(0)

  const onConfirm = async ({ startDate, endDate }) => {
    setRange({ startDate, endDate });
    
  
    try {
      const res = await axiosClient.post("/workout-range-summary", {
        start_date: startDate,
        end_date: endDate,
      });
  
      if (res.data.status) {
        // console.log("Workout Summary:", res.data.summary); // { total_hours: 5, total_days: 3 }
        // you can set this in state to display to the user
        setStreak(res.data.summary.total_days);
      }
    } catch (error) {
      console.error("Error fetching workout summary:", error?.response?.data || error.message);
    }
    setVisible(false); // Close the modal
  };
  

  useEffect(()=>{

  }, [range])

  return (
    <PaperProvider>
    <View style={{backgroundColor:"#F1F5F9",height:"100%"}}>
   
  
      <Header name="Streak" arrow="arrow-back" backgroundColor="#F1F5F9" />
      <Text style={[Transes.headerText, { color: "#8A2BE2", fontSize: 34.6, textAlign: "center" }]}>{streak}{streak==0?'':streak>1?"Days":' Day'}</Text>
      <Text style={[Transes.contentText, { textAlign: "center" }]}>Keep going you are doing great!</Text>

      <View style={styles.streakContainer}>
        <View style={styles.awardRow}>
          <Award label="1" />
          <Award label="1" />
          <Award label="1" />
          <Award label="1" />
          <AChievement />
        </View>
      </View>

      {/* Date Picker at the Bottom */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Date Range</Text>
        <Button title="Pick Date Range" onPress={() => setVisible(true)} color="#8A2BE2" />

        {range.startDate && range.endDate && (
          <Text style={styles.dateText}>
            {range.startDate?.toDateString()} - {range.endDate?.toDateString()}
          </Text>
        )}
      </View>

      <DatePickerModal
        locale="en"
        mode="range"
        visible={visible}
        onDismiss={() => setVisible(false)}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
  
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  awardRow: {
    flexDirection: "row",
    gap: 10,
  },
  datePickerContainer: {
    marginTop: 40,
    padding: 20,
    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 10,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8A2BE2",
  },
});

export default Workout;
