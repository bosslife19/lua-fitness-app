import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import LoginScreen from '../../../screens/auth/login/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

const Index = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails) {
          setUser(JSON.parse(userDetails));
        }
      } catch (e) {
        console.error('Failed to load userDetails', e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    // or a branded splash screen
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user 
    ? <Redirect href="/(tabs)/home" /> 
    : <LoginScreen />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
