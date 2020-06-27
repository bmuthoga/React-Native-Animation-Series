import React from 'react';
import {View, Image} from 'react-native';
import {styles} from '../../assets/css/styles';

export default function({imageUri}) {
  return (
    <View style={styles.imageContainer}>
      <Image source={imageUri} style={styles.image} />
    </View>
  );
}
