import { View, Text } from 'react-native'
import React from 'react'
import PaymentInfo from '../../../screens/AccountCreation/allAcounts/PaymentInfo'
import { router } from 'expo-router'

const index = () => {
    const handleNext = ()=>{
        router.replace('/(tabs)/home');
    }
  return (
    <PaymentInfo onNext={handleNext}/>
  )
}

export default index