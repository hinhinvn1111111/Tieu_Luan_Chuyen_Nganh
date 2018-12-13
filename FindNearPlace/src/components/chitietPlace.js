import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList
} from 'react-native';

export default class ChiTietPlace extends Component {
    state = {  }
    render() {
        return (
            <View>
                <Text>{this.props.navigation.state.params.item.Title}</Text>
            </View>
        );
    }
}