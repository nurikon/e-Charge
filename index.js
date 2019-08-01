import {AppRegistry, View} from 'react-native';
import React, { Component } from 'react'
import {name as appName} from './app.json';
import firebase from '@firebase/app';
import App from './App';
import { YellowBox } from 'react-native';
import _ from 'lodash';

export class index extends Component {
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyB9eDSkQshvWtzb06KBxS7rv7wGFjegHeg',
            authDomain: 'estation-1fc4e.firebaseapp.com',
            databaseURL: 'https://estation-1fc4e.firebaseio.com',
            projectId: 'estation-1fc4e',
            storageBucket: 'estation-1fc4e.appspot.com',
            messagingSenderId: '755188261200',
            appId: '1:755188261200:web:afd27a310d70b773'
        })
    }

  render() {
    YellowBox.ignoreWarnings(['Require cycle:']);
    YellowBox.ignoreWarnings(['@firebase/database:']);

    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
    
    
    return (
      <View style={{flex:1}}>
        <App />
      </View>
    )
  }
}

AppRegistry.registerComponent(appName, () => index);