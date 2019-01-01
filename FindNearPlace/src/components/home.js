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
import ChiDuong from './chiduong';
import chitietPlace from './chitietPlace';
import Nhakinhdoanh from './nhakinhdoanh';
import AddPlace from './addPlace';

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
    static navigationOptions = {
        header:null
      };
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
                        selected={this.state.selectedTab === 'Business'}
                        //title="Profile"
                        renderIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}} source={{uri:'https://img.icons8.com/ios/2x/worldwide-location.png'}} />}
                        renderSelectedIcon={() => <Image style={{width:26,height:26,resizeMode:'cover'}}  source={{uri:'https://img.icons8.com/color/2x/worldwide-location.png'}} />}
                        //badgeText="1"
                        onPress={() => {this.setState({ selectedTab: 'Business',selected : false })}}>
                        {<Business style={{flex:1}}/>}
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

const Business  = createStackNavigator({
    nhakinhdoanh : {
        screen : Nhakinhdoanh,
        navigationOptions : {
            header : null
        } 
    },
    addPlace : {
        screen : AddPlace,
        navigationOptions : {
            header : null
        } 
    },
})

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
        screen : chitietPlace,
        navigationOptions : {
            header : null
        }
    },
    chiduong : {
        screen : ChiDuong,
        navigationOptions : {
            header : null
        }
    }

})

