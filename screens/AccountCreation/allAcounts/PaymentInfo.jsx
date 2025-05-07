import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, StyleSheet, View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { AuthContext } from '../../../context/AuthContex';
import SectionsLogin from "../../../styles/Login/Login.styles";

const API_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/api`

export default function PaymentInfo({onNext}) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const {userDetails} = useContext(AuthContext);

  // 1. Fetch PaymentSheet parameters from your backend
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:{email:userDetails?.email}
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    
    return { paymentIntent, ephemeralKey, customer };
  };

  const handleNext =  ()=>{
    onNext();
  }

  // 2. Initialize the PaymentSheet
  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'LUA Fitness',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: { name: 'Jane Doe' },
      });

      if (error) {
        console.error('Error initializing PaymentSheet:', error);
        Alert.alert('Error', error.message);
      } else {
        setLoading(true);
      }
    } catch (err) {
      console.error('Error fetching PaymentSheet params:', err);
      
      Alert.alert('Error', 'Unable to initialize payment');
    }
  };

  // 3. Present the PaymentSheet when user taps “Checkout”
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    
      // 1. Compute today and next month
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
    
      // 2. Format as ISO (so Laravel can parse into timestamp columns)
      const formatISO = (d) => d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
      const paymentDate = formatISO(today);         // e.g. "2025-05-05 14:23:45"
      const nextPaymentDate = formatISO(nextMonth); // one month ahead
    
      // 3. Call your backend to persist these dates
      fetch(`${API_URL}/update-payment-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // include auth header if needed:
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_date: paymentDate, next_payment_date: nextPaymentDate, email:userDetails?.email }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            console.error('Update failed:', text);
            throw new Error('Failed to update payment dates');
          }
          return res.json();
        })
        .then((json) => {
          console.log('Dates updated:', json);
          handleNext();
        })
        .catch((err) => {
          console.error(err);
          Alert.alert('Warning', 'Payment succeeded, but updating your record failed.');
          handleNext();  // still proceed, or block as you prefer
        });
    }
    
  };

  // Kick off initialization on mount
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
       <View>

    
<View style={styles.container}>
  <Text style={styles.header}>Payment Information</Text>

  {/* Card Number */}
  {/* <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
      placeholder="Card Number"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      keyboardType="numeric"
      value={cardNumber}
      onChangeText={setCardNumber}
    />
  </View> */}

{/* <View style={{flexDirection:"row", alignItems:"center",gap:20}}>
     
  <View style={[SectionsLogin.contains, {height:"65%", borderColor: "#ECDAFE", borderWidth: 1 ,width:"47%"}]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
      placeholder="Expiration Date (MM/YY)"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      keyboardType="numeric"
      value={expirationDate}
      onChangeText={setExpirationDate}
    />
  </View>


  <View style={[SectionsLogin.contains, {height:"65%", borderColor: "#ECDAFE", borderWidth: 1 ,width:"45%"}]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder ]}
      placeholder="CVV"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      keyboardType="numeric"
      secureTextEntry
      // value={cvv}
      // onChangeText={setCvv}
    />
  </View>

</View> */}
  {/* Zip Code */}
  <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
      placeholder="Name on Card"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      // value={cardName}
      // onChangeText={setCardName}
    />
  </View>
  <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
      placeholder="Zip Code"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      keyboardType="numeric"
      // value={zipCode}
      // onChangeText={setZipCode}
    />
  </View>

  {/* Name on Card */}


  {/* Billing Address */}
  <View style={[SectionsLogin.contains, { borderColor: "#ECDAFE", borderWidth: 1 }]}>
    <TextInput
      style={[SectionsLogin.input, Platform.OS === "ios" && styles.iosPlaceholder]}
      placeholder="Billing Address"
      placeholderTextColor={Platform.OS === "ios" ? "#94A3B8" : undefined}
      // value={billingAddress}
      // onChangeText={setBillingAddress}
    />
  </View>
</View>
<TouchableOpacity
                style={[SectionsLogin.loginButton]}
                onPress={openPaymentSheet}
                disabled={!loading}
              >
                <Text
                  style={[
                    SectionsLogin.loginButtonText,
                    { fontFamily: "montserratMeduim" },
                  ]}
                >
                  Proceed
                </Text>
              </TouchableOpacity>
</View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6ECFE",
    paddingVertical: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "montserratMeduim",
    marginBottom: 15,
    color: "#0F172A",
  },
  inputContainer: {
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    fontFamily: "montserratMeduim",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#0F172A",
  },
  iosPlaceholder: {
    color: "#94A3B8",
  },
});
