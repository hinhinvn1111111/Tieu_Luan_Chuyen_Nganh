import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    YellowBox,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';

import {GetDataSearch,MEMORIZED,ISSearch,ChangeIDViewMap,DeleteLocationFromDistance,GetProduces,GetComments} from '../redux/dispatch';
import Carousel from 'react-native-snap-carousel';
import MapViewDirections from 'react-native-maps-directions';
import {arr} from './search';
import {latSearch,longSearch,name} from './search';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const {width,height}  = Dimensions.get('window');

class Map extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isSearch : false,
            value : '',
            num : 0,
            animated : new Animated.Value(0),
            lat:10.866925,
            long:106.762001,
            lat1:0,
            long1:0,
            name1 : ''
        }
    }

    // _renderChiDuong(){
    //     if(checkChiDuong==true){
    //         return(
    //             <MapViewDirections
    //                 origin={{
    //                     latitude:latSearch,
    //                     longitude:longSearch
    //                 }}
    //                 destination={{
    //                     latitude:this.state.lat1,
    //                     longitude:this.state.long1
    //                 }}
    //                 apikey='AIzaSyDqkHt6XLNjOL0-orGPUSbEaeNUuACtRhg'
    //                 strokeWidth={3}
    //                 strokeColor="hotpink"
    //             />
    //         )
    //     }else{

    //     }
    // }
    _renderMarekrs(){
        
        try {
            
            views  = [];
            for(let i of this.props.ListKC){
                
                views.push(
                    <MapView.Marker
                            //tracksViewChanges={this.state.tracksViewChanges}
                            key={parseFloat(i.place.Latitude)}
                            coordinate={{
                                latitude:parseFloat(i.place.Latitude),
                                longitude:parseFloat(i.place.Longtitude)
                            }}
                            
                        >
                            
                            <MapView.Callout  style={{width:200,height:200}}>
                                <View style={{flex:1,alignItems:'center'}}>
                                    <Image style={{width:250, height:100, resizeMode:'cover',marginTop:10}}
                                        source={{uri:i.place.Image}} />
                                    <Text style={{fontSize:15, fontWeight:'bold',color:'red', marginTop:10}}>{i.place.Title}</Text>
                                    <Text style={{fontSize:8,color:'blue', marginTop:10}}>{i.place.Decription}</Text>                               
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                )
            }
            return views;
        } catch (error) {
            alert(error);
        }
    }
    _sendata(value){
        try {
            
            if(this.state.value===''){
                alert("Bạn chưa nhập từ tìm kiếm");
            }else{
                this.props.GetDataSearch(value);
                this.setState({value:''});
                this.props.navigation.push('screen2',{value : this.state.value});
                this.props.ISSearch();
                
            }
        } catch (error) {
            alert(error);
        }
    }
    
    IsSearch(){
        
        const backgroundColor = this.state.animated.interpolate({
            inputRange : [0,0.5,1,1.5,2],
            outputRange : ['yellow','blue','green','lightblue','red']
        });
        if(this.props.isSearch===true){
            return(
                <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
                    <TouchableOpacity onPress={()=>this.props.ISSearch()}>
                        <Image
                            style={{width:26,height:26,resizeMode:'cover'}}
                            source={require('../Image/icons8-back-24.png')}
                        />
                    </TouchableOpacity>
                    <View style={{height:30,backgroundColor:'#fff',flex:1,marginLeft:10,marginRight:10}}><TextInput autoFocus={true} style={{fontSize:12,paddingTop:5,paddingLeft:10,paddingBottom:5}} onChangeText={(vl)=>this.setState({value:vl})} placeholder="Nhập từ bạn muốn tìm..." value={this.state.value}/></View>
                    <TouchableOpacity onPress={()=>this._sendata(this.state.value)}>
                        <Image
                            style={{width:26,height:26,resizeMode:'cover'}}
                            source={{uri:'https://png.icons8.com/office/2x/search.png'}}
                        />
                    </TouchableOpacity>
                   
                </Animated.View>
            );
        }
        return (
            <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
                <TouchableOpacity onPress={()=>{this.setState({lat1:0,long1:0,name1:''});this.props.ISSearch()}}>
                <Image
                    style={{width:26,height:26,resizeMode:'cover'}}
                    source={{uri:'https://png.icons8.com/office/2x/search.png'}}
                />
                </TouchableOpacity>
                <View style={{flex:1,marginLeft:10}}>
                    <TouchableOpacity onPress={()=>{this.setState({lat1:0,long1:0,name1:''});this.props.ISSearch()}}>
                        <Text style={{color:'#fff'}}>Nhập từ bạn muốn tìm...</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                <Image
                    style={{width:26,height:26,resizeMode:'cover'}}
                    source={{uri:'https://png.icons8.com/nolan/2x/plus-math.png'}}
                />
                </TouchableOpacity>
            </Animated.View>
        );
    }


    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat =position.coords.latitude;
                const long = position.coords.longitude;
                this.setState({lat,long})
                //alert(lat + "       " + long)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000000000, maximumAge: 1000 }
          )
        
        // try{
        //     var lat = this.props.navigation.state.params.lat;
        //     var long = this.props.navigation.state.params.long;
        //     this.setState({lat,long});
        // }catch{
            
        // }
        
    }

    
    
    render() {
        
        var renderitem=({item,index})=>{
            return (
                <View key={index} style={{zIndex:10,position:'absolute',width:180,height:120,backgroundColor:'blue',margin:10,alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({lat1:item.place.Latitude,long1:item.place.Longtitude,name1:item.place.Title})
                        this.props.navigation.push("chitietPlace",{item});
                        this.props.GetProduces(item.place.ID);
                        this.props.GetComments(item.place.ID);
                        }} >
                        <Image
                            style={{width:180,height:80}}
                            source={{uri:item.place.Image}}
                        />
                    
                    
                    <Text style={{textAlign:'center',fontSize:12,fontWeight:'bold',color:'#fff'}}>{item.place.Title}</Text>
                   
                    <Text style={{textAlign:'center',fontSize:12,fontWeight:'bold',color:'red'}}>{item.kc +  " km"}</Text>

                    </TouchableOpacity>
                   
                </View>
            );
        }
        
        Animated.timing(
            this.state.animated,
            {
                toValue : '2',
                duration : 2000
            }
        ).start();
        return (
        <View index={this.props.id} style={{zIndex:1,flex:1}} key={1}>
            {this.IsSearch()}
            <MapView
                
                showsUserLocation={true}
                followsUserLocation={true}
                
                region={{
                    latitude: latSearch,
                    longitude: longSearch,
                    latitudeDelta: 0.012,
                    longitudeDelta:0.029
                }}
            key={this.props.id}
            style={{width:"100%",height:"93%",zIndex:1}}
            >
                <MapView.Circle 
                    center={{latitude:latSearch,longitude:longSearch}}
                    radius={parseFloat(this.props.bk) * 1000}
                    strokeWidth={1}
                    fillColor="rgba(255,0,0,0.1)"
                />
                <MapView.Marker
                     title = {name}   
                     coordinate={{
                        latitude:latSearch,
                        longitude:longSearch
                    }}
                       
                >    
                    <Image 
                        style={{width:40,height:40,resizeMode:'cover'}}
                        source={{uri:'https://img.icons8.com/color/2x/map-pin.png'}}
                    />                   
                </MapView.Marker>
                {/* <MapView.Marker
                     title = {this.state.name1} 
                     coordinate={{
                        latitude:parseFloat(this.state.lat1),
                        longitude:parseFloat(this.state.long1)
                    }}
                       
                >    
                    <Image 
                        style={{width:24,height:24,resizeMode:'cover'}}
                        source={{uri:'https://img.icons8.com/color/2x/marker.png'}}
                    />                   
                </MapView.Marker> */}
                {this._renderMarekrs()}
            </MapView>  
            
            <View style={{height:300,position:'absolute',zIndex:10,marginTop:430}}>
                <Carousel 
                    
                    style={{backgroundColor:'blue',margin:10,position:'absolute',zIndex:10}}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.ListKC}
                    renderItem={renderitem}
                    itemWidth={200}
                    sliderWidth={width}
                    enableMomentum={true}
                    activeAnimationType={'spring'}
                    activeAnimationOptions={{
                            friction: 40,
                            tension: 40
                        }}
                />
            </View>
            
            
        </View>
        );
    }
}



function mapStateToProps(state){
    return { 
        arrLocations : state.arrLocations,
        isSearch : state.isSearch,
        id : state.changIDViewMa,
        ListKC : state.ListKC,
        bk : state.bk
    };
}

export default connect(mapStateToProps,{GetDataSearch,MEMORIZED,ISSearch,ChangeIDViewMap,DeleteLocationFromDistance,GetProduces,GetComments})(Map);
