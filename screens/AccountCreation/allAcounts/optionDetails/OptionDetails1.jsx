import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import DatePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { now } from "moment";
import axiosClient from "../../../../axiosClient";
import { Platform } from "react-native";

export default function OptionDetails1({ onNext }) {
  // const [selectedCycle, setSelectedCycle] = useState(null);
  // const [selectedCycle, setSelectedCycle] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false); // for modal picker if you prefer

  const cycleOptions = [
    { label: "🌞 Morning", value: "Morning" },
    { label: "☀️ Afternoon", value: "Afternoon" },
    { label: "🌙 Evening", value: "Evening" },
  ];

  const handleSkip = () => {
    // this will skip
    onNext();
  };

  const handleProceed =async()=>{
 try {
 
  const res = await axiosClient.post('/register', {
    menstrualStart: startDate
  })
  
  onNext(); 
 } catch (error) {
  console.log(error)
 }
    
   
  }
  const showDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: startDate,
        mode: 'date',
        is24Hour: true,
        onChange: (event, selectedDate) => {
          if (selectedDate) {
            setStartDate(selectedDate);
          }
        },
      });
    } else {
      setOpen(true); // for iOS
    }
  };
  
  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Optional Details</Text>
    <Text style={styles.desc}>
      What’s your start date for menstrual tracking?
    </Text>

    {/* Date Picker Section */}
    <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
  <Text style={styles.dateText}>
    {startDate ? startDate.toDateString() : "Pick a date to start your menstrual tracking"}
  </Text>
</TouchableOpacity>

{Platform.OS === 'ios' && open && (
  <DatePicker
    value={startDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setOpen(false);
      if (selectedDate) {
        setStartDate(selectedDate);
      }
    }}
  />
)}

   

    <TouchableOpacity style={styles.button} onPress={handleProceed}>
      <Text style={styles.buttonText}>Proceed</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btns} onPress={handleSkip}>
      <Text style={styles.buttons}>Skip</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: "2%",
    backgroundColor: "#F8EFFE",
    // flex: 1,
    justifyContent: "center",
  },
  headerText: {
    color:"#0F172A",
    fontSize:26,
    fontWeight:700,
    fontFamily:"montserrat",
    marginBottom:10,
    textAlign:"center"
  },
  desc:{
    color:"#64748B",
    fontFamily:"montserrat",
    fontWeight:500,
    fontSize:14,
//    maxWidth:"80%",
    textAlign:"center",
    marginBottom:20,
},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  optionButton: {
    width:"50%",

    // flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#F8F1FF",
    borderWidth: 1,
    borderColor: "#F6EDFF",
    alignItems: "center",
    marginHorizontal: 5,
  },
  centeredOption: {
    alignSelf: "center",
    width: "80%", 
  },
  optionText: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "montserrat",
    fontWeight: "500",
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: "#8A2BE2",
  },
  selectedOptionText: {
    color: "#8A2BE2",
    fontWeight:"bold",
    lineHeight:18,
    fontFamily: "montserrat",
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  btns: {
    marginTop:15,
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8A2BE2",
  },
  buttons: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#8A2BE2",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "montserrat",
    fontWeight: "bold",
  },
  datePickerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateButton: {
    backgroundColor: "#F8F1FF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D6BBFB",
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    color: "#0F172A",
    fontSize: 16,
    fontFamily: "montserrat",
  },
  
});
