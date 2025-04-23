import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../header/SaveExeHeader';
 
const image = require('../../assets/images/fitness/Group 11094.png');
const flue = require('../../assets/images/fitness/fluent_dumbbell-24-filled.png');
const fav = require('../../assets/images/fitness/fav.png');
const sched = require('../../assets/images/fitness/ion_time-sharp.png');
const location = require('../../assets/images/fitness/location.png');

const SavedExercise = ({ navigation }) => {
    return (
        <View style={styles.page}>
          <Header name="Saved exercise" arrow="arrow-back" />

            <ScrollView>
                <View style={styles.container}>
                    
                        <View style={styles.imageContainer}>
                            <Image source={image} resizeMode="cover" style={styles.mainImage} />
                            <Image source={fav} resizeMode="contain" style={styles.favIcon} />
                        </View>
                     <View style={styles.details}>
                        <Text style={styles.title}>Bicep Curls - Arms</Text>
                        <View style={[styles.equipmentContainer, { gap: 20 }]}>
                            <View style={styles.equipmentContainer}>
                                <Image source={flue} resizeMode="contain" style={styles.icon} />
                                <Text style={styles.equipmentText}>Dumbbell, Yoga mat</Text>
                            </View>
                            <View style={styles.equipmentContainer}>
                                <Image source={sched} resizeMode="contain" style={styles.icon} />
                                <Text style={styles.equipmentText}>30 Minutes</Text>
                            </View>
                        </View>
                        <View style={styles.equipmentContainer}>
                            <Image source={location} resizeMode="contain" style={styles.icon} />
                            <Text style={styles.equipmentText}>Intermediate</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        marginVertical: 13,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    imageContainer: {
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: 250,
    },
    favIcon: {
        width: '10%',
        height: '20%',
        position: 'absolute',
        top: 0,
        right: '5%',
    },
    details: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "montserratMeduim",
        marginVertical: 10,
    },
    equipmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#334155',
    },
});

export default SavedExercise;
