import React from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {styles} from '../../assets/css/styles';

export default function({headerHeight, headerTranslateY, headerText}) {
  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {height: headerHeight, transform: [{translateY: headerTranslateY}]},
      ]}>
      <Text>{headerText}</Text>
    </Animated.View>
  );
}
