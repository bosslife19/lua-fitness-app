import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
  import { router, useNavigation } from "expo-router";
//  import HeaderCheckoutStyl from "@/styles/HeaderCheckout/Headercheckout";
import ExerciseMainPage from "./ExecriseMainPage";
import HeaderCheckoutStyl from "../../styles/HeaderStyles/Headercheckout";
import Header from "../header/ExecriseMainHeader";
import filter from "../../assets/images/fitness/mdi_filter-outline.png"
import axiosClient from "../../axiosClient";
import { AuthContext } from "../../context/AuthContex";
// TabHeader Component
const TabHeader = ({ activeTab, setActiveTab }) => {
  const tabs = ["All", "Saved","For You"];
   const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{     backgroundColor:"#F8FAFC" , paddingHorizontal: "3.4%", paddingTop: 10, paddingBottom: 10 }}>
     <Header name="Exercise Library" arrow="arrow-back" />
      <View style={HeaderCheckoutStyl.tabContainer}>
        {tabs.map((tab) => (
          <React.Fragment key={tab}>
            <TouchableOpacity
              style={[
                HeaderCheckoutStyl.tabButton,
                activeTab === tab && HeaderCheckoutStyl.activeTab,
               ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  HeaderCheckoutStyl.tabButtonText,
                  activeTab === tab && HeaderCheckoutStyl.activeTabText,
                 ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
           </React.Fragment>
        ))}
        {/* <TouchableOpacity onPress={()=> router.push("/(routes)/exercise/traningSchedule")}>
        <Image source={filter} style={{width:20,height:20}} />
        </TouchableOpacity> */}
      </View>
    </View>
  ); 
};
 
const TabPanel = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allExercieses, setAllExercises] = useState([])
  const [savedExercises, setSavedExercises] = useState([])
  const [yourExercises, setYourExercises] = useState([])
  const {userDetails} = useContext(AuthContext)
   useEffect(() => {
    const getExercises = async () => {
      try {
        const res = await axiosClient.get("/all-exercises");
        if (res.data.status) {
          
  
          // Exercises meant for all users (assigned_users is empty)
          setAllExercises(res.data.exercises.filter(item => item.assigned_users.length === 0));
  
          // Exercises assigned to the authenticated user
          setYourExercises(
            res.data.exercises.filter(item =>
              item.assigned_users.some(u => u.id === userDetails.id)
            )
          );
        }
      } catch (error) {
        if (error?.response) {
          console.log(error.response.data);
        }
      }
          console.log(error)
        
        
      };
      const getSavedExercises = async () => {
        try {
          const res = await axiosClient.get("/saved-exercises");
          console.log(res.data)
        if (res.data.status) {
          setSavedExercises(res.data.exercises);
        }
        } catch (error) {
          if(error?.response)
          console.log(error?.response.data);
        }
          console.log(error)
        
        
      };
      getExercises();
      getSavedExercises();
    }, []);
  

  return (
    <View style={HeaderCheckoutStyl.container}>
      {/* Header Section */}
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Section */}
      {activeTab === "All" && <ExerciseMainPage exercises={allExercieses}/>}
      {activeTab === "Saved" && <ExerciseMainPage exercises={savedExercises}/>}
      {activeTab === "For You" && <ExerciseMainPage exercises={yourExercises}/>}

     </View>
  );
};

export default TabPanel;
