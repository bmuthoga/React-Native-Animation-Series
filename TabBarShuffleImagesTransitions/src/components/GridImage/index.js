import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

export default function GridImage({image, width}) {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: width,
        },
      ]}>
      <Image source={image.uri} style={styles.image} />
    </View>
  );
}
