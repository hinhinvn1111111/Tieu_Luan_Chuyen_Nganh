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
            <View  style={{flex:1,zIndex:0}} >
                <Text>aaaaaaaaaaaaa</Text>
                <MapView

                showsUserLocation={true}
                followsUserLocation={true}
            initialRegion={{
                latitude: 10.877031,
                longitude: 106.767133,
                latitudeDelta: 0.0122,
                longitudeDelta:0.009
            }}
        
            style={{width:300,height:300}}
            >
               
            </MapView>  
                
            </View>
        );
    }
}