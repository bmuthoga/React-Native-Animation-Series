/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from './src/components/Header';
import Main from './src/containers/Main';
import {styles} from './src/assets/css/styles';

const HEADER_HEIGHT =
  Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight;

const App: () => React$Node = () => {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <View style={styles.container}>
      <Header
        headerHeight={HEADER_HEIGHT}
        headerTranslateY={headerY}
        headerText="Animated Header"
      />
      <Main paddingTop={HEADER_HEIGHT} scrollY={scrollY} />
    </View>
  );
};

export default App;
