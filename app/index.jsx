import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function Index() {
  const [hasOnboarded, setHasOnboarded] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('hasOnboarded');
        // stored is "true" or "false" (string) or null
        setHasOnboarded(stored === 'true');
      } catch (e) {
        console.error('Failed to load onboarding flag', e);
        // default to false so they see onboarding
        setHasOnboarded(false);
      }
    })();
  }, []);

  // still loading the flag
  if (hasOnboarded === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // redirect based on the flag
  return hasOnboarded
    ? <Redirect href="/(routes)/login" />
    : <Redirect href="/(routes)/onboarding" />;
}
