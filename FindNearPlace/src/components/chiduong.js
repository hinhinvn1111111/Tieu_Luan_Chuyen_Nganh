import React, { Component } from 'react';
import { 
    View,
    Text
} from 'react-native';
import MapView from 'react-native-maps';
export default class ChiDuong extends Component {
    state = {  }
    render() {
        return (
            <View  style={{flex:1,zIndex:10}} >
                <Text>aaaaaaaaaaaaa</Text>
                <MapView
                region={{
                latitude: 10.877031,
                longitude: 106.767133,
                latitudeDelta: 0.0122,
                longitudeDelta:0.009
            }}
        
            style={{width:'100%',height:'100%',zIndex:2}}
            >
               
            </MapView>  
                
            </View>
        );
    }
}