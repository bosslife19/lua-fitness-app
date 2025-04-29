import React, { useContext, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing icon for checkmark
import { Calendar } from 'react-native-calendars';
import period from '../../assets/images/account/perios.png';
import Header from '../../screens/header/CycleHeader';
import {AuthContext} from '../../context/AuthContex';
import { format, differenceInDays } from 'date-fns';

// Energy Level Images
import energy from '../../assets/images/lightning-fill-svgrepo-com 1.png';

// Mood Images
import happy from '../../assets/images/mingcute_happy-fill.png';
import angry from '../../assets/images/mingcute_angry-fill.png';
import neutral from '../../assets/images/iconamoon_neutral-face-fill.png';
import sad from '../../assets/images/mingcute_sad-fill.png';
import content from '../../assets/images/material-symbols_sentiment-content.png';

// comfort
import comfort from '../../assets/images/emoji-happy-svgrepo-com 1.png';
import TemperatureImg from '../../assets/images/Group 1000004287.png';
import warm from '../../assets/images/Group 1000004283.png';
import hot from '../../assets/images/Group 1000004282.png';
import chill from '../../assets/images/Group 1000004285.png';
import variable from '../../assets/images/Group 1000004285 (1).png';

const getCycleBasedSymptoms = (menstrualStartDate) => {
  const today = new Date();
  const startDate = new Date(menstrualStartDate);
  const daysPassed = differenceInDays(today, startDate) % 28;

  if (daysPassed >= 0 && daysPassed <= 4) {
    // Menstrual phase
    return {
      energy: '2',
      mood: 'Sad',
      comfort: '2',
      temperature: 'Chilly',
    };
  } else if (daysPassed >= 5 && daysPassed <= 9) {
    // Follicular phase
    return {
      energy: '3',
      mood: 'Happy',
      comfort: '3',
      temperature: 'Balanced',
    };
  } else if (daysPassed >= 10 && daysPassed <= 14) {
    // Ovulation phase
    return {
      energy: '5',
      mood: 'Content',
      comfort: '4',
      temperature: 'Warm',
    };
  } else if (daysPassed >= 15 && daysPassed <= 21) {
    // Luteal phase
    return {
      energy: '4',
      mood: 'Neutral',
      comfort: '3',
      temperature: 'Variable',
    };
  } else {
    // Late luteal (PMS)
    return {
      energy: '1',
      mood: 'Angry',
      comfort: '1',
      temperature: 'Hot',
    };
  }
};


const energyOptions = [
  { label: '1', value: '1', image: energy },
  { label: '2', value: '2', image: energy },
  { label: '3', value: '3', image: energy },
  { label: '4', value: '4', image: energy },
  { label: '5', value: '5', image: energy },
];

const moodOptions = [
  { label: 'Angry', value: 'Angry', image: angry },
  { label: 'Sad', value: 'Sad', image: sad },
  { label: 'Neutral', value: 'Neutral', image: neutral },
  { label: 'Happy', value: 'Happy', image: happy },
  { label: 'Content', value: 'Content', image: content },
];

const physicalComfortOptions = [
  { label: '1', value: '1', image: comfort },
  { label: '2', value: '2', image: comfort },
  { label: '3', value: '3', image: comfort },
  { label: '4', value: '4', image: comfort },
  { label: '5', value: '5', image: comfort },
];

const temperatureOptions = [
  { label: 'Balanced', value: 'Balanced', image: TemperatureImg },
  { label: 'Warm', value: 'Warm', image: warm },
  { label: 'Hot', value: 'Hot', image: hot },
  { label: 'Chilly', value: 'Chilly', image: chill },
  { label: 'Variable', value: 'Variable', image: variable },
];

const dischargeConsistencyOptions = [
  { label: 'Sticky', value: 'Sticky', image: happy },
  { label: 'Watery', value: 'Watery', image: happy },
  { label: 'Thick', value: 'Thick', image: happy },
];

const quickSymptoms = [
  { label: 'None today', value: 'noneToday' },
  { label: 'Sleep quality', value: 'sleepQuality' },
  { label: 'Mental clarity', value: 'mentalClarity' },
  { label: 'Physical vitality', value: 'physicalVitality' },
];

const Cycle = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEnergy, setSelectedEnergy] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedComfort, setSelectedComfort] = useState('');
  const [selectedTemperature, setSelectedTemperature] = useState('');
  const [selectedDischarge, setSelectedDischarge] = useState('');
  const [symptoms, setSymptoms] = useState([]); // Not used yet
  const [notes, setNotes] = useState('');
  const {userDetails} = useContext(AuthContext)
  const [selectedQuickSymptom, setSelectedQuickSymptom] = useState(null); // Changed to store only one selected symptom
  const cycleBasedDefaults = getCycleBasedSymptoms(userDetails?.menstrual_start);
  const handleQuickSymptomToggle = (value) => {
    setSelectedQuickSymptom(value); // Only one symptom can be selected at a time
  };
  const today = format(new Date(), 'yyyy-MM-dd');
  // const userEnergyLevel = getEnergyLevel(userDetails?.menstrual_start);
  // const userCurrentEnergyOption = energyOptions.find(e => e.value === userEnergyLevel);
  const renderImageOptions = (options, selected, onSelect, defaultValue) => (
    <View style={styles.imageGroup}>
      {options.map((opt) => {
        const isDefault = opt.value === defaultValue;
        const isSelected = opt.value === selected;
  
        return (
          <View key={opt.value}>
            <TouchableOpacity
              onPress={() => onSelect(opt.value)}
              style={[
                styles.imageButton,
                isDefault && styles.imageButtonDefault,   // default from cycle
                isSelected && styles.imageButtonSelected, // user-selected
              ]}
            >
              <Image
                source={opt.image}
                style={styles.optionImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.optionLabel,
                isSelected && styles.optionLabelSelected,
              ]}
            >
              {opt.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
  

  const renderQuickSymptoms = () => (
    <View style={styles.quickSymptomsGroup}>
      {quickSymptoms.map((symptom) => (
        <View key={symptom.value} style={styles.quickSymptom}>
          <TouchableOpacity
            onPress={() => handleQuickSymptomToggle(symptom.value)} // Only one symptom can be selected
            style={[styles.quickSymptomButton,{borderRadius:30}]}
          >
            <Ionicons
              name={selectedQuickSymptom === symptom.value ? 'checkbox' : 'square-outline'}
              size={24}
              style={{borderRadius:40}}
              color={selectedQuickSymptom === symptom.value ? '#8A2BE2' : '#444'}
            />
            <Text
              style={[
                styles.quickSymptomText,
                selectedQuickSymptom === symptom.value && styles.selectedText,
              ]}
            >
              {symptom.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <Header name="Your cycle" arrow="arrow-back" />
      <ScrollView style={styles.container}>
        <View>
          <Image source={period} style={{ width: '100%', height: 240 }} resizeMode="contain" />
        </View>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          current={today}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: '#EACBFF',
            },
          }}
          theme={{
            selectedDayBackgroundColor: '#EACBFF',
            todayTextColor: '#8A2BE2',
            arrowColor: '#8A2BE2',
          }}
        />
  
        {selectedDate !== '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's symptoms</Text>

            <Text style={styles.label}>Energy Level</Text>
            {renderImageOptions(energyOptions, selectedEnergy, setSelectedEnergy, cycleBasedDefaults.energy)}
           

            <Text style={styles.label}>Mood</Text>
            {renderImageOptions(
  moodOptions,
  selectedMood,
  setSelectedMood,
  cycleBasedDefaults.mood
)}

            <Text style={styles.label}>Physical Comfort</Text>
            {renderImageOptions(
  physicalComfortOptions,
  selectedComfort,
  setSelectedComfort,
  cycleBasedDefaults.comfort
)}

            <Text style={styles.label}>Temperature balance</Text>
            {renderImageOptions(
  temperatureOptions,
  selectedTemperature,
  setSelectedTemperature,
  cycleBasedDefaults.temperature
)}

            
            <Text style={styles.label}>Additional notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Share any other details about your day"
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            {/* Quick Symptoms Section */}
            <Text style={styles.label}>Quick Symptoms</Text>
            {renderQuickSymptoms()}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    backgroundColor:"#F1F5F9",
    width:"100%",
    paddingVertical:10,
    textAlign:"center",
    fontSize: 17,
    fontWeight: '700',
    color: '#212121',
    borderRadius:10,
    marginBottom: 12,
    fontFamily: "montserratMeduim"
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 6,
    color: '#444',
    fontFamily: "montserratMeduim"
  },
  imageGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  imageButton: {
    alignItems: 'center',
    marginRight: 0,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
  },
  imageButtonSelected: {
    borderColor: '#8A2BE2',
    backgroundColor: '#F4E8FF',
  },
  optionImage: {
    width: 30,
    height: 30,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontFamily: "montserratMeduim"
  },
  optionLabelSelected: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontFamily: "montserratMeduim"
  },
  notesInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
    marginTop: 6,
    fontSize: 14,
  },
  quickSymptomsGroup: {
    marginTop: 16,
    marginBottom: 12,
  },
  quickSymptom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickSymptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickSymptomText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#444',
    fontFamily: "montserratMeduim"
  },
  selectedText: {
    fontWeight: '600',
    color: '#8A2BE2',
    fontFamily: "montserratMeduim"
  },
  imageButtonDefault: {
    backgroundColor: '#EACBFF', // Light lavender or any cycle highlight color
    borderColor: '#8A2BE2',
    borderWidth: 1.5,
    borderRadius: 10,
  }
});

export default Cycle;
