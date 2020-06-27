/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const images = [
  {id: 1, src: require('./assets/img/10.jpg')},
  {id: 2, src: require('./assets/img/11.jpg')},
  {id: 3, src: require('./assets/img/12.jpg')},
  {id: 4, src: require('./assets/img/9.jpg')},
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeImage: null,
    };

    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
  }

  openImage(index) {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY,
      });

      this.dimensions.setValue({
        x: width,
        y: height,
      });

      this.setState(
        {
          activeImage: images[index],
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
              }),
            ]).start();
          });
        },
      );
    });
  }

  closeImage() {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => this.setState({activeImage: null}));
  }
  render() {
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y,
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY,
        },
      ],
    };

    const animatedImageBorderRadius = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [20, 20, 20],
    });

    const animatedImageBorderRadiusStyle = {
      borderTopLeftRadius: animatedImageBorderRadius,
      borderTopRightRadius: animatedImageBorderRadius,
    };

    const animatedCloseOpacity = {
      opacity: this.animation,
    };

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          {images.map((image, index) => (
            <TouchableWithoutFeedback
              key={image.id}
              onPress={() => this.openImage(index)}>
              <Animated.View
                style={[
                  {
                    height: SCREEN_HEIGHT - 150,
                    width: SCREEN_WIDTH,
                  },
                  styles.scrollViewImageContainer,
                ]}>
                <Image
                  ref={img => (this.allImages[index] = img)}
                  source={image.src}
                  style={styles.scrollViewImage}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>

        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}>
          <View
            style={styles.animatedImageContainer}
            ref={view => (this.viewImage = view)}>
            <Animated.Image
              source={
                this.state.activeImage ? this.state.activeImage.src : null
              }
              style={[
                styles.animatedImage,
                activeImageStyle,
                animatedImageBorderRadiusStyle,
              ]}
            />

            <TouchableWithoutFeedback
              onPress={() => this.closeImage()}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
              <Animated.View
                style={[styles.closeButtonContainer, animatedCloseOpacity]}>
                <Text style={styles.closeButton}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>

          <Animated.View
            style={[styles.appTextAnimatedContainer, animatedContentStyle]}>
            <Text style={styles.appTextTitle}>Batian Muthoga</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum justo metus, ultricies faucibus ante ac, malesuada mi
              dapibus dictum dignissim feugiat, pretium in metus.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewImageContainer: {
    padding: 15,
  },
  scrollViewImage: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  animatedImageContainer: {
    flex: 2,
    zIndex: 1001,
  },
  animatedImage: {
    resizeMode: 'cover',
    top: 0,
    left: 0,
    width: null,
    height: null,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  appTextAnimatedContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    zIndex: 1000,
  },
  appTextTitle: {
    fontSize: 24,
    paddingBottom: 10,
  },
};
