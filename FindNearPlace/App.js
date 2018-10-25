import React, { Component } from 'react';
import { View } from 'react-native';
import Main from './src/components/home';
import {Provider} from 'react-redux';
import store from './src/redux/store';
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
