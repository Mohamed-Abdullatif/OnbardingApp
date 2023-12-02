import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Display from '../utils/Display';

const OnboardingCard = ({id, image, title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default OnboardingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  image: {
    width: Display.setWidth(60),
    height: Display.setHeight(30),
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    marginTop: 10,
    lineHeight: 25 * 1.4,
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 17,
    lineHeight: 18 * 1.4,
    textAlign: 'center',
  },
});
