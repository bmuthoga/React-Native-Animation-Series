import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {styles} from './styles';

const {width} = Dimensions.get('window');

export default function AnimatedBottomSheet({
  translateY,
  gestureHandler,
  zIndex,
}) {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              zIndex,
            },
          ]}
        />
      </TapGestureHandler>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{translateY}],
            width: width - 20,
          },
        ]}>
        <View style={styles.bottomSheetTextContainer}>
          <Text style={styles.bottomSheetWarningText}>Report</Text>
        </View>
        <View style={styles.bottomSheetTextContainer}>
          <Text style={styles.bottomSheetWarningText}>Mute</Text>
        </View>
        <View style={styles.bottomSheetTextContainer}>
          <Text style={styles.bottomSheetWarningText}>Unfollow</Text>
        </View>
        <View style={styles.bottomSheetTextContainer}>
          <Text>Copy Link</Text>
        </View>
      </Animated.View>
    </>
  );
}
