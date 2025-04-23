import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg"; // Import Svg elements

const Locks2 = () => {
  return (
    <View>
      <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
        <Path
          d="M4 7.55648V6.22314C4 4.01648 4.66667 2.22314 8 2.22314C11.3333 2.22314 12 4.01648 12 6.22314V7.55648"
          stroke="#8A2BE2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 13.2231C8.92047 13.2231 9.66667 12.4769 9.66667 11.5564C9.66667 10.636 8.92047 9.88977 8 9.88977C7.07952 9.88977 6.33333 10.636 6.33333 11.5564C6.33333 12.4769 7.07952 13.2231 8 13.2231Z"
          stroke="#8A2BE2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.3333 15.5564H4.66667C2 15.5564 1.33333 14.8897 1.33333 12.2231V10.8897C1.33333 8.22306 2 7.5564 4.66667 7.5564H11.3333C14 7.5564 14.6667 8.22306 14.6667 10.8897V12.2231C14.6667 14.8897 14 15.5564 11.3333 15.5564Z"
          stroke="#8A2BE2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default Locks2;
