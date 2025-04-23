import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import moment from "moment";
import axiosClient from "../../axiosClient";

const ProgressChart = () => {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axiosClient.get("/workout-logs/week");
        const logs = res.data.logs; // Assuming array of { date, seconds_watched }

        const thisWeek = moment().startOf("week"); // Sunday by default

        const temp = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat

        logs.forEach((log) => {
          const logDate = moment(log.date);
          const dayIndex = logDate.diff(thisWeek, "days");
          if (dayIndex >= 0 && dayIndex < 7) {
            temp[dayIndex] = parseFloat((log.seconds_watched / 3600).toFixed(2)); // Convert to hours
          }
        });

        setChartData(temp);
      } catch (err) {
        console.log("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, []);

if(!chartData){
  return null;
}
return (
  <View style={styles.container}>
    <Text style={styles.title}> Workout Progress</Text>
    <LineChart
      data={{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: chartData,
            color: (opacity = 1) => `rgba(127, 86, 217, ${opacity})`,
            strokeWidth: 4,
          },
        ],
      }}
      width={Dimensions.get("window").width - 20}
      height={250}
      yAxisSuffix="h"
      yAxisInterval={1}
      yLabelsOffset={40}
      xLabelsOffset={-10}
      chartConfig={{
        backgroundColor: "#f5f5f5",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(127, 86, 217, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: { borderRadius: 10 },
        propsForDots: {
          r: "0",
        },
      }}
      bezier
      style={{ borderRadius: 10 }}
    />
  </View>
);

};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    // elevation: 3,
    marginHorizontal: 10,
    marginVertical:8,
    // alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProgressChart;
