/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BackgroundGeolocation from 'react-native-background-geolocation'
const bgGeo = BackgroundGeolocation;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      configured: false,
      enabled: false,
      pace: false
    }
  }
  componentDidMount() {
    bgGeo.configure({debug: true}, (state) => {
      this.setState({
        enabled: state.enabled,
        configured: true
      });
    });
  }

  _startAndChangePace() {
    if (this.state.configured) {
      if (!this.state.enabled) {
        bgGeo.start((state) => {
          bgGeo.changePace(true);
          this.setState({
            enabled: state.enabled
          })
        });
      } else {
        bgGeo.stop((state) => {          
          this.setState({
            enabled: state.enabled            
          })
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Configured: {this.state.configured ? "true" : "false"}
        </Text>
        <Text style={styles.welcome}>
          Enabled: {this.state.enabled ? "true" : "false"}
        </Text>
        <Button
          onPress={this._startAndChangePace.bind(this)}
          title={this.state.enabled ? "Stop" : "Start"}
          color={this.state.enabled ? "red" : "green"}
          disabled={this.state.configured ? false : true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
