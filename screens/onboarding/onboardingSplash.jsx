import { View, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { router } from "expo-router"; // Ensure expo-router is correctly installed

const OnBoardingScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/(routes)/welcomeScreen'); // Navigate to your onboarding screen
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Image
          source={require('../../assets/images/logomain.png')}
          style={styles.logo}
          resizeMode="contain" // Ensures the image scales properly
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
  },
});
