import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
             
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: focused ? '#F1F5F9' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical:10,
              marginVertical:10,
              borderRadius: 10, // Optional: add rounded corners for styling
            }}
          >
            <Image
              source={
                focused
                  ? require('../../assets/images/fitness/homesin.png')
                  : require('../../assets/images/fitness/homesout.png')
              }
              style={{
                width: 19,
                height: 19,
              }}
            />
            </View>
          ),     
        }}
      />
       <Tabs.Screen
        name="chat"
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
             
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: focused ? '#F1F5F9' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical:10,
              marginVertical:10,
              borderRadius: 30, // Optional: add rounded corners for styling
            }}
          >
            <Image
              source={
                focused
                  ? require('../../assets/images/account/Frame 238792.png')
                  : require('../../assets/images/account/Group 238389.png')
              }
              style={{
                width: 19,
                height: 19,
              }}
            />
            </View>
          ),     
        }}
      />

      <Tabs.Screen
        name="exercise"
        options={{ 
          title: 'Exercise',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
             
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: focused ? '#F1F5F9' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical:10,
              marginVertical:10,
              borderRadius: 30, // Optional: add rounded corners for styling
            }}
          >
            <Image
              source={
                focused
                  ? require('../../assets/images/fitness/dummybell.png')
                  : require('../../assets/images/fitness/dummybelloutline.png')
              }
              style={{
                width: 19,
                height: 19,
              }}
            />
            </View>
          ),     
        }}
      />

<Tabs.Screen
        name="cycle"
        options={{ 
          title: 'Cycle',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
             
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: focused ? '#F1F5F9' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical:10,
              marginVertical:10,
              borderRadius: 30, // Optional: add rounded corners for styling
            }}
          >
            <Image
              source={
                focused
                  ? require('../../assets/images/account/drop.png')
                  : require('../../assets/images/account/healthicons_blood-drop-outline-24px.png')
              }
              style={{
                width: 19,
                height: 19,
              }}
            />
            </View>
          ),     
        }}
      />

<Tabs.Screen
        name="profile"
        options={{ 
          title: 'profile',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
             
              justifyContent:"center",
              alignItems:"center",
              backgroundColor: focused ? '#F1F5F9' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical:10,
              marginVertical:10,
              borderRadius: 30, // Optional: add rounded corners for styling
            }}
          >
            <Image
              source={
                focused
                  ? require('../../assets/images/fitness/iconamoon_profile-fill.png')
                  : require('../../assets/images/fitness/iconamoon_profile-bold.png')
              }
              style={{
                width: 19,
                height: 19,
              }}
            />
            </View>
          ),     
        }}
      />
       
    </Tabs>
  );
}
