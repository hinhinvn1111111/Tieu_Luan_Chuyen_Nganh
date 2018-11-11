import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {ChangeIDViewMap} from '../redux/dispatch';
import Carousel from 'react-native-snap-carousel';

const {w,h}  = Dimensions.get('window');

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    _goToMap(){
        this.props.ChangeIDViewMap();
        this.props.navigation.navigate('screen1');
    }
    render() {
        
        return (
            <View style={{flex:1}}>
                <View style={{elevation:10,padding:10,width:w,height:h/5,backgroundColor:'#fff',borderRadius:5,margin:10}}>
                    <Text style={{}}>{this.props.navigation.state.params.value}</Text>
                </View>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={{marginTop:20,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',elevation:10,borderWidth:1,backgroundColor:'gray'}}>
                        <Text style={{fontWeight:'bold',margin:10}}>Vị trí</Text>
                        
                        <TextInput style={{flex:1,padding:10,height:40,margin:10,backgroundColor:'#fff',borderRadius:5,borderColor:'black',elevation:2}}/>
                    </View>
                    <View style={{marginTop:50,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',elevation:10,borderWidth:1,backgroundColor:'gray'}}>
                        <Text style={{fontWeight:'bold',margin:10}}>Bán kính</Text>
                        
                        <TextInput style={{flex:1,padding:10,height:40,margin:10,backgroundColor:'#fff',borderRadius:5,borderColor:'black',elevation:2}}/>
                    </View>
                    <TouchableOpacity onPress={this._goToMap.bind(this)}>
                        <Text style={{width:100,height:40,backgroundColor:'green',textAlign:'center',alignContent:'center',padding:10,marginTop:100}}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps,{ChangeIDViewMap})(Search);
