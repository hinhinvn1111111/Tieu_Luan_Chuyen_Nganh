import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class A extends Component {
    state = {  }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'red'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MapScrenn')}>
                    <Text>Go to Map</Text>
                </TouchableOpacity>
            </View>
        );
    }
}