import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnboardingScreen from './src/screens/OnboardingScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <OnboardingScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
