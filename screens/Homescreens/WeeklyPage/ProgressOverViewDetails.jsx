import React, { useContext, useEffect, useRef } from "react";
import { Image, StyleSheet, View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../header/Header";
import ProgressChart from "../../../components/chart/ProgressOverViewChart";
import circle from "../../../assets/images/fitness/ri_progress-5-fill.png";
import { AuthContext } from "../../../context/AuthContex";

const ProgressOverViewDetails = ({ progress = 50 }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
const {userDetails} = useContext(AuthContext);
const {streak, totalMinutes} = userDetails;
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false, // Must be false for width animation
    }).start();
  }, [progress]);
   

  return (
    <View style={{ backgroundColor: "#F8FAFC", height: "100%" }}>
      <Header name="Progress overview" arrow="arrow-back" />
      <ProgressChart />

      {/* Progress Sections */}
      {[
        { title: "Current Streak", subtitle: streak +" days | " + 60*24*streak + " minutes" },
        { title: "Movement Minutes", subtitle: totalMinutes + " Minutes | " + totalMinutes/10 +" Calories burnt" },
      ].map((item, index) => (
        <View key={index} style={styles.progressContainer}>
          <View style={styles.iconContainer}>
            <Image source={circle} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.progressText}>{progress}%</Text>

            {/* Progress Bar */}
            <View style={styles.progressBackground}>
              <Animated.View
                style={{
                  width: animatedWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                  height: "100%",
                  // borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <LinearGradient
                  colors={["#0957DE", "#60EFFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientFill}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#F6EDFF",
    width: 40,
    height: 40,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0957DE",
    marginBottom: 5,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#F7F8F8", // Remaining space color
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  gradientFill: {
    height: "100%",
    width: "100%",
  },
});

export default ProgressOverViewDetails;
