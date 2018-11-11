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
import {GetDataSearch,MEMORIZED,ISSearch,ChangeIDViewMap} from '../redux/dispatch';
import Carousel from 'react-native-snap-carousel';




class Map extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isSearch : false,
            value : '',
            num : 0,
            animated : new Animated.Value(0)
        }
    }
    _goToChiTiet(){
        return this.props.navigation.push('screen2');
    }
    _renderItem ({item,index}) {
        
        return (
            <View key={index} style={{width:200,height:200,backgroundColor:'blue',margin:10}}>
                <TouchableOpacity onPress={()=>{}} >
                    <Image
                        style={{width:200,height:120}}
                        source={{uri:item.Image}}
                    />
                </TouchableOpacity>
                
                <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>{item.Title}</Text>
                <TouchableOpacity onPress={()=>{}}>
                    <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>click</Text>
                </TouchableOpacity>
               
            </View>
        );
    }
    _renderCasousel(){
        return(
            <Carousel 
                ref={(c) => { this._carousel = c; }}
                data={this.props.arrLocations}
                renderItem={this._renderItem}
                itemWidth={200}
                sliderWidth={300}
                enableMomentum={true}
                activeAnimationType={'spring'}
                activeAnimationOptions={{
                        friction: 40,
                        tension: 40
                    }}
            />
        );
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
        if(this.state.value===''){
            alert("Bạn chưa nhập từ tìm kiếm");
        }else{
            this.props.GetDataSearch(value);
            this.setState({value:''});
            this.props.navigation.push('screen2',{value : this.state.value});
            this.props.ISSearch();
            
        }
    }
    // componentDidMount(){
    //     Animated.timing(
    //         this.state.animated,
    //         {
    //             toValue : '2',
    //             duration : 4000
    //         }
    //     ).start();
    // }
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
                <TouchableOpacity onPress={()=>this.props.ISSearch()}>
                <Image
                    style={{width:26,height:26,resizeMode:'cover'}}
                    source={{uri:'https://png.icons8.com/office/2x/search.png'}}
                />
                </TouchableOpacity>
                <View style={{flex:1,marginLeft:10}}>
                    <TouchableOpacity onPress={()=>this.props.ISSearch()}>
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
    
    render() {
        Animated.timing(
            this.state.animated,
            {
                toValue : '2',
                duration : 2000
            }
        ).start();
        return (
        <View index={this.props.id} style={{flex:1,justifyContent:"center",alignItems:"center"}} key={1}>
            {this.IsSearch()}
            <MapView
            
            initialRegion={{
                latitude: 10.877129,
                longitude: 106.766754,
                latitudeDelta: 0.0122,
                longitudeDelta:0.009
            }}
            style={{width:"100%",height:"50%"}}
            >
                {this._renderMarekrs()}
            </MapView>  
            
            {this._renderCasousel()}
            
        </View>
        );
    }
}



function mapStateToProps(state){
    return { 
        arrLocations : state.arrLocations,
        isSearch : state.isSearch,
        id : state.changIDViewMap
    };
}

export default connect(mapStateToProps,{GetDataSearch,MEMORIZED,ISSearch,ChangeIDViewMap})(Map);
