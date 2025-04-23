// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Svg, { Circle } from "react-native-svg";

// const DetailsChart = () => {
//   const percentage = 0.25; // 25% usage
//   const radius = 25;
//   const strokeWidth = 8;
//   const circumference = 2 * Math.PI * radius;
//   const progress = circumference * (1 - percentage); // Calculate progress based on percentage

//   return (
//     <View style={styles.chartContainer}>
//       <Svg height="60" width="60" viewBox="0 0 60 60">
//         {/* Background Circle */}
//         <Circle
//           cx="30"
//           cy="30"
//           r={radius}
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         {/* Progress Circle */}
//         <Circle
//           cx="30"
//           cy="30"
//           r={radius}
//           stroke="#7F56D9"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={circumference}
//           strokeDashoffset={progress}
//           strokeLinecap="round"
//         />
//       </Svg>
//       <View style={styles.chartLabel}>
//         <Text style={styles.chartValue}>25%</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chartContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   chartLabel: {
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   chartValue: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#1D2939",
//   },
// });

// export default DetailsChart;
