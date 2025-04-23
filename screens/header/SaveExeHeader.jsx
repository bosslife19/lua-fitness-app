import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';

const Header = ({ name }) => {
    const navigation = useNavigation(); // Get navigation object

    return (
        <View style={styles.headerContainer}>
            {/* Go Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={21}  color="#0F172A" />
            </TouchableOpacity>

            {/* Centered Title */}
            <View>
                 <Text style={styles.headerText}>{name}</Text>
            </View>

           <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
            
            <TouchableOpacity>
            <Feather name="search" size={20} color="black" />
            </TouchableOpacity>
           </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: "15%",
        justifyContent: "space-between",
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
