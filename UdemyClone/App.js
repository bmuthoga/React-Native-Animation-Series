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
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-ionicons';
import * as Animatable from 'react-native-animatable';
import {listItems} from './src/api/listItems';
import {styles} from './src/assets/css/styles';

export default class App extends Component {
  state = {
    searchBarFocused: false,
  };

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardWillShow.bind(this),
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardWillHide.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({searchBarFocused: true});
  }

  _keyboardWillShow() {
    this.setState({searchBarFocused: true});
  }

  _keyboardWillHide() {
    this.setState({searchBarFocused: false});
  }

  _keyboardDidHide() {
    this.setState({searchBarFocused: false});
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.safeAreaViewTop} />
        <SafeAreaView style={styles.safeAreaViewBottom}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Animatable.View
                animation="slideInRight"
                duration={500}
                style={styles.headerAnimatedView}>
                <Animatable.View
                  animation={
                    this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'
                  }
                  duration={400}>
                  <Icon
                    name={
                      this.state.searchBarFocused
                        ? 'md-arrow-back'
                        : 'ios-search'
                    }
                    size={24}
                  />
                </Animatable.View>
                <TextInput placeholder="Search" style={styles.textInput} />
              </Animatable.View>
            </View>

            <FlatList
              data={listItems}
              renderItem={({item}) => (
                <Text style={styles.listItemText}>{item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={{
                backgroundColor: this.state.searchBarFocused
                  ? 'rgba(0,0,0,0.3)'
                  : 'white',
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
