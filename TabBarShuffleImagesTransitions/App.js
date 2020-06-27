import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Transition, Transitioning} from 'react-native-reanimated';
import Tab from './src/components/Tab';
import GridImage from './src/components/GridImage';
import {images} from './api/images';

const {width} = Dimensions.get('window');

export default class App extends Component {
  constructor() {
    super();

    this.ref = React.createRef();
  }

  state = {
    selectedTab: 0,
    images,
  };

  selectTab = tabIndex => {
    this.ref.current.animateNextTransition();
    this.setState({selectedTab: tabIndex});
  };

  transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
      <Transition.Out type="fade" />
    </Transition.Together>
  );

  componentDidMount = () => this.ref.current.animateNextTransition();

  randomiseImages = images => {
    const shuffledImages = images.sort(() => 0.5 - Math.random());

    this.ref.current.animateNextTransition();
    this.setState({images: shuffledImages});
  };

  deleteImages = images => {
    images.pop();

    this.ref.current.animateNextTransition();
    this.setState({images});
  };

  render() {
    return (
      <Transitioning.View
        ref={this.ref}
        transition={this.transition}
        style={styles.container}>
        <View style={{...styles.tabContainer}}>
          <View
            style={[
              styles.activeTab,
              {
                left: this.state.selectedTab === 0 ? 0 : null,
                right: this.state.selectedTab === 1 ? 0 : null,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => this.selectTab(0)}>
            <Tab
              icon="md-photos"
              isSelected={this.state.selectedTab === 0 ? true : false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => this.selectTab(1)}>
            <Tab
              icon="md-grid"
              isSelected={this.state.selectedTab === 1 ? true : false}
            />
          </TouchableOpacity>
        </View>

        {this.state.selectedTab === 0 ? (
          <View style={styles.imageContainer}>
            {this.state.images.map((image, index) => (
              <GridImage key={image.id} image={image} width={width / 2 - 20} />
            ))}
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {this.state.images.map((image, index) => (
              <GridImage key={image.id} image={image} width={width / 4 - 20} />
            ))}
          </View>
        )}

        {this.state.selectedTab === 0 && (
          <View style={styles.randomTextContainer}>
            <Text>Random Animated Text :p</Text>
          </View>
        )}

        <TouchableWithoutFeedback
          onPress={() => this.randomiseImages(this.state.images)}>
          <View
            style={[
              styles.randomiseButton,
              {
                bottom: this.state.selectedTab === 0 ? 0 : -70,
              },
            ]}>
            <Text style={styles.buttonText}>Randomise Images</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.deleteImages(this.state.images)}>
          <View
            style={[
              styles.deleteButton,
              {
                bottom: this.state.selectedTab === 0 ? -70 : 0,
              },
            ]}>
            <Text style={styles.buttonText}>Delete Images</Text>
          </View>
        </TouchableWithoutFeedback>
      </Transitioning.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    height: 70,
    flexDirection: 'row',
    marginTop: 50,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 70,
    overflow: 'hidden',
  },
  activeTab: {
    position: 'absolute',
    height: 70,
    width: (width - 30) / 2,
    backgroundColor: '#BADA55',
  },
  tabButton: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  randomTextContainer: {
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomiseButton: {
    height: 70,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#BADA55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    height: 70,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});
