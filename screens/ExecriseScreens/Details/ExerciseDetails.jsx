import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import Trans from "../../../styles/Traning/TranExec";
const image = require("../../../assets/images/Rectangle 180.png");
const flue = require("../../../assets/images/fitness/fluent_dumbbell-24-filled.png");
const gym = require("../../../assets/images/healthicons_exercise-bicycle (1).png");
const sched = require("../../../assets/images/fitness/ion_time-sharp.png");
import { useNavigation } from "@react-navigation/native";
import axiosClient from "../../../axiosClient";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent, useEventListener } from "expo";
import { useRequest } from "../../../hooks/useRequest";
import { Alert, ActivityIndicator } from "react-native";

const ExerciseDetails = ({ img }) => {
  // const {  title, equipment, duration, level } = useLocalSearchParams();

  const [expanded, setExpanded] = useState(false);
 
  const watchStartTimeRef = useRef(null);

  const { makeRequest, loading } = useRequest();

  const navigation = useNavigation(); // Get navigation object
  const { id } = useLocalSearchParams();
  const [exercise, setExercise] = useState(null);
  const [videoSource, setVideoSource] = useState("");
  const truncatedText =
    exercise?.instructions.length > 100
      ? `${exercise?.instructions.slice(0, 100)}...`
      : exercise?.instructions;

  useEffect(() => {
    const getExercise = async () => {
      const res = await axiosClient.get(`/exercises/${id}`);
      if (res.data.status) {
        setVideoSource(res.data.exercise.video_url);
        setExercise(res.data.exercise);
      }
    };
    getExercise();
  }, []);
  
  const saveWorkout = async ()=>{
    const {response, error} = await makeRequest('/save-exercise', {exercise_id:exercise?.id});
    if(response){
      Alert.alert('Success', 'Successfully saved this workout');
    }
    if(error){
      Alert.alert('Error', 'Error saving workout')
    }
  }
  useFocusEffect(
    useCallback(() => {
      // Screen is focused (user entered the page)
      console.log('Screen focused');
      watchStartTimeRef.current = Date.now();
      console.log('Video started');

  
      return () => {
        // Screen is unfocused (user is leaving the page)
        
        // Perform cleanup actions, save state, or update server here
        const watchDuration = Math.round((Date.now() - watchStartTimeRef.current) / 1000);
        if(watchDuration >= 30){
          const watchedMinutes = watchDuration/60;
        
          makeRequest('/update-watch-time', { seconds_watched: watchDuration, exercise_id:id, status:watchedMinutes>=exercise?.duration?'Completed':"Uncompleted" })
          .then(res => console.log('Watch time updated:', res))
          .catch(err => console.error('Error:', err));
        }

      };
    }, [])
  );
  const player = useVideoPlayer(videoSource);
  useEffect(() => {
  if (player) {
    player.loop = true;
    player.play();
  }
}, [player]);
  // const { isPlaying } = useEvent(player, "playingChange", {
  //   isPlaying: player.playing,
  // });
 
  
  

  if (!videoSource) {
    return null;
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView style={styles.container}>
        {/* <Image source={image} style={styles.image} resizeMode="cover" /> */}
        <View style={styles.contentContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            
          />
          <View style={styles.controlsContainer}>
            {/* <Button
              title={isPlaying ? "Pause" : "Play"}
              onPress={() => {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }}
            /> */}
          </View>
        </View>
        {/* back button */}
        <TouchableOpacity
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={21} color="#fff" />
        </TouchableOpacity>
        {/* Edit button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 50,
            backgroundColor: "#C1C1C133",
            padding: 8,
            borderRadius: 30,
          }}
        >
          <Feather name="edit-3" size={12} color="#fff" />
        </TouchableOpacity>
        {/* play button */}
        {/* <TouchableOpacity style={[Trans.favButton,{position:"absolute",right:"50%",top:"20%",backgroundColor:"#C1C1C133",padding:8,borderRadius:30}]}  >
             <Entypo name="controller-play" size={24} color="#fff" />
         </TouchableOpacity> */}
        {/* Name */}
        <View
          style={{
            position: "absolute",
            right: "50%",
            top: 50,
            padding: 8,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              letterSpacing: 1,
              fontFamily: "montserratMeduim",
            }}
          >
            {exercise?.title}
          </Text>
        </View>

        <View style={[styles.detailsContainer, { margin: 15 }]}>
          <View
            style={[styles.equipmentContainer, { gap: 6, flexWrap: "wrap" }]}
          >
            <View style={styles.equipmentContainer}>
              <Image source={flue} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercise?.equipment}</Text>
            </View>
            <View style={styles.equipmentContainer}>
              <Image source={sched} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercise?.duration}</Text>
            </View>
            <View style={styles.equipmentContainer}>
              <Image source={gym} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercise?.duration}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 0 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                marginTop: 10,
                fontFamily: "montserratMeduims",
              }}
            >
              Instructions
            </Text>
            <Text style={{ color: "#475569", fontFamily: "montserratMeduims" }}>
              {expanded ? exercise?.instructions : truncatedText}
            </Text>
            {exercise?.instructions.length > 500 && (
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text style={styles.readMore}>{expanded ? " " : ""}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[styles.detailsContainer, { marginHorizontal: 20 }]}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 17,
              fontFamily: "montserratMeduims",
            }}
          >
            Targeted muscles
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
              marginTop: 10,
              fontFamily: "montserratMeduims",
            }}
          >
            Working Muscles:
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                marginTop: 10,
                fontFamily: "montserratMeduims",
              }}
            >
              {" "}
              Bicep Brachii, Brachil
            </Text>
          </Text>

          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
              marginTop: 10,
              fontFamily: "montserratMeduims",
              display: "flex",
            }}
          >
            Suporting muscles:
            <Text
              style={{
                fontWeight: "400",
                fontSize: 15,
                marginTop: 10,
                fontFamily: "montserratMeduims",
              }}
            >
              Brachioradialis, Forearm Flexors and Extensors, Deltoid
            </Text>
          </Text>
        </View>

        <View
          style={[
            styles.detailsContainer,
            { marginHorizontal: 20, marginTop: 15 },
          ]}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 17,
              fontFamily: "montserratMeduims",
              lineHeight: 30,
            }}
          >
            Trainers note
          </Text>
          <Text style={{ color: "#475569", fontFamily: "montserratMeduims" }}>
            {exercise?.trainer_notes}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={saveWorkout}
      >
        <Text style={styles.buttonText}>
          {
            loading? <ActivityIndicator size={20} color='white'/>:
            'Save Workout'
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#F8FAFC" },
  image: { width: "100%", height: 500 },
  detailsContainer: { padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  info: { fontWeight: "normal" },
  equipmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  icon: {
    width: 12.27,
    height: 12.27,
    marginRight: 4,
  },
  equipmentText: {
    fontSize: 11,
    fontFamily: "montserratMeduim",
    color: "#334155",
  },
  button: {
    margin: 13,
    backgroundColor: "#8A2BE2",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    padding: 4,
    fontFamily: "montserratMedium",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 500,
  },
  controlsContainer: {
    padding: 10,
  },
});

export default ExerciseDetails;
