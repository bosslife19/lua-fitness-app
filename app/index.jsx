import { Redirect } from 'expo-router';
import React from 'react'
import { useNotification } from '../context/NotificationContext';
import { View } from 'react-native';
 export default function index() {
  //  const {expoPushToken, notification, error} = useNotification()

  //  if(notification){
  //   return (
  //     <View>
  //       <Text>{JSON.stringify(notification?.request.content.data)}</Text>
  //       <Text>{expoPushToken}</Text>
  //     </View>
  //   )
  //  }
  //   return <Redirect href={"/(routes)/onboarding"} />;
    return <Redirect href={"/(routes)/login"} />;
}