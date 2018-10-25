import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {width,height} from './responsive';
import {GetDataSearch,MEMORIZED,ISSearch} from '../redux/dispatch';

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSearch : false,
            value : '',
            num : 0
        }
    }
    _renderMarekrs(){
        views  = [];
        for(let i of this.props.arrLocations){
            
            views.push(
                <MapView.Marker
                        key={parseFloat(i.Latitude)}
                        coordinate={{
                            latitude:parseFloat(i.Latitude),
                            longitude:parseFloat(i.Longtitude)
                        }}
                    >
                        <MapView.Callout style={{width:200,height:200}}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image style={{width:250, height:100, resizeMode:'cover',marginTop:10}}
                                    source={{uri:i.Image}} />
                                <Text style={{fontSize:18, fontWeight:'bold',color:'red', marginTop:10}}>{i.Title}</Text>
                                <Text style={{fontSize:12,color:'blue', marginTop:10}}>{i.Decription}</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
            )
        }
        return views;
    }
    _sendata(value){
        this.props.GetDataSearch(value);
        this.setState({value:''});
    }
    
    IsSearch(){
        if(this.props.isSearch===true){
            return(
                <View style={{width:width,height:40,backgroundColor:'#7388C1',justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
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
                </View>
            );
        }
        return (
            <View style={{width:width,height:40,backgroundColor:'#7388C1',justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
                <TouchableOpacity onPress={()=>this.props.ISSearch()}>
                <Image
                    style={{width:26,height:26,resizeMode:'cover'}}
                    source={{uri:'https://png.icons8.com/office/2x/search.png'}}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.ISSearch()}>
                    <Text style={{color:'#fff'}}>Nhập từ bạn muốn tìm...</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image
                    style={{width:26,height:26,resizeMode:'cover'}}
                    source={{uri:'https://png.icons8.com/nolan/2x/plus-math.png'}}
                />
                </TouchableOpacity>
                
            </View>
        );
    }
    
    render() {
        return (
        <View >
            {this.IsSearch()}
            <MapView
            
            initialRegion={{
                latitude: 10.877129,
                longitude: 106.766754,
                latitudeDelta: 0.0122,
                longitudeDelta:0.009
            }}
            style={{width:"100%",height:"93%"}}
            >

            {this._renderMarekrs()}
            </MapView>
            
            </View>
        );
    }
}

function mapStateToProps(state){
    return { 
        arrLocations : state.arrLocations,
        isSearch : state.isSearch
    };
}

export default connect(mapStateToProps,{GetDataSearch,MEMORIZED,ISSearch})(Map)

