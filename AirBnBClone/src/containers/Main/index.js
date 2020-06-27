import React from 'react';
import Animated from 'react-native-reanimated';
import ImageList from '../ImageList';

export default function({paddingTop, scrollY}) {
  return (
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([
        {
          nativeEvent: {contentOffset: {y: scrollY}},
        },
      ])}
      contentInset={{bottom: 120}}
      style={{paddingTop}}>
      <ImageList />
    </Animated.ScrollView>
  );
}
