import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import Icon from 'react-native-ionicons';
import Slider from '@react-native-community/slider';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    };

    this.scrollOffset = 0;

    this.animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - 90});

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (
          (this.state.isScrollEnabled &&
            this.scrollOffset <= 0 &&
            gestureState.dy > 0) ||
          (!this.state.isScrollEnabled && gestureState.dy < 0)
        ) {
          return true;
        } else {
          return false;
        }
      },
      onPanResponderGrant: () => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        this.animation.setValue({x: 0, y: gestureState.dy});
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          /* fix scrolling below bottom of screen */
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.moveY < 120) {
          /* fix scrolling above top of screen */
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < 0) {
          /* animate up */
          this.setState({isScrollEnabled: true});
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          /* animate down */
          this.setState({isScrollEnabled: false});
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1,
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform(),
    };

    const animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: 'clamp',
    });

    const animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: 'clamp',
    });

    const animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT / 2, 90],
      extrapolate: 'clamp',
    });

    const animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    const animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: ['rgba(0,0,0,0.5)', 'white'],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.container, {backgroundColor: animatedBackgroundColor}]}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            animatedHeight,
            styles.view,
            {
              height: SCREEN_HEIGHT,
            },
          ]}>
          <ScrollView
            scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y;
            }}>
            <Animated.View
              style={[
                styles.minControlsContainer,
                {
                  height: animatedHeaderHeight,
                },
              ]}>
              <View style={styles.minControlsSongInfoContainer}>
                <Animated.View
                  style={{
                    height: animatedImageHeight,
                    width: animatedImageHeight,
                    marginLeft: animatedImageMarginLeft,
                  }}>
                  <Image
                    style={styles.minControlsSongCover}
                    source={require('./assets/img/cover.jpg')}
                  />
                </Animated.View>
                <Animated.Text
                  style={[
                    styles.minControlsSongTitle,
                    {
                      opacity: animatedSongTitleOpacity,
                    },
                  ]}>
                  Psy Trance Mix (Top 50)
                </Animated.Text>
              </View>
              <Animated.View
                style={[
                  styles.minControlsIconsContainer,
                  {
                    opacity: animatedSongTitleOpacity,
                  },
                ]}>
                <Icon name="md-pause" size={32} />
                <Icon name="md-play" size={32} />
              </Animated.View>
            </Animated.View>

            <Animated.View
              style={{
                height: animatedHeaderHeight,
                opacity: animatedSongDetailsOpacity,
              }}>
              <View style={styles.maxControlsSongInfoContainer}>
                <Text style={styles.maxControlsSongTitle}>
                  Psy Trance Mix (Top 50)
                </Text>
                <Text style={styles.maxControlsArtistTitle}>
                  Progressive Radio Show
                </Text>
              </View>
              <View
                style={[
                  styles.maxControlsSliderContainer,
                  {width: SCREEN_WIDTH},
                ]}>
                <Slider
                  style={styles.maxControlsSlider}
                  minimumValue={0}
                  maximumValue={10}
                  value={3}
                  minimumTrackTintColor="silver"
                />
              </View>
              <View style={styles.maxControlsIconsContainer}>
                <Icon name="md-rewind" size={40} />
                <Icon name="md-pause" size={50} />
                <Icon name="md-fastforward" size={40} />
              </View>
              <View style={styles.maxControlsAddMoreIconsContainer}>
                <Icon name="md-add" size={32} color="#fa95ed" />
                <Icon name="md-more" size={32} color="#fa95ed" />
              </View>
            </Animated.View>
            <View style={{height: 1000}} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
  },
  minControlsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ebe5e5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  minControlsSongInfoContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  minControlsSongCover: {
    flex: 1,
    width: null,
    height: null,
  },
  minControlsSongTitle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  minControlsIconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  maxControlsSongInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  maxControlsSongTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  maxControlsArtistTitle: {
    fontSize: 18,
    color: '#fa95ea',
  },
  maxControlsSliderContainer: {
    height: 40,
    alignItems: 'center',
  },
  maxControlsSlider: {
    width: 300,
  },
  maxControlsIconsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maxControlsAddMoreIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
};
