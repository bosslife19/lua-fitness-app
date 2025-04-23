import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import Header from '../../header/Header';
import Transes from '../../../styles/Traning/Transes';

export default function Notification() {
  const [dataCollection, setDataCollection] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [legal, setLegal] = useState(false);

  return (
    <>
      <Header name="Notification settings" arrow="arrow-back" />
      <View style={{ backgroundColor: "#fff", marginHorizontal: 20, marginVertical: 20, borderRadius: 10, padding: 10 }}>
        
        {/* Data Collection & Usage */}
        <View style={styles.section}>
          <Text style={[Transes.buttonText, { color: "#0F172A", fontSize: 16, fontWeight: "bold" }]}>
          Workout reminders
          </Text>
          <Switch 
            value={dataCollection} 
            onValueChange={setDataCollection} 
            trackColor={{ false: "#D1D5DB", true: "#8A2BE2" }} 
            thumbColor={dataCollection ? "#fff" : "#f4f3f4"} 
          />
        </View>
        <Text style={[styles.description,{borderBottomWidth:1,borderColor:"#F1F5F9"}]}>
          Workout history and preferences
        </Text>

        {/* Cookies & Tracking */}
        <View style={styles.section}>
          <Text style={[Transes.buttonText, { color: "#0F172A", fontSize: 16, fontWeight: "bold" }]}>
          Menstrual cycle alerts
          </Text>
          <Switch 
            value={cookies} 
            onValueChange={setCookies} 
            trackColor={{ false: "#D1D5DB", true: "#8A2BE2" }} 
            thumbColor={cookies ? "#fff" : "#f4f3f4"} 
          />
        </View>
        <Text style={[styles.description,{borderBottomWidth:1,borderColor:"#F1F5F9"}]}>
        Details on tracking technologies
        </Text>

        {/* Legal Compliance */}
        <View style={styles.section}>
          <Text style={[Transes.buttonText, { color: "#0F172A", fontSize: 16, fontWeight: "bold" }]}>
          Progress & Milestones
          </Text>
          <Switch 
            value={legal} 
            onValueChange={setLegal} 
            trackColor={{ false: "#D1D5DB", true: "#8A2BE2" }} 
            thumbColor={legal ? "#fff" : "#f4f3f4"} 
          />
        </View>
        <Text style={[styles.description,{borderBottomWidth:1,borderColor:"#F1F5F9"}]}>
        Progress & Milestones
        </Text>
        <View style={styles.section}>
          <Text style={[Transes.buttonText, { color: "#0F172A", fontSize: 16, fontWeight: "bold" }]}>
          Messages
          </Text>
          <Switch 
            value={legal} 
            onValueChange={setLegal} 
            trackColor={{ false: "#D1D5DB", true: "#8A2BE2" }} 
            thumbColor={legal ? "#fff" : "#f4f3f4"} 
          />
        </View>
        <Text style={[styles.description,{borderBottomWidth:1,borderColor:"#F1F5F9"}]}>
        Notifications for new messages
        </Text>
        <View style={styles.section}>
          <Text style={[Transes.buttonText, { color: "#0F172A", fontSize: 16, fontWeight: "bold" }]}>
          Subscription & Updates
          </Text>
          <Switch 
            value={legal} 
            onValueChange={setLegal} 
            trackColor={{ false: "#D1D5DB", true: "#8A2BE2" }} 
            thumbColor={legal ? "#fff" : "#f4f3f4"} 
          />
        </View>
        <Text style={styles.description}>
        Alerts for subscription renewals
        </Text>

      </View>
      
    </>
  );
}

const styles = {
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
    backgroundColor: "#fff",
    paddingVertical: 2,
    borderRadius: 10,
    // paddingHorizontal: 15,
  },
  description: {
    color: "#64748B",
    fontSize: 14,
    // marginLeft: 15,
    paddingBottom: 10,
    
  },
};
