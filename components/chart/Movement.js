import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const Movement = ({
  progress = 0.65, // Default progress (65%)
  label,
  progressColor = "#7F56D9",
  bgColor = "#E5E7EB",
  size = 50,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress); // Calculate progress offset

  return (
    <View style={[styles.chartContainer, { width: size, height: size }]}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.chartLabel}>
        <Text style={styles.chartValue}>
          {label ? label : `${Math.round(progress * 100)}%`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  chartLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  chartValue: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1D2939",
  },
});

export default Movement;
