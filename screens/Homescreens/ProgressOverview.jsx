import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//  import Monthly from '../../components/chart/Monthly';
// import Current from '../../components/chart/current';
import Movement from '../../components/chart/Movement';
import { AuthContext } from '../../context/AuthContex';
import axiosClient from '../../axiosClient';

const ProgressOverview = () => {
    const {userDetails} = useContext(AuthContext)

    const [monthlyExercise, setMonthlyExercise] = useState(null)
    useEffect(()=>{
        const getMonthly = async ()=>{
            try {
                const res = await axiosClient.get('/get-monthly-exercise-count');
           
            setMonthlyExercise(res.data.count)
            } catch (error) {
                console.log(error)
            }
            
        }
        getMonthly();
    }, [])
    return (
        <View style={styles.bg}>
            <View style={styles.flexD}>
                <View>
                    <Text>Monthly completion</Text>
                    <Text>{monthlyExercise} exercises</Text>
                </View>
                 {/* Chart */}
                 <Movement progress={(monthlyExercise/30)* 100} label={`${Math.round((monthlyExercise/30)*100)}%`} progressColor="#7F56D9" size={40} />
                 </View>
            <View style={styles.flexD}>
                <View>
                    <Text>Current streak</Text>
                    <Text>{userDetails?.streak} days</Text>
                </View>
                {/* Chart */}
                <Movement progress={(userDetails?.streak/7)* 100} label={`${Math.round((userDetails?.streak/7)*100)}%`} progressColor="#7F56D9" size={40} />
                </View>
            <View style={styles.flexD}>
                <View>
                    <Text>Movement Minutes</Text>
                    <Text>{userDetails?.totalMinutes} minutes</Text>
                </View>
                 {/* Chart */}
                 <Movement progress={(userDetails?.totalMinutes/365)* 100} label={`${Math.round((userDetails?.totalMinutes/365)*100)}%`} progressColor="#7F56D9" size={40} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bg:{
        backgroundColor:"#fff",
         borderRadius:20,
        marginHorizontal:5,
        paddingHorizontal:10,
    },
    flexD:{
        marginTop:5,
        flexDirection: "row",
        gap:5,
        paddingVertical:13,
        borderBottomWidth:1,
        borderColor:"#F1F5F9",
        justifyContent: "space-between",
        alignItems: "center",
      },
})

export default ProgressOverview;
