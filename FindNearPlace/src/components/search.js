import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {ChangeIDViewMap,chageHeightMap,chageHeightMap1} from '../redux/dispatch';
import Carousel from 'react-native-snap-carousel';
import Picker from 'react-native-wheel-picker';
var PickerItem = Picker.Item;



const {w,h}  = Dimensions.get('window');

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            language:"",
            selectedItem : 3,
            itemList: ['1 km','2 km','3 km','5 km','8 km','10 km'],
            latitude : 0,
            longitude : 0
        }
    }

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //        (position) => {
    //          this.setState({
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //          });
             
    //        },
    //        (error) => this.setState({ error: error.message }),
    //        { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 },
    //      );
    //    }

    onPickerSelect (index) {
        this.setState({
            selectedItem: index,
        })
    }

    onAddItem = () => {
        var name = '10 km'
        if (this.state.itemList.indexOf(name) == -1) {
            this.state.itemList.push(name)
        }
        this.setState({
            selectedItem: this.state.itemList.indexOf(name),
        })
    }

    _KhoangCach(lat1,long1,lat2,long2){
        var circumference = 40000;
        var distance = 0;
        var lat1Rad = lat1*Math.PI/180;
        var lat2Rad = lat2*Math.PI/180;
        var long1Rad = long1*Math.PI/180;
        var long2Rad = long2*Math.PI/180;
        var longDiff=Math.abs(long1Rad-long2Rad);
        if(longDiff > Math.PI){
            longDiff = 2*Math.PI-longDiff;
        }
        var angleCaculation = Math.acos(
            Math.sin(lat2Rad) * Math.sin(lat1Rad) + Math.cos(lat2Rad) * Math.cos(lat1Rad) * Math.cos(longDiff)
        );
        distance = circumference * angleCaculation / (2 * Math.PI);
        return distance;
    }
    _KhoangCach2(lat1,long1,lat2,long2){
        var p = Math.PI/180;
        var c = Math.cos;
        var a = 0.5-c((lat2-lat1)*p)/2 + (c(lat1*p) * c(lat2*p) *(1-c((long2-long1)*p)))/2;
        
        return 12724*Math.asin(Math.sqrt(a));
    }
    _Tinh(){
        
        // for(let i of this.props.arrLocations){
        //     var t = this._KhoangCach(10.877040, 106.755236,10.877056, 106.767036);
        //     alert(t + "");
        // }
        var t = this._KhoangCach(10.877065, 106.767022,10.851403, 106.771992);
        alert(t +"");
    }

    _goToMap(){
        this.props.ChangeIDViewMap();
        if(this.props.arrLocations.lenght!==0){
            this.props.chageHeightMap();
        }else{
            this.props.chageHeightMap1();
        }
        this.props.navigation.navigate('screen1');
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                 latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
              });
              alert(this.state.latitude+"");
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );
    }
    render() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                 latitude: position.coords.latitude,
                 longitude: position.coords.longitude
              });
              //alert(this.state.latitude+"");
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
          );
        
        return (
            <View style={{flex:1,backgroundColor:'lightblue',borderLeftWidth:3,borderRightWidth:3,borderColor:'red',borderBottomWidth:0}}>
                <View style={{height:50,backgroundColor:'red'}}>
                    <View style={{width:w,height:30,backgroundColor:'#fff',borderRadius:5,margin:10,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{textAlign:'center',fontSize:12}}>{this.props.navigation.state.params.value}</Text>
                    </View>
                </View>
                <View style={{borderRadius:10,flex:4,alignItems:"center",justifyContent:'center',backgroundColor:'#666600',borderWidth:1,elevation:5,margin:10,marginTop:50}}>
                    <View style={{marginTop:10,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',margin:10,color:'#fff'}}>Vị trí</Text>
                        
                        <TextInput style={{flex:1,padding:10,height:40,margin:10,backgroundColor:'#fff',borderRadius:5,borderColor:'black',elevation:2}}/>
                    </View>
                    
                    <View style={{marginTop:30,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Picker style={{width: 150, height: 180}}
                            selectedValue={this.state.selectedItem}
                            itemStyle={{color:"white", fontSize:26}}
                            onValueChange={(index) => this.onPickerSelect(index)}>
                                {this.state.itemList.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"KhoangCach"+value}/>
                                ))}
                        </Picker>
                        <Text style={{margin: 20, color: '#ffffff',fontSize:18}}>
                            Khoảng cách :{this.state.itemList[this.state.selectedItem]}
                        </Text>                   
                    </View>
                    
                </View>
                <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
                    <TouchableOpacity onPress={this._goToMap.bind(this)}>
                        <Text style={{width:100,height:40,backgroundColor:'green',textAlign:'center',alignContent:'center',padding:10,marginTop:10,borderRadius:5,fontWeight:'bold',color:'#fff',elevation:5}}>Tìm kiếm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert(this.state.latitude)}>
                        <Text style={{width:100,height:40,backgroundColor:'green',textAlign:'center',alignContent:'center',padding:10,marginTop:5,borderRadius:5,fontWeight:'bold',color:'#fff',elevation:5}}>Khoảng cách</Text>
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

export default connect(mapStateToProps,{ChangeIDViewMap,chageHeightMap,chageHeightMap1})(Search);