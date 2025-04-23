import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function Facebook() {
  return (
   <View>
     <Svg width="105" height="56" viewBox="0 0 105 56" fill="none"  >
    <Rect x="0.5" y="0.5" width="104" height="55" rx="7.5" fill="#F2E7F9"/>
    <Rect x="0.5" y="0.5" width="104" height="55" rx="7.5" stroke="#F6EDFF"/>
    <Path d="M54.7956 40V29.0703H58.3496L58.8779 24.7909H54.7956V22.0652C54.7956 20.8303 55.1272 19.9849 56.8355 19.9849H59V16.1696C57.9468 16.0525 56.8882 15.9959 55.829 16.0002C52.6877 16.0002 50.5308 17.9899 50.5308 21.6424V24.7829H47V29.0623H50.5386V40H54.7956Z" fill="#4092FF"/>
    </Svg>
   </View>
    
  )
}