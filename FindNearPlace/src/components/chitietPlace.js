import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar
} from 'react-native';
StatusBar.setHidden(true);
const {width,height} = Dimensions.get('window');
export default class ChiTietPlace extends Component {
    state = {  }
    render() {
        return (
            <View style={{width,height,alignItems:'center',backgroundColor:'lightblue'}}>
                <View style={{width,height:200}}>
                    <View  style={{zIndex:1, width:50,height:50,position:'absolute',margin:10}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('screen1')}>
                            <Image 
                                style={{width:30,height:30,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/color/2x/back.png'}}
                            />
                        </TouchableOpacity>
                    </View>
                    <Image 
                        style={{width:width,height:200,resizeMode:'cover'}}
                        source={{uri:this.props.navigation.state.params.item.Image}}
                    />
                </View>
                <Text style={{textAlign:"center",marginTop:10,width,height:40,fontSize : 20,fontWeight:'bold',color:'black'}}>{this.props.navigation.state.params.item.Title}</Text>
                <ScrollView style={{width,height:350}}>
                    <View style={{flexDirection:'row',width,height:height/10,borderTopWidth:1,borderEndWidth:1,borderColor:'gray'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Image 
                                style={{width:30,height:30,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/color/2x/apple-map.png'}}
                            />
                            <Text style={{fontSize:8}}>Chỉ đường</Text>
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        );
    }
}