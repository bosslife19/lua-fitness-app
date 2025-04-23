import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axiosClient from '../../../axiosClient';
 
export default function OTPMainEmail({ onNext }) {
  const [otp, setOtp] = useState(Array(3).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(52);
  const inputRefs = useRef([]);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async() => {

    if (otp.includes('')) {
      setError('Please enter a valid OTP');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosClient.post('/verify-email',{otp:otp.join('') })
      if(res.data.status){
        Alert.alert('Successful', 'Email verified successfully');
        return onNext()
      }
      else{
        Alert.alert('Error', 'Wrong Otp was provided')
      }
    } catch (error) {
      
    }

    setTimeout(() => {
      setIsLoading(false);
      if (otp.join('') === '123') {
        setSuccessMessage('Email verification successful.');
        setError('');

      
        onNext();  
      } else {
        setError('Invalid Code');
        setSuccessMessage('');
      }
    }, 3000);
  };


  const handleResendCode = () => {
    setOtp(Array(3).fill(''));
    setError('');
    setSuccessMessage('');
    setTimer(52);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={{color:"#475569", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}}>Enter the 3-digit code we sent to your email (for now just enter <Text style={{fontWeight:'700'}}>123</Text>)</Text>
     
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[styles.input, error ? styles.inputError : {}]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            keyboardType="numeric"

          />
        ))}
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      {isLoading && <ActivityIndicator size="small" color="#8A2BE2" style={{ marginTop: 8 }} />}

      <Text style={styles.timerText}>
        {timer > 0 ? 
        <Text
        style={{color:"#475569", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}}
        >
        `Get a new code in <Text style={{color:"#E11D48",fontWeight:700}}>({formatTime()})</Text>
        </Text> : (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={{color:"#475569", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}} >
            Didn’t receive any code? 
                <Text style={styles.resendText}> Resend</Text>
            </Text>
          </TouchableOpacity>
        )}
      </Text>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={isLoading}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 22,
    fontFamily:"montserratMeduim",
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:"center"
  },
  otpContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginVertical: 16,
  },
  input: {
    paddingHorizontal:20,
    paddingBottom:12,
    paddingTop:12,
    
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 10,
    color:"#8A2BE2",
    fontWeight:500,
    fontSize: 14,
    marginHorizontal: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginBottom: 8,
  },
  verifyButton: {
    backgroundColor: '#8A2BE2',
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8A2BE2",
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign:"center"
  },
  timerText: {
    fontSize: 14,
    marginTop: 10,
  },
  resendText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});

