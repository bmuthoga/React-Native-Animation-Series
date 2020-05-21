import React, {useState, useRef, useMemo} from 'react';
import {View, Dimensions, Animated, PanResponder} from 'react-native';
import {articles} from './src/data/articles';
import ArticlePage from './src/components/ArticlePage';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const App: () => React$Node = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const swipedCardPosition = useRef(
    new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT}),
  ).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && currentIndex > 0) {
          swipedCardPosition.setValue({
            y: -SCREEN_HEIGHT + gestureState.dy,
            x: 0,
          });
        } else {
          position.setValue({y: gestureState.dy, x: 0});
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
          Animated.timing(swipedCardPosition, {
            toValue: {x: 0, y: 0},
            duration: 400,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(prevIndex => prevIndex - 1);
            swipedCardPosition.setValue({x: 0, y: -SCREEN_HEIGHT});
          });
        } else if (
          -gestureState.dy > 50 &&
          -gestureState.vy > 0.7 &&
          currentIndex < articles.length - 1
        ) {
          Animated.timing(position, {
            toValue: {x: 0, y: -SCREEN_HEIGHT},
            duration: 400,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
            position.setValue({x: 0, y: 0});
          });
        } else {
          Animated.parallel([
            Animated.spring(position, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }),
            Animated.spring(swipedCardPosition, {
              toValue: {x: 0, y: -SCREEN_HEIGHT},
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    }),
  );

  const renderArticles = () =>
    articles
      .map((item, idx) => {
        if (idx === currentIndex - 1) {
          return (
            <Animated.View
              key={item.id}
              style={swipedCardPosition.getLayout()}
              {...panResponder.panHandlers}>
              <ArticlePage
                screenHeight={SCREEN_HEIGHT}
                screenWidth={SCREEN_WIDTH}
                item={item}
              />
            </Animated.View>
          );
        } else if (idx < currentIndex) {
          return null;
        }

        if (idx === currentIndex) {
          return (
            <Animated.View
              key={item.id}
              style={position.getLayout()}
              {...panResponder.panHandlers}>
              <ArticlePage
                screenHeight={SCREEN_HEIGHT}
                screenWidth={SCREEN_WIDTH}
                item={item}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View key={item.id}>
              <ArticlePage
                screenHeight={SCREEN_HEIGHT}
                screenWidth={SCREEN_WIDTH}
                item={item}
              />
            </Animated.View>
          );
        }
      })
      .reverse();

  return <View style={{flex: 1}}>{renderArticles()}</View>;
};

export default App;
