import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const LoginScreen = () => {
  const loginHeight = useRef(new Animated.Value(150)).current;
  const textInputMobile = useRef();
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const forwardArrowOpacity = useRef(new Animated.Value(0)).current;
  const borderBottomWidth = useRef(new Animated.Value(0)).current;
  const [placeholderText, setPlaceholderText] = useState(
    'Enter your mobile number',
  );

  const increaseHeightOfLogin = () => {
    setPlaceholderText('712 345 678');

    Animated.timing(loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      textInputMobile.current.focus();
    });
  };

  const decreaseHeightOfLogin = () => {
    Keyboard.dismiss();
    Animated.timing(loginHeight, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const headerTextOpacity = loginHeight.interpolate({
    inputRange: [150, SCREEN_HEIGHT],
    outputRange: [1, 0],
  });

  const marginTop = loginHeight.interpolate({
    inputRange: [150, SCREEN_HEIGHT],
    outputRange: [25, 100],
  });

  const headerBackArrowOpacity = loginHeight.interpolate({
    inputRange: [150, SCREEN_HEIGHT],
    outputRange: [0, 1],
  });

  const titleTextLeft = loginHeight.interpolate({
    inputRange: [150, SCREEN_HEIGHT],
    outputRange: [100, 25],
  });

  const titleTextBottom = loginHeight.interpolate({
    inputRange: [150, 400, SCREEN_HEIGHT],
    outputRange: [0, 0, 100],
  });

  const titleTextOpacity = loginHeight.interpolate({
    inputRange: [150, SCREEN_HEIGHT],
    outputRange: [0, 1],
  });

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration + 100,
        toValue: event.endCoordinates.height + 10,
        useNativeDriver: false,
      }),
      Animated.timing(forwardArrowOpacity, {
        duration: event.duration,
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(borderBottomWidth, {
        duration: event.duration,
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration + 100,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(forwardArrowOpacity, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(borderBottomWidth, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardDidShow = event => {
    const duration = 100;

    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10,
        useNativeDriver: false,
      }),
      Animated.timing(forwardArrowOpacity, {
        duration,
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(borderBottomWidth, {
        duration,
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardDidHide = () => {
    const duration = 100;

    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: duration + 100,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(forwardArrowOpacity, {
        duration,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(borderBottomWidth, {
        duration,
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.arrowBack, {opacity: headerBackArrowOpacity}]}>
        <TouchableOpacity onPress={() => decreaseHeightOfLogin()}>
          <Icon name="arrow-back" color="black" type="material" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.arrowForward,
          {
            bottom: keyboardHeight,
            opacity: forwardArrowOpacity,
          },
        ]}>
        <Icon name="arrow-forward" color="white" type="material" />
      </Animated.View>

      <ImageBackground
        source={require('../../assets/img/login_bg.jpg')}
        style={styles.imageBackground}>
        {/* TOP SECTION */}
        <View style={styles.uberTitleView}>
          <Animatable.View
            animation="zoomIn"
            iterationCount={1}
            style={styles.uberTitleAnimatableView}>
            <Text style={styles.uberTitleText}>UBER</Text>
          </Animatable.View>
        </View>

        {/* BOTTOM SECTION */}
        <Animatable.View animation="slideInUp" iterationCount={1}>
          <Animated.View
            style={{
              height: loginHeight,
              backgroundColor: 'white',
            }}>
            <Animated.View
              style={{
                opacity: headerTextOpacity,
                alignItems: 'flex-start',
                paddingHorizontal: 25,
                marginTop,
              }}>
              <Text style={{fontSize: 24}}>Get moving with Uber</Text>
            </Animated.View>

            <TouchableOpacity onPress={() => increaseHeightOfLogin()}>
              <Animated.View
                style={{
                  marginTop,
                  paddingHorizontal: 25,
                  flexDirection: 'row',
                }}>
                <Animated.Text
                  style={{
                    position: 'absolute',
                    fontSize: 24,
                    color: 'gray',
                    bottom: titleTextBottom,
                    left: titleTextLeft,
                    opacity: titleTextOpacity,
                  }}>
                  Enter your mobile number
                </Animated.Text>
                <Image
                  source={require('../../assets/img/kenya.png')}
                  style={styles.flag}
                />
                <Animated.View
                  pointerEvents="none"
                  style={{flexDirection: 'row', flex: 1, borderBottomWidth}}>
                  <Text style={{fontSize: 20, paddingHorizontal: 10}}>
                    +254
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    ref={textInputMobile}
                    style={{flex: 1, fontSize: 20}}
                    placeholder={placeholderText}
                    underlineColorAndroid="transparent"
                  />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.connectSocialAccountView}>
            <Text style={styles.connectSocialAccountText}>
              Or connect using a social account
            </Text>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  arrowBack: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: 60,
    zIndex: 100,
  },
  arrowForward: {
    position: 'absolute',
    height: 60,
    width: 60,
    right: 10,
    zIndex: 100,
    backgroundColor: '#54575e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  imageBackground: {
    flex: 1,
  },
  uberTitleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uberTitleAnimatableView: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uberTitleText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  flag: {height: 24, width: 24, resizeMode: 'contain'},
  connectSocialAccountView: {
    height: 70,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopColor: '#e8e8ec',
    borderTopWidth: 1,
    paddingHorizontal: 25,
  },
  connectSocialAccountText: {color: '#5a7fdf', fontWeight: 'bold'},
};

export default LoginScreen;
