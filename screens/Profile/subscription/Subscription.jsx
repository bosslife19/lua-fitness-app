import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Octicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import bgImage from "../../../assets/images/account/Rectangle 5944.png";
import bgblur from "../../../assets/images/account/Rectangle 5945.png";
import Transes from '../../../styles/Traning/Transes';

const Subscription = () => {
    const navigation = useNavigation();
    const [checkedItemsBasic, setCheckedItemsBasic] = useState([false, false, false, false]);
    const [checkedItemsPremium, setCheckedItemsPremium] = useState([false, false, false, false]);

    const toggleCheck = (index, isPremium) => {
        if (isPremium) {
            setCheckedItemsPremium(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        } else {
            setCheckedItemsBasic(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    const checkAll = (isPremium) => {
        if (isPremium) {
            setCheckedItemsPremium([true, true, true, true]);
        } else {
            setCheckedItemsBasic([true, true, true, true]);
        }
    };

    return (
        <View>
         <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={bgImage} style={styles.backgroundImage}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={21} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Subscription</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>Select your plan to get connected</Text>
                            <Text style={styles.description}>Join a community built on encouragement and understanding</Text>
                        </View>
                    </ImageBackground>

                    {/* Basic Plan */}
                    <View>

                   
                    <Image source={bgblur} style={styles.blurContainer} />

                    <View style={styles.planContainer}>

                        <Text style={styles.planTitle}>Basic Plan</Text>
                        <Text style={styles.planPrice}>Free</Text>
                        <View style={styles.planFeatures}>
                            {["Personalized Training Plans", "Exclusive Exercise Library", "1-on-1 Trainer Support", "Progress Insights & Analytics"].map((feature, index) => (
                                <TouchableOpacity key={index} style={styles.featureItem} onPress={() => toggleCheck(index, false)}>
                                    {checkedItemsBasic[index] ? (
                                        <FontAwesome5 name="check" size={6} color="black" style={{borderWidth:1,borderColor:"#fff",backgroundColor:"#0D9488",borderRadius:30,padding:2}} />
                                    ) : (
                                        <View >
                                        <Octicons name="circle" size={6} color="black"  />
                                        </View>
                                    )}
                                    <Text style={[Transes.equipmentText, { color: "#fff", lineHeight: 30, marginLeft: 10 }]}>{feature}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={Transes.buttoned} onPress={() => checkAll(false)}>
                                <Text style={Transes.buttonText}>Get started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Premium Plan */}
                    <View style={styles.planContainer}>
                        <Text style={styles.planTitle}>Premium</Text>
                        <Text style={styles.planPrice}>$5.86/ month</Text>
                        <View style={styles.planFeatures}>
                            {["Personalized Training Plans", "Exclusive Exercise Library", "1-on-1 Trainer Support", "Progress Insights & Analytics"].map((feature, index) => (
                                <TouchableOpacity key={index} style={styles.featureItem} onPress={() => toggleCheck(index, true)}>
                                    {checkedItemsPremium[index] ? (
                                        <FontAwesome5 name="check" size={6} color="black" style={{borderWidth:1,borderColor:"#fff",backgroundColor:"#0D9488",borderRadius:30,padding:2}} />
                                    ) : (
                                        
                                        <Octicons name="circle" size={10} color="#fff"  />
                                     )}
                                    <Text style={[Transes.equipmentText, { color: "#fff", lineHeight: 30, marginLeft: 10 }]}>{feature}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={Transes.buttoned} onPress={() => checkAll(true)}>
                                <Text style={Transes.buttonText}>Get started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        paddingBottom: 40,
    },
    backgroundImage: {
        width: "100%",
        height: 350,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: "13%",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "montserratMedium"
    },
    content: {
        padding: 20,
        marginTop:10
    },
    title: {
        width: "65%",
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 5,
        color: "#FFF",
        fontFamily: "montserratMedium"
    },
    description: {
        width: "75%",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 20,
        color: "#F1F5F9",
        fontFamily: "montserratMedium"
    },
    blurContainer: {
        position: "absolute",
        top: -30,
        width: "100%",
        height: 100,
        marginTop: -20,
        borderRadius: 10,
        overflow: "hidden",
    },
    planContainer: {
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#192441"
    },
    planTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
        color: "#FFF",
        fontFamily: "montserratMedium"
    },
    planPrice: {
        fontSize: 14,
        fontWeight: 500,
        color: "#fff",
        marginBottom: 10,
        fontFamily: "montserratMedium"
    },
    planFeatures: {
        borderTopColor: "#192441",
        borderTopWidth: 1,
        paddingVertical: 20
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    }
});

export default Subscription;
