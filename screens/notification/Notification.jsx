import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../header/Header";
import { router } from "expo-router";
import axiosClient from "../../axiosClient";

// Import Images Correctly
const bell = require("../../assets/images/fitness/solar_bell-bold.png");
const user = require("../../assets/images/fitness/si_user-fill.png");
const weight = require("../../assets/images/fitness/game-icons_weight-lifting-up.png");
const calendar = require("../../assets/images/fitness/Mask group.png");

// Notification Item Component
const NotificationItem = ({ icon, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.flexD}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.imageIcon} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Notification = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getUnread = async () => {
      try {
        const res = await axiosClient.get("/get-unread-notifications");
        setNotifications(res.data.notifications);
  
        // Mark them as read after fetching
        if (res.data.notifications.length > 0) {
          await axiosClient.post("/mark-notifications-as-read");
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
  
    getUnread();
  }, []);
  

  

  return (
    <>
      <Header name="Notifications" arrow="arrow-back" />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bg}>
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <NotificationItem
                icon={
                  notification.type == "reminder"
                    ? bell
                    : notification.type == "missed_workout"
                    ? weight
                    : notification.type == "trainer_message"
                    ? user
                    : user
                }
                title={notification.title}
                description={notification.message}
              />
            ))}

          {/* <NotificationItem
            icon={calendar}
            title="New Personalized Plan"
            description="Your trainer has updated your monthly workout plan. Check it out now!"
            onPress={() => router.push("/(tabs)/home")}
          />
          <NotificationItem
            icon={weight}
            title="Missed Workout Alert"
            description="You missed today's session. Let’s get back on track tomorrow!"
          />
          <NotificationItem
            icon={user}
            title="Trainer Message"
            description="Your trainer left you a note. Tap to read and stay motivated!"
            onPress={() => router.push("/(tabs)/home")}
          /> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "120%",
    marginBottom: "20%",
  },
  bg: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  flexD: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 25,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    paddingRight: "20%",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#F6EDFF",
    padding: 15,
    borderRadius: 6,
  },
  imageIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: "montserratMeduim",
  },
  subText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
    fontFamily: "montserratMeduim",
  },
});

export default Notification;
