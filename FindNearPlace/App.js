import React, { Component } from 'react';
import { View,YellowBox } from 'react-native';
import Main from './src/components/home';
import {Provider} from 'react-redux';
import store from './src/redux/store';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);


export default class App extends Component {
    state = {  }
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
};
