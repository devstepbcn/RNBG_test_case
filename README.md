# INSTALLATION INSTRUCTIONS

1. git clone https://github.com/devstepbcn/RNBG_test_case.git
2. cd RNBG_test_case
3. npm i
4. react-native run-ios --configuration Release  (I think the error happens more often in release mode)
5. Press the start / stop button repeatedly until the application freezes. 

NOTE: Sometimes it takes a little longer and others less. Sometimes the application works as expected then it must be restarted until it happens. It happens on a real device also.

This is all the app code:

```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BackgroundGeolocation from 'react-native-background-geolocation'
const bgGeo = BackgroundGeolocation;

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      configured: false,
      enabled: false
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
```
