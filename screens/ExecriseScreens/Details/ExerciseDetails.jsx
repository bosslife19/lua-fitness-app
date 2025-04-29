import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  ImageBackground,
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
  const [videoSource, setVideoSource] = useState("");
const [exercises, setExercises] = useState([]);
const [exerciseIndex, setExerciseIndex] = useState(0)
const [otherVideos, setOtherVideos] = useState([]);
const [workout, setWorkout] = useState(null)
const [currentVideo, setCurrentVideo] = useState('')
const [isLast, setIsLast] = useState(false);
  const truncatedText =
    exercises[exerciseIndex]?.instructions.length > 100
      ? `${exercises[exerciseIndex]?.instructions.slice(0, 100)}...`
      : exercises[exerciseIndex]?.instructions;

  useEffect(() => {
    const getExercise = async () => {
      const res = await axiosClient.get(`/exercises/${id}`);
     
      setWorkout(res.data.workout)
      if (res.data.status) {
       
        setExercises(res.data.workout.exercises)


       
        const video = res.data.workout.exercises[exerciseIndex].video_url || '';

        setCurrentVideo(video);
       
      setVideoSource(video);
      // setOtherVideos(videos.slice(1)); // All except the first
      // setExercise(res.data.exercise);
      }
    };
    getExercise();
  }, []);

  useEffect(()=>{
    
    
    const isLastVideo = exercises?.findIndex(ex => ex.video_url === currentVideo) === exercises.length - 1;
    
    if(isLastVideo){
     
      setIsLast(true);
    }else{
      setIsLast(false);
     
    }
  }, [currentVideo])

  const onNext = () => {
    if (exerciseIndex < exercises.length - 1) {
      const newIndex = exerciseIndex + 1;
      setExerciseIndex(newIndex);
      setCurrentVideo(exercises[newIndex]?.video_url);
      setVideoSource(exercises[newIndex]?.video_url);
    }
  };
  const onPrev = () => {
    if (exerciseIndex > 0) {
      const newIndex = exerciseIndex - 1;
      setExerciseIndex(newIndex);
      setCurrentVideo(exercises[newIndex]?.video_url);
      setVideoSource(exercises[newIndex]?.video_url);
    }
  };
  
  const saveWorkout = async ()=>{
    const {response, error} = await makeRequest('/save-exercise', {exercise_id:exercises[exerciseIndex]?.id});
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
      // console.log('Screen focused');
      watchStartTimeRef.current = Date.now();
      // console.log('Video started');

  
      return () => {
        // Screen is unfocused (user is leaving the page)
        
        // Perform cleanup actions, save state, or update server here
        const watchDuration = Math.round((Date.now() - watchStartTimeRef.current) / 1000);
        if(watchDuration >= 30){
          const watchedMinutes = watchDuration/60;
        
          makeRequest('/update-watch-time', { seconds_watched: watchDuration, exercise_id:id, status:watchedMinutes>=exercises?.reduce((sum, exercise) => sum + exercise.duration, 0)?'Completed':"Uncompleted" })
          .then(res => 
            console.log('Watch time updated:', res)
          )
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
            {workout?.name}
          </Text>
        </View>
        <View style={styles.navContainer}>
    <TouchableOpacity style={styles.buttons} onPress={onPrev}>
      <Ionicons name="chevron-back" size={20} color="#fff" />
      <Text style={styles.buttonTexts}>Prev</Text>
    </TouchableOpacity>

     <TouchableOpacity disabled={isLast} style={[styles.buttons,{backgroundColor:isLast ?'gray':'#4A90E2', color:isLast&&'black'}]} onPress={onNext}>
  <Text style={styles.buttonTexts}>Next</Text>
  <Ionicons name="chevron-forward" size={20} color="#fff" />
</TouchableOpacity>


  </View>
        <View style={[styles.detailsContainer, { margin: 15 }]}>
          <View
            style={[styles.equipmentContainer, { gap: 6, flexWrap: "wrap" }]}
          >
            <View style={styles.equipmentContainer}>
              <Image source={flue} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercises[exerciseIndex]?.level==1?"Beginner":exercises[exerciseIndex]?.level==2?"Intermediate":exercises[exerciseIndex]?.level==3?"Advanced":"Professional"}</Text>
            </View>
            <View style={styles.equipmentContainer}>
              <Image source={sched} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercises[exerciseIndex]?.duration}minutes</Text>
            </View>
           
            <View style={styles.equipmentContainer}>
              <Image source={gym} resizeMode="contain" style={styles.icon} />
              <Text style={styles.equipmentText}>{exercises[exerciseIndex]?.equipments}</Text>

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
              {expanded ? exercises[exerciseIndex]?.instructions : truncatedText}
            </Text>
            {exercises[exerciseIndex]?.instructions.length > 500 && (
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
              {exercises[exerciseIndex]?.working_muscles}
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
              {exercises[exerciseIndex]?.supporting_muscles}
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
            {exercises[exerciseIndex]?.trainer_notes}
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
  smallVideosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 10,
    width:'98%',
   marginHorizontal:"1%",
    top:'-3%'
  },
  // smallVideoBox: {
  //   width: 100,
  //   height: 70,
  //   borderRadius: 8,
  //   overflow: 'hidden',
  //   backgroundColor: '#ccc', // fallback bg
  // },
  smallVideo: {
    width: '100%',
    height: '100%',
  },
  smallVideoBox: {
    width: 100,  // Adjust width based on your layout
    height: 100, // Adjust height
    margin: 5,   // Adjust margin as needed
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',  // Center content inside the background
    alignItems: 'center',      // Center content horizontally
  },
  backgroundImageStyle: {
    borderRadius: 10,  // Optional: for rounded corners
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay for contrast
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Optional: for rounded corners
  },
  numberText: {
    color: '#fff',           // White color for the numbers
    fontSize: 50,            // Large numbers
    fontWeight: 'bold',      // Bold numbers
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Shadow for text for more contrast
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,    // Shadow blur
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonTexts: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 6,
    fontSize: 16,
  },
});

export default ExerciseDetails;
