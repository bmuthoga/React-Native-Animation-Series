import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView, State} from 'react-native-gesture-handler';
import Animated, {
  Value,
  useCode,
  cond,
  eq,
  set,
  not,
  interpolate,
} from 'react-native-reanimated';
import {withTransition} from 'react-native-redash';
import ImageComponent from './src/components/ImageComponent';
import {images} from './api/images';
import AnimatedBottomSheet from './src/components/AnimatedBottomSheet';

export default function App() {
  const state = new Value(State.UNDETERMINED);
  const isOpen = new Value(0);
  const transition = withTransition(isOpen);

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [1, 1, -1],
  });

  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [
    state,
    isOpen,
  ]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Animated Action Sheet</Text>
      </View>
      <ScrollView>
        {images.map((image, index) => (
          <ImageComponent
            key={image.id}
            image={image}
            gestureHandler={{
              onHandlerStateChange: Animated.event([
                {
                  nativeEvent: {state},
                },
              ]),
            }}
          />
        ))}
      </ScrollView>
      <AnimatedBottomSheet
        translateY={translateY}
        zIndex={zIndex}
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: {state},
            },
          ]),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'black',
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
});
