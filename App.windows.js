/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Linking
} from 'react-native';
import LauncherManager from './launcher'

const instructions =
  'Press Ctrl+R to reload,\n' +
  'Shift+F10 or shake for dev menu';

export default class App extends Component<{}> {

  openStorePage = async () =>  {
    let url = "ms-windows-store://pdp/?ProductId=9MWXC73GG352";
    // let url = "http://www.microsoft.com";
    //     Linking.canOpenURL(url)
    //       .then((supported) => {
    //         window.alert("Inside function: " + supported);
    //         console.log('Inside', supported, url);
    //         if (supported) {
    //           window.alert("open url");
    //           Linking.openURL(url)
    //             .then((res) => console.log('Response', res))
    //             .catch((ex) => window.alert('Ex '+ ex));
    //         }
    //         else {
    //           window.alert("Not supported");
    //         }
    //       });
      try {
        var isOpen = await LauncherManager.openUrl( { url: url});
        window.alert(isOpen);
        console.log(isOpen);
      }
      catch (e) {
        console.error(e);
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.windows.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title="Open Store" onPress={this.openStorePage} />
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
