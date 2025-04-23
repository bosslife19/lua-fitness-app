import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import period from "../../assets/images/account/perios.png"
import Header from '../../screens/header/CycleHeader';
const Cycle = () => {
    return (
        <>
        <Header name="Your cycle" arrow="arrow-back" />
        
        <View style={{flex:1, justifyContent:"flex-end",backgroundColor:"#F1F5F9"}}>
            <Image source={period} style={{width:"100%"}} resizeMode="contain" />
        </View>

        </>
    );
}

const styles = StyleSheet.create({})

export default Cycle;
