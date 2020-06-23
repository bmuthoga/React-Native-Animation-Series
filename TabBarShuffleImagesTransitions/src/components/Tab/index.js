import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-ionicons';
import {styles} from './styles';

export default function Tab({icon, isSelected}) {
  return (
    <View style={styles.container}>
      <Icon name={icon} color={isSelected ? 'black' : 'grey'} size={30} />
    </View>
  );
}
