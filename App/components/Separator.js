import React from 'react';
import {View, StyleSheet} from 'react-native';
import color from '../constants/Colors';
const Separator = () => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: color.Grey,
      }}
    />
  );
};

export default Separator;
