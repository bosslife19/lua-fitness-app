import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Header = ({ name }) => {
    const navigation = useNavigation(); // Get navigation object

    return (
        <View style={styles.headerContainer}>
 
            {/* Centered Title */}
            <Text style={styles.headerText}>{name}</Text>

            <TouchableOpacity onPress={() => router.push("/(routes)/exercise/History")}>
            <FontAwesome5 name="history" size={14} color="black" />           
             </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: "15%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
         fontFamily: "montserratMeduim"
    },
});

export default Header;
