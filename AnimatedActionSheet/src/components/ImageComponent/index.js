import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Icon from 'react-native-ionicons';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {styles} from './styles';

const {width} = Dimensions.get('window');

export default function ImageComponent({image, gestureHandler}) {
  return (
    <>
      <View style={{...styles.imageHeader}}>
        <TapGestureHandler {...gestureHandler}>
          <Animated.View>
            <Icon name="ios-more" size={24} />
          </Animated.View>
        </TapGestureHandler>
      </View>
      <View style={{...styles.imageContainer, width}}>
        <Image source={image.uri} style={{...styles.image}} />
      </View>
    </>
  );
}
