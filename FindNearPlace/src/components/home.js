import React, { Component } from 'react';
import { 
    View,
    
    Image,
    StatusBar
} from 'react-native';


import Map from './map';
import Setting from './setting';
import Profile from './profile';
StatusBar.setHidden(true);
import TabNavigator from 'react-native-tab-navigator';

export class Home extends Component {
    render(){
        return(
            <View style={{flex:1,backgroundColor:'red'}} />
        );
    }
}

// export class Profile extends Component {
//     render(){
//         return(
//             <View style={{flex:1,backgroundColor:'yellow'}} />
//         )
//     }
// }

// export class Setting extends Component {
//     render(){
//         return(
//             <View style={{flex:1,backgroundColor:'lightblue'}} />
//         )
//     }
// }

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
                        {<Map />}
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