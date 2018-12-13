import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    StatusBar
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Map from './map';
import Setting from './setting';
import Profile from './profile';
StatusBar.setHidden(true);
import TabNavigator from 'react-native-tab-navigator';
import Search from './search';
import ListPlaceSearch from './listPlaceSearch';
import ChiTietPlace from './chitietPlace';

export class Home extends Component {
    render(){
        return(
            <View style={{flex:1,backgroundColor:'red'}} />
        );
    }
}


export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected : true
        }
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:''}}>
                <TabNavigator  tabBarStyle={{backgroundColor:'fff',padding:2}}>
                    <TabNavigator.Item 
                        selected={this.state.selectedTab === 'Home'}
                        //title="Home"
                        
                        renderIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}} source={{uri:'https://png.icons8.com/ios/2x/home-page.png'}} />}
                        renderSelectedIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}}  source={{uri:'https://png.icons8.com/office/2x/home-page.png'}} />}
                        //badgeText="1"
                        selected={this.state.selected}
                        onPress={() => this.setState({ selectedTab: 'Home',selected:true })}>
                        {<Map1 />}
                    </TabNavigator.Item>
                    
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Profile'}
                        //title="Profile"
                        renderIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}} source={{uri:'https://png.icons8.com/carbon-copy/2x/gender-neutral-user.png'}} />}
                        renderSelectedIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}}  source={{uri:'https://png.icons8.com/plasticine/2x/gender-neutral-user.png'}} />}
                        //badgeText="1"
                        onPress={() => {this.setState({ selectedTab: 'Profile',selected : false })}}>
                        {<Profile style={{flex:1}}/>}
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Setting'}
                        //title="Profile"
                        renderIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}} source={{uri:'https://png.icons8.com/carbon-copy/2x/settings.png'}} />}
                        renderSelectedIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}}  source={{uri:'https://png.icons8.com/nolan/2x/settings.png'}} />}
                        //badgeText="1"
                        onPress={() => {this.setState({ selectedTab: 'Setting',selected : false })}}>
                        {<Setting style={{flex:1}}/>}
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

class A extends Component {
    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('screen3')}>
                    <Text>Go to map</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class B extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSearch : false,
            value : '',
            num : 0,
            animated : new Animated.Value(0)
        }
    }
    _a(){
        this.props.navigation.navigate('screen2')
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <MapView
            
            initialRegion={{
                latitude: 10.877129,
                longitude: 106.766754,
                latitudeDelta: 0.0122,
                longitudeDelta:0.009
            }}
            style={{width:"100%",height:"80%"}}
            >
            
            </MapView>  
            <TouchableOpacity 
                onPress={this._a.bind(this)}
            ><Text>Go to A</Text></TouchableOpacity>
            </View>
        )
    }
}

const Map1 =  createStackNavigator({
    screen1 : {
        screen : Map,
        navigationOptions : {
            header : null
        } 
    },
    screen2 : {
        screen : Search,
        navigationOptions : {
            header : null
        } 
    },
    screen3 : {
        screen : ListPlaceSearch
    },
    chitietPlace : {
        screen : ChiTietPlace
    }

})

