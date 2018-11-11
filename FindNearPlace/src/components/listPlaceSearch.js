import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated
} from 'react-native';
import {connect} from 'react-redux';
import {width,height} from './responsive';
import Carousel from 'react-native-snap-carousel';
import {ChangeIDViewMap} from '../redux/dispatch';

class ListPlaceSearch extends Component {

    _renderItem ({item,index}) {
        
        return (
            <View key={index} style={{width:200,height:200,backgroundColor:'blue',margin:10}}>
                <Image
                    style={{width:200,height:120}}
                    source={{uri:item.Image}}
                />
                
                <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>{item.Title}</Text>
                <TouchableOpacity onPress={()=>alert('a')}>
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
    _goToMap(){
        this.props.ChangeIDViewMap();
        this.props.navigation.navigate('screen1');
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                <TouchableOpacity onPress={()=>this.props.navigation.push('screen1')}>
                    <Text>aaaaaaaaa</Text>
                </TouchableOpacity>
                <Carousel 
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.arrLocations}
                    renderItem={(item,index)=>
                        <View key={index} style={{width:200,height:200,backgroundColor:'blue',margin:10}}>
                            <Image
                                style={{width:200,height:120}}
                                source={{uri:item.Image}}
                            />
                            
                            <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>{item.Title}</Text>
                            <TouchableOpacity onPress={this._goToMap.bind(this)}>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#fff',justifyContent:"center",margin:10}}>click</Text>
                            </TouchableOpacity>
                        
                        </View>
                    }
                    itemWidth={200}
                    sliderWidth={300}
                    enableMomentum={true}
                    activeAnimationType={'spring'}
                    activeAnimationOptions={{
                            friction: 40,
                            tension: 40
                        }}
                />
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

export default connect(mapStateToProps,{ChangeIDViewMap})(ListPlaceSearch);
