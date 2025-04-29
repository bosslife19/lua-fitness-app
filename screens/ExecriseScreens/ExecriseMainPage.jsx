import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import axiosClient from "../../axiosClient";


const image = require("../../assets/images/fitness/Group 11094.png");
const flue = require("../../assets/images/fitness/fluent_dumbbell-24-filled.png");
const fav = require("../../assets/images/fitness/fav.png");
const sched = require("../../assets/images/fitness/ion_time-sharp.png");
const location = require("../../assets/images/fitness/location.png");


const ExerciseMainPage = ({exercises}) => {
  // const [exercises, setExercises] = useState([]);

  // useEffect(() => {
  //   const getExercises = async () => {
  //     try {
  //       const res = await axiosClient.get("/all-exercises");
  //     if (res.data.status) {
  //       setExercises(res.data.exercises);
  //     }
  //     } catch (error) {
  //       if(error?.response)
  //       console.log(error?.response.data);
  //     }
  //       console.log(error)
      
      
  //   };
  //   getExercises();
  // }, []);

  const saveExercise = async (id)=>{
    try {
      const res = await axiosClient.post('/save-exercise', {exercise_id:id})
      if(res.data.status){
        return Alert.alert('Success', 'Workout Saved Successfully')
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error occured while saving workout')
    }
    
  }

  return (
    <View style={styles.page}>
      <View>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(routes)/exercise/ProductDetails",
                    params: {
                      title: item.title,
                      equipment: item.equipments,
                      id: item.id,
                      duration: item.duration,
                      level: item.level,
                      imageId: "group11094", // Instead of passing the image directly
                    },
                  })
                }
              >
                <View style={[styles.imageContainer, { position: "relative" }]}>
                  <Image
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    style={styles.mainImage}
                  />
                  <TouchableOpacity
                    style={styles.favButton}
                    onPress={() =>
                     saveExercise(item.id)
                    }
                  >
                    <Image
                      source={fav}
                      resizeMode="contain"
                      style={styles.favIcon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.equipmentContainer, { gap: 20 }]}>
                  <View style={styles.equipmentContainer}>
                    <Image
                      source={flue}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <Text style={styles.equipmentText}>{item.equipments}</Text>
                  </View>
                  <View style={styles.equipmentContainer}>
                    <Image
                      source={sched}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <Text style={styles.equipmentText}>{item.duration}</Text>
                  </View>
                </View>
                <View style={styles.equipmentContainer}>
                  <Image
                    source={location}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                  <Text style={styles.equipmentText}>{item.level==1?"Beginner":item.level==2?"Intermediate":item.level==3?'Advanced':'Professional'}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    marginVertical: 13,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imageContainer: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: 250,
  },
  favButton: {
    position: "absolute",
    top: 10,
    right: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    // borderRadius: 50,
  },
  favIcon: {
    width: 25,
    height: 25,
  },
  details: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "montserratMedium",
    marginVertical: 10,
  },
  equipmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  equipmentText: {
    fontSize: 12,
    fontFamily: "montserratMedium",
    color: "#334155",
  },
});

export default ExerciseMainPage;
