import React, { Component } from 'react';
import { 
    View,
    Text
} from 'react-native';

export default class Profile extends Component {
    state = {  }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'lightblue'}}>
                <Text>Profile</Text>
            </View>
        );
    }
}