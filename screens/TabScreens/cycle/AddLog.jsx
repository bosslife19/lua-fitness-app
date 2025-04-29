import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../../header/CycleHeader'; // Update path if needed

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = January
  const [percentage] = useState(50); // Example static percentage

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const selectedMonthString = (selectedMonth + 1).toString().padStart(2, '0');

  return (
    <>
      <Header name="Add log" arrow="arrow-back" />
      <ScrollView style={styles.container}>
        {/* Percentage */}
     

        {/* Month Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthTabsContainer}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.monthTab, selectedMonth === index && styles.selectedMonthTab]}
              onPress={() => handleMonthSelect(index)}
            >
              <Text style={[styles.monthTabText, selectedMonth === index && styles.selectedMonthTabText]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
           <View style={styles.percentageContainer}>
            <Text style={{color:"#1E293B",fontWeight:500,lineHeight:30}}>Average Tracking Consistency</Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
           <Calendar
            key={selectedMonth} // forces re-render
            current={`2025-${selectedMonthString}-01`}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: '#8A2BE2',
              },
            }}
            onDayPress={handleDayPress}
            theme={{
              selectedDayBackgroundColor: '#8A2BE2',
              todayTextColor: '#8A2BE2',
              arrowColor: '#8A2BE2',
              monthTextColor: '#333',
              textDayHeaderFontWeight: '600',
            }}
            style={styles.calendar}
            firstDay={1}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    height:"100%",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
 
  percentageContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    paddingLeft:10
  },
  percentageText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'montserratMeduim',
  },
  monthTabsContainer: {
    marginBottom: 20,
    // marginTop: 10,
    // paddingVertical: 10,
  },
  monthTab: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:"#F1F5F9"
  },
  selectedMonthTab: {
    borderColor: '#8A2BE2',
    borderWidth:1,
    backgroundColor:"#F6EDFF"
  },
  monthTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
    fontFamily: 'montserratMeduim',
  },
  selectedMonthTabText: {
    color: '#8A2BE2',
  },
  calendarContainer: {
    marginBottom: 20,
    borderWidth:1,
    borderColor:"#fff",
    backgroundColor:"#fff"
  },
  calendar: {
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
  },
});

export default CalendarPage;
