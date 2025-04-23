import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Header from "../../header/Header";
import Transes from "../../../styles/Traning/Transes";
import Award from "../../../components/chart/Award";
import AChievement from "../../../components/chart/AwardCup";

const Workout = () => {
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState({ startDate: null, endDate: null });

  const onConfirm = ({ startDate, endDate }) => {
    setRange({ startDate, endDate });
    setVisible(false); // Close modal after selecting
  };

  return (
    <PaperProvider>
    <View style={{backgroundColor:"#F1F5F9",height:"100%"}}>
   
  
      <Header name="Streak" arrow="arrow-back" backgroundColor="#F1F5F9" />
      <Text style={[Transes.headerText, { color: "#8A2BE2", fontSize: 34.6, textAlign: "center" }]}>30</Text>
      <Text style={[Transes.contentText, { textAlign: "center" }]}>This is the longest streak you’ve ever attained</Text>

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
