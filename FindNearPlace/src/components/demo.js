import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {width,height} from './responsive';
import {GetDataSearch,MEMORIZED,ISSearch} from '../redux/dispatch';
import Carousel from 'react-native-snap-carousel';

import {createStackNavigator} from 'react-navigation';



// class Map1 extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             isSearch : false,
//             value : '',
//             num : 0,
//             animated : new Animated.Value(0)
//         }
//     }

//     _renderItem ({item,index}) {
        
//         return (
//             <View key={index} style={{width:200,height:200,backgroundColor:'blue',margin:10}}>
//                 <Image
//                     style={{width:200,height:120}}
//                     source={{uri:item.Image}}
//                 />
                
//                 <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>{item.Title}</Text>
               
//             </View>
//         );
//     }
//     _renderCasousel(){
//         return(
//             <Carousel 
//                 ref={(c) => { this._carousel = c; }}
//                 data={this.props.arrLocations}
//                 renderItem={this._renderItem}
//                 itemWidth={200}
//                 sliderWidth={300}
//                 enableMomentum={true}
//                 activeAnimationType={'spring'}
//                 activeAnimationOptions={{
//                         friction: 40,
//                         tension: 40
//                     }}
//             />
//         );
//     }

//     _renderMarekrs(){
//         views  = [];
//         for(let i of this.props.arrLocations){
            
//             views.push(
//                 <MapView.Marker
//                         key={parseFloat(i.Latitude)}
//                         coordinate={{
//                             latitude:parseFloat(i.Latitude),
//                             longitude:parseFloat(i.Longtitude)
//                         }}
//                     >
//                         <MapView.Callout style={{width:200,height:200}}>
//                             <View style={{flex:1,alignItems:'center'}}>
//                                 <Image style={{width:250, height:100, resizeMode:'cover',marginTop:10}}
//                                     source={{uri:i.Image}} />
//                                 <Text style={{fontSize:18, fontWeight:'bold',color:'red', marginTop:10}}>{i.Title}</Text>
//                                 <Text style={{fontSize:12,color:'blue', marginTop:10}}>{i.Decription}</Text>
//                             </View>
//                         </MapView.Callout>
//                     </MapView.Marker>
//             )
//         }
//         return views;
//     }
//     _sendata(value){
//         this.props.GetDataSearch(value);
//         this.setState({value:''});
//     }
//     // componentDidMount(){
//     //     Animated.timing(
//     //         this.state.animated,
//     //         {
//     //             toValue : '2',
//     //             duration : 4000
//     //         }
//     //     ).start();
//     // }
//     IsSearch(){
//         const backgroundColor = this.state.animated.interpolate({
//             inputRange : [0,0.5,1,1.5,2],
//             outputRange : ['yellow','blue','green','lightblue','red']
//         });
//         if(this.props.isSearch===true){
//             return(
//                 <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={require('../Image/icons8-back-24.png')}
//                         />
//                     </TouchableOpacity>
//                     <View style={{height:30,backgroundColor:'#fff',flex:1,marginLeft:10,marginRight:10}}><TextInput autoFocus={true} style={{fontSize:12,paddingTop:5,paddingLeft:10,paddingBottom:5}} onChangeText={(vl)=>this.setState({value:vl})} placeholder="Nhập từ bạn muốn tìm..." value={this.state.value}/></View>
//                     <TouchableOpacity onPress={()=>this._sendata(this.state.value)}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                         />
//                     </TouchableOpacity>
                   
//                 </Animated.View>
//             );
//         }
//         return (
//             <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                 <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                 <Image
//                     style={{width:26,height:26,resizeMode:'cover'}}
//                     source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                 />
//                 </TouchableOpacity>
//                 <View style={{flex:1,marginLeft:10}}>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                         <Text style={{color:'#fff'}}>Nhập từ bạn muốn tìm...</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity>
//                 <Image
//                     style={{width:26,height:26,resizeMode:'cover'}}
//                     source={{uri:'https://png.icons8.com/nolan/2x/plus-math.png'}}
//                 />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={()=>{}}>
//                     <Text>aa</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//         );
//     }
    
//     render() {
//         return (
//         <View>
            
            
//             {this.IsSearch()}
//             <MapView
            
//             initialRegion={{
//                 latitude: 10.877129,
//                 longitude: 106.766754,
//                 latitudeDelta: 0.0122,
//                 longitudeDelta:0.009
//             }}
//             style={{width:"100%",height:"53%"}}
//             >
//                 {this._renderMarekrs()}
//             </MapView>  
            
//             {this._renderCasousel()}
            
//         </View>
//         );
//     }
// }



// function mapStateToProps(state){
//     return { 
//         arrLocations : state.arrLocations,
//         isSearch : state.isSearch
//     };
// }

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
import M from './map';
export default Map =  createStackNavigator({
    screen1 : {
        screen : A    
    },
    screen2 : {
        screen : A
    },
    screen3 : {
        screen : M
    }
})

//export default connect(mapStateToProps,{GetDataSearch,MEMORIZED,ISSearch})(Map);












