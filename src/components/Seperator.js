import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Seperator = ({width, height, ...extraProps}) => {
  return <View style={{width, height, ...extraProps}} />;
};

Seperator.defaultProps = {
  width: 0,
  height: 0,
};

export default Seperator;
