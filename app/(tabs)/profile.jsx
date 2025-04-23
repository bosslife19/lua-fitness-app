import { 
  Image, 
  StyleSheet, 
  ScrollView, 
  View, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
 import home from "../../assets/images/account/Group 11116.png";
import edit from '../../assets/images/mingcute_edit-fill.png'; // Ensure this is a valid React Component or SVG
import bg from "../../assets/images/bgpur.png";
import sub from "../../assets/images/account/Group 11116 (1).png";
import spanner from "../../assets/images/account/Group 11116 (3).png";
import sched from "../../assets/images/account/Group 11116 (2).png";
import clock from "../../assets/images/account/Group 11116 (4).png";
import work from "../../assets/images/account/Group 11116 (5).png";
import not from "../../assets/images/account/Group 11116 (6).png";
import net from "../../assets/images/account/Group 11116 (7).png";
import settings from "../../assets/images/account/Group 11116 (8).png";
 
 import logos from "../../assets/images/logo.png";
 import { router } from 'expo-router';
import Header from '../../screens/header/Header';
import Transes from '../../styles/Traning/Transes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContex';
import { EvilIcons } from '@expo/vector-icons';

export default function Profile() {
  const {userDetails} = useContext(AuthContext)
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Header name="Profile" arrow="arrow-back" />
        {/* Top Section: Title */}
         <ScrollView contentContainerStyle={styles.scrollViewContainer}>
 
        {/* Image Background Section */}
           <ImageBackground source={bg} style={[styles.imageBackground,{backgroundColor:"#8A2BE2"}]}>
           <View style={{}}>
          <View style={{width:49}}>
          {/* <Image source={logos} style={{width:45,height:45,}} /> */}
          {/* <EvilIcons name="user" size={40} color="black" /> */}
          <EvilIcons name="user" size={49} color="white" />
          </View>
            <Text style={[styles.imageText,{color:"#fff",fontSize:14,fontWeight:500,marginTop:7}]}>{userDetails?.name}</Text>
            <Text style={[styles.imageText,{color:"#CBD5E1",fontSize:14,fontWeight:500}]}>{userDetails?.email}</Text>
            </View>            
           <TouchableOpacity >
            <Image source={edit} style={{width:15,height:15,  }} resizeMode='cover' />
            </TouchableOpacity>
           </ImageBackground>
 
        {/* Placeholder for Additional Content */}
        <View style={[styles.contentContainer,{marginTop:20}]}>
       
          <Text style={[Transes.headerText,{lineHeight:30}]}>Account management</Text>
          <TouchableOpacity onPress={()=> router.push("/(routes)/profile/profilemanagement")} style={styles.flexD}>
            <Image source={home} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Profile management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexD} onPress={()=> router.push("/(routes)/profile/subscription")}>
            <Image source={sub} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexD} onPress={()=> router.push("/(routes)/profile/privacy")}>
            <Image source={sched} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Privacy controls</Text>
          </TouchableOpacity>
         </View>
          {/* Placeholder for Additional Content */}
        <View style={styles.contentContainer}>
       
       <Text style={Transes.headerText}>Training preference</Text>
       <TouchableOpacity style={styles.flexD}>
         <Image source={spanner} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Available equipments</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.flexD}>
         <Image source={clock} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Schedule practice</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.flexD} onPress={()=> router.push("/(routes)/profile/workout")}>
         <Image source={work} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Workout progress</Text>
       </TouchableOpacity>
      </View>
       {/* Placeholder for Additional Content */}
       <View style={styles.contentContainer}>
       
       <Text style={Transes.headerText}>General</Text>
       <TouchableOpacity style={styles.flexD} onPress={()=> router.push("/(routes)/profile/notification")}>
         <Image source={not} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Notification</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.flexD} onPress={()=> router.push("/(routes)/profile/support")}>
         <Image source={net} style={{width:20,height:20}} />
            <Text style={[Transes.contentText,{lineHeight:30}]}>Support center</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.flexD}>
         <Image source={settings} style={{width:20,height:20}} />
        <Text style={[Transes.contentText,{lineHeight:30}]}>Settings</Text>
       </TouchableOpacity>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    backgroundColor:"#F8FAFC",
   
  },
  Header:{
    color:"#0F172A",
    fontFamily:"montserratMeduim",
    fontSize:16,
    fontWeight:700
},
  optionText: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: "montserratMeduim",
    fontWeight: "bold",
        // textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal:20,
    paddingTop:20,
    backgroundColor:"#F8FAFC"
  },
  flexD:{
    marginTop:5,
    flexDirection: "row",
    gap:5,
    // justifyContent: "space-between",
    alignItems: "center",
  },
  
  
  logo: {
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  greetingText: {
    color: "#64748B",
    fontFamily: "montserratMedium",
    fontSize: 12,
    fontWeight: "500",
  },
  
  
  imageBackground: {
    height: 125,
    borderRadius: 20,
    // alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-between",
    overflow: "hidden",
    //  justifyContent: "flex-end",
    // paddingTop: 4,
    paddingHorizontal: 13,
    paddingVertical:10,
    marginHorizontal:16
  },
  imageText: {
    color: "#fff",
    fontFamily: "montserratMedium",
    fontSize: 17,
    fontWeight: "700",
    lineHeight:18
  },
  contentContainer: {
    // padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical:5,
    paddingHorizontal:15,
    paddingVertical:20,
    marginHorizontal:16
  },
  btns: {
    marginTop:"5%",
    flexDirection:"row",
    alignItems:"center",
    width: "35%",
    gap:5,
    paddingVertical: 7,
    paddingHorizontal:10,
    borderWidth: 1,
    borderRadius: 14.29,
    backgroundColor:"#fff",
    borderColor: "#fff",
  },
  button: {
    fontSize: 13,
    fontFamily:"montserratMeduim",
    fontWeight: "700",
    // textAlign: "center",
    color: "#8A2BE2",
  },
});
